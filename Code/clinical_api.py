#!/usr/bin/env python3
"""
ClinicalPad FastAPI Application
AWS Bedrock integration for clinical data extraction using Claude 3 Sonnet
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime

import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# AWS Bedrock Configuration
BEDROCK_API_KEY = os.getenv("BEDROCK_API_KEY")
if BEDROCK_API_KEY:
    BEDROCK_API_KEY = BEDROCK_API_KEY.strip('"')

AWS_REGION = os.getenv("AWS_DEFAULT_REGION", "eu-west-2")
MODEL_ID = "anthropic.claude-3-sonnet-20240229-v1:0"
BEDROCK_URL = f"https://bedrock-runtime.{AWS_REGION}.amazonaws.com/model/{MODEL_ID}/invoke"

# Initialize FastAPI app
app = FastAPI(
    title="ClinicalPad API",
    description="Clinical data extraction using AWS Bedrock and Claude 3 Sonnet",
    version="1.0.0"
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8080", "http://127.0.0.1:8080"],  # Next.js ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# System Prompts
SYSTEM_PROMPT_1 = """You are ClinExtract, an expert clinical documentation assistant with deep understanding of medical terminology, clinical reasoning, and risk stratification.

You will receive two inputs per request:
1. TRANSCRIPT – the physician-dictated consultation note (SOAP or free-form, already de-identified)
2. MODEL_B_LETTER – a documented version of the same transcript previously preferred by clinicians

CORE PRINCIPLE: The TRANSCRIPT is the authoritative source of clinical facts. MODEL_B_LETTER may only be used for stylistic guidance (formatting, section headers, professional phrasing). Any clinical information in MODEL_B_LETTER that is absent from or contradicts the TRANSCRIPT must be ignored.

OUTPUT REQUIREMENT: Return exactly one valid JSON object with no additional text, markdown fences, or explanations.

CLINICAL EXTRACTION GUIDELINES:

1. "chief_complaint" (string | null)
   - The primary reason for the visit as stated by the patient
   - Use patient's own words when available in TRANSCRIPT
   - If multiple complaints, prioritize the most clinically significant

2. "diagnosis_summary" (string | null)
   - Include primary diagnosis and relevant differential diagnoses
   - List any confirmed diagnoses with supporting clinical findings
   - Note provisional/working diagnoses clearly marked as such

3. "risk_level" (string) – REQUIRED: "high", "medium", or "low"
   Risk stratification criteria:

   HIGH RISK indicators:
   - Unstable vital signs or acute deterioration
   - Red flag symptoms (chest pain, severe headache, altered consciousness, etc.)
   - High-risk conditions (active malignancy, immunosuppression, pregnancy complications)
   - Urgent intervention needed or hospital admission considered
   - Significant medication interactions or allergies
   - Social factors creating immediate danger (abuse, suicidality, homelessness with medical needs)

   MEDIUM RISK indicators:
   - Chronic conditions requiring close monitoring
   - New symptoms needing investigation
   - Moderate medication side effects
   - Social factors affecting treatment adherence
   - Multiple comorbidities but stable

   LOW RISK indicators:
   - Routine follow-up for stable conditions
   - Minor acute issues (simple infections, minor injuries)
   - Well-controlled chronic diseases
   - No concerning symptoms or social factors

4. "follow_up_action" (string | null)
   - Specific timeframe and type of follow-up required
   - Include specialty referrals, investigations ordered
   - Note any conditional instructions ("return if symptoms worsen")

5. "social_or_medication_risks" (string | null)
   Extract factors affecting patient safety or treatment:
   - Medication adherence issues, polypharmacy risks
   - Social determinants (housing, support system, substance use)
   - Cognitive/physical limitations affecting self-care
   - Financial barriers to treatment

6. "alerts" (array of strings)
   Critical information requiring immediate attention:
   - Drug allergies and intolerances
   - High-risk medications (anticoagulants, insulin, etc.)
   - Recent hospitalizations or ED visits
   - Safety concerns (falls risk, driving restrictions)
   - Infectious disease precautions

7. "insights" (array of strings)
   Clinically relevant patterns or observations:
   - Disease progression trends
   - Response to treatment
   - Preventive care opportunities
   - Patient education needs
   - Care coordination requirements

DATA INTEGRITY RULES:
- Extract only what is explicitly stated or clearly implied in TRANSCRIPT
- Replace any residual identifiers with "[REDACTED]"
- Use null for missing strings, [] for empty arrays
- Never fabricate clinical information
- Preserve clinical terminology and measurements exactly as stated
- Include uncertainty qualifiers (e.g., "possible", "likely") when present in TRANSCRIPT

EXAMPLE OUTPUT FORMAT:
{
  "chief_complaint": "Progressive shortness of breath for 3 days",
  "diagnosis_summary": "Acute exacerbation of COPD, likely triggered by viral URI. Differential includes pneumonia, CHF exacerbation",
  "risk_level": "high",
  "follow_up_action": "Follow-up in 48-72 hours or sooner if worsening. Chest X-ray ordered. Consider ED if no improvement in 24 hours",
  "social_or_medication_risks": "Lives alone, difficulty affording medications, current smoker",
  "alerts": ["Penicillin allergy - anaphylaxis", "On warfarin - monitor INR", "Fall risk - uses walker"],
  "insights": ["Third exacerbation this year - consider pulmonology referral", "Poor inhaler technique noted - education provided", "Would benefit from smoking cessation program"]
}"""

# Pydantic Models
class ClinicalExtractionRequest(BaseModel):
    transcript: str = Field(..., description="The physician-dictated consultation note")
    model_b_letter: str = Field(..., description="Previously documented version for reference")
    system_prompt_version: Optional[int] = Field(default=1, description="System prompt version to use (1-3)")

class ClinicalExtractionResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    raw_output: Optional[str] = None
    error: Optional[str] = None
    processing_time: Optional[float] = None
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str
    bedrock_configured: bool

# Dependency to check Bedrock API key
async def check_bedrock_api_key():
    if not BEDROCK_API_KEY:
        raise HTTPException(
            status_code=500, 
            detail="BEDROCK_API_KEY not configured. Please check your .env file."
        )
    return BEDROCK_API_KEY

# Core extraction function
def extract_clinical_json_bedrock(transcript: str, model_b_letter: str, system_prompt: str) -> Dict[str, Any]:
    """Extract clinical data using Bedrock Claude - optimized for AWS Bedrock API Key"""
    
    if not BEDROCK_API_KEY:
        return {
            "success": False,
            "data": None,
            "raw_output": None,
            "error": "Bedrock API key not configured"
        }
    
    user_content = f"TRANSCRIPT:\n{transcript}\n\nMODEL_B_LETTER:\n{model_b_letter}"
    
    # Headers for AWS Bedrock API Key authentication
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {BEDROCK_API_KEY}",
        "anthropic-version": "2023-06-01"
    }
    
    payload = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 2000,
        "temperature": 0.0,
        "system": system_prompt,
        "messages": [
            {"role": "user", "content": user_content}
        ]
    }
    
    try:
        logger.info(f"🔄 Making Bedrock API request to: {BEDROCK_URL}")
        logger.info(f"📝 Headers: {headers}")
        logger.info(f"📄 Payload preview: {str(payload)[:200]}...")
        
        response = requests.post(BEDROCK_URL, headers=headers, json=payload, timeout=30)
        
        logger.info(f"📊 Response status: {response.status_code}")
        logger.info(f"📄 Response headers: {dict(response.headers)}")
        
        if response.status_code != 200:
            logger.error(f"❌ Response error: {response.text}")
            logger.error(f"❌ Response content: {response.content}")
        
        response.raise_for_status()
        
        result = response.json()
        raw_output = result['content'][0]['text'].strip()
        
        # Parse JSON
        try:
            # Remove code fences if present
            if raw_output.startswith("```"):
                lines = raw_output.splitlines()
                if len(lines) > 2:
                    raw_output = "\n".join(lines[1:-1]).strip()
            
            parsed = json.loads(raw_output)
            return {
                "success": True,
                "data": parsed,
                "raw_output": raw_output,
                "error": None
            }
            
        except json.JSONDecodeError as e:
            return {
                "success": False,
                "data": None,
                "raw_output": raw_output,
                "error": f"JSON parse error: {str(e)}"
            }
            
    except requests.RequestException as e:
        return {
            "success": False,
            "data": None,
            "raw_output": None,
            "error": f"Bedrock request failed: {str(e)}"
        }

# API Routes
@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="ClinicalPad API is running",
        timestamp=datetime.utcnow().isoformat(),
        bedrock_configured=bool(BEDROCK_API_KEY)
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Detailed health check"""
    return HealthResponse(
        status="healthy",
        message="All systems operational",
        timestamp=datetime.utcnow().isoformat(),
        bedrock_configured=bool(BEDROCK_API_KEY)
    )

@app.post("/extract", response_model=ClinicalExtractionResponse)
async def extract_clinical_data(
    request: ClinicalExtractionRequest,
    api_key: str = Depends(check_bedrock_api_key)
):
    """
    Extract clinical data from transcript and model B letter
    """
    start_time = datetime.utcnow()
    
    try:
        # Use the specified system prompt (default to SYSTEM_PROMPT_1)
        system_prompt = SYSTEM_PROMPT_1  # For now, using the main prompt
        
        logger.info(f"Processing clinical extraction request")
        
        # Extract clinical data
        result = extract_clinical_json_bedrock(
            transcript=request.transcript,
            model_b_letter=request.model_b_letter,
            system_prompt=system_prompt
        )
        
        processing_time = (datetime.utcnow() - start_time).total_seconds()
        
        return ClinicalExtractionResponse(
            success=result["success"],
            data=result["data"],
            raw_output=result["raw_output"],
            error=result["error"],
            processing_time=processing_time,
            timestamp=datetime.utcnow().isoformat()
        )
        
    except Exception as e:
        processing_time = (datetime.utcnow() - start_time).total_seconds()
        logger.error(f"Extraction failed: {str(e)}")
        
        return ClinicalExtractionResponse(
            success=False,
            data=None,
            raw_output=None,
            error=f"Internal error: {str(e)}",
            processing_time=processing_time,
            timestamp=datetime.utcnow().isoformat()
        )

@app.post("/extract/batch")
async def extract_multiple_cases(
    cases: List[ClinicalExtractionRequest],
    api_key: str = Depends(check_bedrock_api_key)
):
    """
    Process multiple clinical cases in batch
    """
    start_time = datetime.utcnow()
    results = []
    
    try:
        for i, case in enumerate(cases):
            logger.info(f"Processing case {i+1}/{len(cases)}")
            
            result = extract_clinical_json_bedrock(
                transcript=case.transcript,
                model_b_letter=case.model_b_letter,
                system_prompt=SYSTEM_PROMPT_1
            )
            
            results.append({
                "case_id": i + 1,
                "success": result["success"],
                "data": result["data"],
                "error": result["error"]
            })
        
        processing_time = (datetime.utcnow() - start_time).total_seconds()
        
        return {
            "success": True,
            "total_cases": len(cases),
            "results": results,
            "processing_time": processing_time,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        processing_time = (datetime.utcnow() - start_time).total_seconds()
        logger.error(f"Batch processing failed: {str(e)}")
        
        return {
            "success": False,
            "error": f"Batch processing error: {str(e)}",
            "processing_time": processing_time,
            "timestamp": datetime.utcnow().isoformat()
        }

if __name__ == "__main__":
    import uvicorn
    
    # Check configuration on startup
    if not BEDROCK_API_KEY:
        logger.error("❌ BEDROCK_API_KEY not found in environment variables")
        logger.error("Please check your .env file contains: BEDROCK_API_KEY=your_api_key")
    else:
        logger.info("✅ Configuration loaded successfully")
        logger.info(f"Region: {AWS_REGION}")
        logger.info(f"Model: Claude 3 Sonnet")
        logger.info(f"API Key configured: {BEDROCK_API_KEY[:20]}...")
    
    # Run the server
    uvicorn.run(
        "clinical_api:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )