# ClinicalPad - Full Stack Development Guide

## 🏥 Project Overview
ClinicalPad is a clinical documentation assistant that extracts structured data from physician transcripts using AWS Bedrock Claude 3 Sonnet. The system processes clinical notes and generates standardized JSON outputs for medical records.

## 🏗️ Architecture

```
clinicalpad-project/
├── backend/                        # FastAPI Python Backend
│   ├── main.py                    # FastAPI server
│   ├── clinical_processor.py      # Core clinical processing functions
│   ├── models.py                  # Pydantic data models
│   ├── requirements.txt           # Python dependencies
│   └── .env                       # Backend environment variables
│
├── frontend/                       # Next.js Frontend
│   ├── pages/
│   │   ├── api/                   # Next.js API routes
│   │   ├── dashboard.js           # Main dashboard
│   │   └── index.js               # Landing page
│   ├── components/
│   │   ├── ClinicalForm.js        # Input form component
│   │   ├── ResultsDisplay.js      # JSON results display
│   │   └── Layout.js              # App layout
│   ├── lib/
│   │   ├── supabase.js            # Supabase client setup
│   │   └── api.js                 # API utilities
│   ├── package.json
│   └── .env.local                 # Frontend environment variables
│
├── database/
│   ├── schema.sql                 # Supabase database schema
│   └── migrations/                # Database migrations
│
├── notebooks/                      # Development notebooks
│   ├── ClinicalPad.ipynb         # Original development notebook
│   ├── bedrock_clinicalpad.ipynb # AWS Bedrock implementation
│   └── claude_test_clean.ipynb   # Testing notebook
│
└── README.md                      # This file
```

## 💻 Development Environment Setup

### Prerequisites
- **PyCharm** - For Python development and notebook conversion
- **Cursor AI** - For full-stack development and AI assistance
- **Node.js 18+** - For Next.js frontend
- **Python 3.8+** - For FastAPI backend
- **Supabase Account** - For database management
- **AWS Bedrock Access** - For Claude 3 Sonnet API

### Current Development Status
The project currently includes:
- ✅ Clinical processing functions in Jupyter notebooks
- ✅ AWS Bedrock Claude 3 Sonnet integration
- ✅ Batch processing capabilities
- ✅ JSON extraction from clinical transcripts
- 🔄 Converting to FastAPI backend (next step)
- 🔄 Next.js frontend development (next step)
- 🔄 Supabase database integration (next step)

## 🔧 Development Workflow

### Phase 1: Backend Development (PyCharm)
1. **Convert Notebooks to Python Modules**
   ```bash
   # In PyCharm, extract functions from notebooks:
   # - bedrock_clinicalpad.ipynb → clinical_processor.py
   # - Create FastAPI endpoints in main.py
   # - Define Pydantic models in models.py
   ```

2. **Key Functions to Convert**
   - `extract_clinical_json_bedrock(transcript, model_b_letter, system_prompt)`
   - `process_multiple_clinical_cases(cases_data, system_prompt)` 
   - Bedrock authentication and API calls

### Phase 2: Full Stack Integration (Cursor AI)
1. **Copy Backend to Cursor AI Project**
   ```bash
   # Move the Python backend folder to Cursor AI workspace
   mkdir clinicalpad-project
   cd clinicalpad-project
   # Copy backend/ folder from PyCharm
   ```

2. **Create Next.js Frontend**
   ```bash
   npx create-next-app@latest frontend
   cd frontend
   npm install @supabase/supabase-js
   ```

3. **Integrate All Components**
   - Connect Next.js → FastAPI → AWS Bedrock
   - Set up Supabase for data persistence
   - Create user interface for clinical data input

## 🗄️ Database Schema (Supabase)

### Tables Structure
```sql
-- Clinical Cases Table
clinical_cases (
  id uuid PRIMARY KEY,
  transcript text NOT NULL,
  model_b_letter text,
  status varchar(20) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Extraction Results Table
extraction_results (
  id uuid PRIMARY KEY,
  case_id uuid REFERENCES clinical_cases(id),
  chief_complaint text,
  diagnosis_summary text,
  risk_level varchar(10),
  follow_up_action text,
  social_or_medication_risks text,
  alerts jsonb,
  insights jsonb,
  created_at timestamptz DEFAULT now()
);
```

## 🔑 Environment Variables

### Backend (.env)
```env
# AWS Bedrock
BEDROCK_API_KEY=your_bedrock_api_key
AWS_REGION=eu-west-2
MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key

# FastAPI
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
```

### Frontend (.env.local)
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Supabase (Public)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 🚀 API Endpoints (Planned)

### FastAPI Backend Routes
```python
# Clinical Processing
POST /api/extract-single     # Process one clinical case
POST /api/extract-batch      # Process multiple cases
GET  /api/results/{case_id}  # Get extraction results

# Database Operations
GET    /api/cases            # List all cases
POST   /api/cases            # Create new case
PUT    /api/cases/{id}       # Update case
DELETE /api/cases/{id}       # Delete case

# Health Check
GET /health                  # API health status
```

### Next.js API Routes
```javascript
// Frontend API proxies
/api/clinical/extract        # Proxy to FastAPI
/api/cases                   # Supabase CRUD operations
/api/auth                    # Authentication handling
```

## 🔄 Data Flow

1. **Input**: User submits clinical transcript + model B letter
2. **Storage**: Data saved to Supabase clinical_cases table
3. **Processing**: FastAPI calls AWS Bedrock Claude 3 Sonnet
4. **Extraction**: Structured JSON with 7 required fields returned
5. **Storage**: Results saved to extraction_results table
6. **Display**: Next.js frontend shows processed results

## 📦 Key Dependencies

### Python (requirements.txt)
```
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
supabase==2.0.0
requests==2.31.0
python-dotenv==1.0.0
boto3==1.35.0
```

### Node.js (package.json)
```json
{
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "@supabase/supabase-js": "2.38.0",
    "tailwindcss": "3.3.0"
  }
}
```

## 🎯 Next Steps

1. **Convert notebooks to FastAPI backend** (PyCharm)
2. **Move backend to Cursor AI project** 
3. **Create Next.js frontend with Supabase integration**
4. **Set up authentication and security**
5. **Deploy to production** (Backend: Railway/Render, Frontend: Vercel)

📋 **See [TODO.md](./TODO.md) for detailed task breakdown and progress tracking**

## 🧪 Current Testing

The project includes working examples in:
- `bedrock_clinicalpad.ipynb` - Full AWS Bedrock integration
- `claude_test_clean.ipynb` - Simple API testing
- Multiple clinical case examples with expected JSON outputs

## 📝 Clinical Data Processing

### Input Format
- **Transcript**: Raw physician notes (free-form text)
- **Model B Letter**: Structured version preferred by clinicians

### Output Format (JSON)
```json
{
  "chief_complaint": "string | null",
  "diagnosis_summary": "string | null", 
  "risk_level": "high | medium | low",
  "follow_up_action": "string | null",
  "social_or_medication_risks": "string | null",
  "alerts": ["array of strings"],
  "insights": ["array of strings"]
}
```

---

**Development Environment**: PyCharm (Backend) + Cursor AI (Full Stack)  
**Primary Tech Stack**: Python FastAPI + Next.js + Supabase + AWS Bedrock Claude  
**Current Status**: Proof of concept complete, ready for full stack development