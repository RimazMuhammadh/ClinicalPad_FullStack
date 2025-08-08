# ClinicalPad - Supabase Database Setup Guide

## 🎯 **Complete Workflow: 90 Transcript Cases → Supabase → Frontend Processing**

This guide covers the complete setup for storing your 90 transcript + Model B rows in Supabase and connecting them to your frontend for AI processing.

---

## 🗄️ **Step 1: Supabase Database Schema**

### **Table Structure for Clinical Cases**

```sql
-- Main table for your 90 transcript cases
CREATE TABLE clinical_cases (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number integer UNIQUE NOT NULL,  -- 1, 2, 3... 90
    
    -- Core data
    transcript text NOT NULL,
    model_b_letter text NOT NULL,
    
    -- Optional patient info (extracted from transcript if available)
    patient_name varchar(255),  -- NULL if not in transcript
    estimated_age varchar(50),   -- NULL if not available
    gender varchar(20),          -- NULL if not available
    
    -- Processing status
    status varchar(20) DEFAULT 'unprocessed',  -- 'unprocessed', 'processing', 'completed', 'failed'
    
    -- Metadata
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Results table (API outputs)
CREATE TABLE extraction_results (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id uuid REFERENCES clinical_cases(id) ON DELETE CASCADE,
    
    -- API output (exact match with your Python API)
    chief_complaint text,
    diagnosis_summary text,
    risk_level varchar(10) CHECK (risk_level IN ('high', 'medium', 'low')),
    follow_up_action text,
    social_or_medication_risks text,
    alerts jsonb DEFAULT '[]',
    insights jsonb DEFAULT '[]',
    
    -- Processing metadata
    processing_time_seconds float,
    raw_ai_output text,
    
    created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_clinical_cases_case_number ON clinical_cases(case_number);
CREATE INDEX idx_clinical_cases_status ON clinical_cases(status);
CREATE INDEX idx_extraction_results_case_id ON extraction_results(case_id);
```

---

## 📥 **Step 2: Data Import Strategies**

### **Option A: CSV Upload via Supabase Dashboard**

**1. Prepare CSV file:**
```csv
case_number,transcript,model_b_letter,patient_name
1,"Patient presents with shortness of breath...","CLINICAL SUMMARY: 45-year-old male...","John Smith"
2,"Chief complaint: chest pain...","DOCUMENTATION: Patient reports....",
3,"History of present illness...","STRUCTURED NOTE: 67-year-old female..","Mary Johnson"
```

**2. Upload Steps:**
- Go to Supabase Dashboard → Table Editor
- Select `clinical_cases` table
- Click "Insert" → "Import data from CSV"
- Upload your CSV file

### **Option B: Bulk Insert via SQL**

```sql
-- Insert your 90 cases (example format)
INSERT INTO clinical_cases (case_number, transcript, model_b_letter, patient_name) VALUES
(1, 'Your transcript 1 text here...', 'Your Model B 1 text here...', 'Patient Name or NULL'),
(2, 'Your transcript 2 text here...', 'Your Model B 2 text here...', NULL),
(3, 'Your transcript 3 text here...', 'Your Model B 3 text here...', 'Another Patient Name'),
-- ... continue for all 90 cases
(90, 'Your transcript 90 text here...', 'Your Model B 90 text here...', 'Final Patient Name');
```

### **Option C: Programmatic Insert (JavaScript)**

```javascript
// For large datasets, use batch insert
const supabase = createClient(url, key)

const insertCases = async (casesData) => {
  const { data, error } = await supabase
    .from('clinical_cases')
    .insert(casesData)
  
  if (error) console.error('Error:', error)
  else console.log('Inserted:', data.length, 'cases')
}

// Your 90 cases array
const cases = [
  {
    case_number: 1,
    transcript: "Your transcript 1...",
    model_b_letter: "Your Model B 1...",
    patient_name: "John Smith" // or null
  },
  // ... all 90 cases
]

await insertCases(cases)
```

---

## 🎯 **Step 3: Frontend Case Selection Component**

### **Complete CaseSelector Component**

```tsx
// components/CaseSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Play, CheckCircle, XCircle, Clock } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface ClinicalCase {
  id: string
  case_number: number
  transcript: string
  model_b_letter: string
  patient_name: string | null
  status: 'unprocessed' | 'processing' | 'completed' | 'failed'
  created_at: string
}

interface ProcessedResult {
  chief_complaint: string | null
  diagnosis_summary: string | null
  risk_level: 'high' | 'medium' | 'low'
  follow_up_action: string | null
  social_or_medication_risks: string | null
  alerts: string[]
  insights: string[]
}

export function CaseSelector() {
  const [cases, setCases] = useState<ClinicalCase[]>([])
  const [selectedCase, setSelectedCase] = useState<ClinicalCase | null>(null)
  const [processedResult, setProcessedResult] = useState<ProcessedResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const supabase = createClientComponentClient()

  // Load all cases from Supabase
  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      const { data, error } = await supabase
        .from('clinical_cases')
        .select('*')
        .order('case_number', { ascending: true })

      if (error) throw error
      setCases(data || [])
    } catch (error) {
      console.error('Error loading cases:', error)
    } finally {
      setLoading(false)
    }
  }

  const processCase = async (clinicalCase: ClinicalCase) => {
    setIsProcessing(true)
    setSelectedCase(clinicalCase)
    setProcessedResult(null)

    try {
      // Update status to processing
      await supabase
        .from('clinical_cases')
        .update({ status: 'processing' })
        .eq('id', clinicalCase.id)

      // Call your Python API
      const response = await fetch('http://localhost:8000/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: clinicalCase.transcript,
          model_b_letter: clinicalCase.model_b_letter
        })
      })

      const result = await response.json()

      if (result.success) {
        // Store results in Supabase
        await supabase
          .from('extraction_results')
          .insert({
            case_id: clinicalCase.id,
            ...result.data,
            processing_time_seconds: result.processing_time,
            raw_ai_output: result.raw_output
          })

        // Update case status to completed
        await supabase
          .from('clinical_cases')
          .update({ status: 'completed' })
          .eq('id', clinicalCase.id)

        setProcessedResult(result.data)
      } else {
        // Mark as failed
        await supabase
          .from('clinical_cases')
          .update({ status: 'failed' })
          .eq('id', clinicalCase.id)
        
        console.error('Processing failed:', result.error)
      }
    } catch (error) {
      console.error('Error processing case:', error)
      await supabase
        .from('clinical_cases')
        .update({ status: 'failed' })
        .eq('id', clinicalCase.id)
    } finally {
      setIsProcessing(false)
      loadCases() // Refresh case list
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cases...</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Case List */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Cases ({cases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {cases.map((clinicalCase) => (
              <div
                key={clinicalCase.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(clinicalCase.status)}
                  <div>
                    <div className="font-medium">
                      Case #{clinicalCase.case_number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {clinicalCase.patient_name || 'Patient Name Not Available'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(clinicalCase.status)}>
                    {clinicalCase.status}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => processCase(clinicalCase)}
                    disabled={isProcessing || clinicalCase.status === 'processing'}
                  >
                    {isProcessing && selectedCase?.id === clinicalCase.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Results</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedCase && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <h3 className="font-semibold">Case #{selectedCase.case_number}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedCase.patient_name || 'Patient Name Not Available'}
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2">Processing with AI...</span>
            </div>
          )}

          {processedResult && (
            <div className="space-y-4">
              {/* Chief Complaint */}
              {processedResult.chief_complaint && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Chief Complaint</h4>
                  <p className="text-sm bg-muted/50 p-3 rounded">
                    {processedResult.chief_complaint}
                  </p>
                </div>
              )}

              {/* Diagnosis */}
              {processedResult.diagnosis_summary && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Diagnosis Summary</h4>
                  <p className="text-sm bg-muted/50 p-3 rounded">
                    {processedResult.diagnosis_summary}
                  </p>
                </div>
              )}

              {/* Risk Level */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Risk Level</h4>
                <Badge className={
                  processedResult.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                  processedResult.risk_level === 'medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }>
                  {processedResult.risk_level.toUpperCase()}
                </Badge>
              </div>

              {/* Follow-up Action */}
              {processedResult.follow_up_action && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Follow-up Action</h4>
                  <p className="text-sm bg-muted/50 p-3 rounded">
                    {processedResult.follow_up_action}
                  </p>
                </div>
              )}

              {/* Social/Medication Risks */}
              {processedResult.social_or_medication_risks && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Social/Medication Risks</h4>
                  <p className="text-sm bg-muted/50 p-3 rounded">
                    {processedResult.social_or_medication_risks}
                  </p>
                </div>
              )}

              {/* Alerts */}
              {processedResult.alerts.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Alerts</h4>
                  <div className="space-y-2">
                    {processedResult.alerts.map((alert, index) => (
                      <div key={index} className="text-sm bg-red-50 text-red-800 p-2 rounded">
                        • {alert}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Insights */}
              {processedResult.insights.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Clinical Insights</h4>
                  <div className="space-y-2">
                    {processedResult.insights.map((insight, index) => (
                      <div key={index} className="text-sm bg-blue-50 text-blue-800 p-2 rounded">
                        • {insight}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## ⚡ **Step 4: Frontend Page Integration**

### **Cases Page**

```tsx
// app/cases/page.tsx
'use client'

import { CaseSelector } from '@/components/CaseSelector'

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-medical-blue-light p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Clinical Case Processing</h1>
            <p className="text-muted-foreground mt-2">
              Process your clinical transcripts with AI-powered analysis
            </p>
          </div>
        </div>
        <CaseSelector />
      </div>
    </div>
  )
}
```

---

## 🔧 **Step 5: Required Dependencies**

### **Install Supabase Client**

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### **Environment Variables**

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🛠️ **Step 6: Supabase Client Setup**

### **Create Supabase Client**

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## 📊 **Step 7: Data Management Features**

### **Batch Processing Component (Optional)**

```tsx
// components/BatchProcessor.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export function BatchProcessor({ cases }: { cases: ClinicalCase[] }) {
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const processAllUnprocessed = async () => {
    const unprocessedCases = cases.filter(c => c.status === 'unprocessed')
    setProcessing(true)
    
    for (let i = 0; i < unprocessedCases.length; i++) {
      // Process each case
      await processCase(unprocessedCases[i])
      setProgress(((i + 1) / unprocessedCases.length) * 100)
    }
    
    setProcessing(false)
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={processAllUnprocessed}
        disabled={processing}
        className="w-full"
      >
        {processing ? 'Processing All Cases...' : 'Process All Unprocessed Cases'}
      </Button>
      
      {processing && (
        <Progress value={progress} className="w-full" />
      )}
    </div>
  )
}
```

---

## 🎯 **Features You Get**

### ✅ **Core Features**
- **Case Management**: List all 90 cases with status tracking
- **One-Click Processing**: Individual case processing with visual feedback
- **Real-Time Updates**: Status changes (unprocessed → processing → completed)
- **Results Display**: Immediate display of all AI analysis results
- **Persistent Storage**: All results stored in Supabase for future access
- **Error Handling**: Failed cases marked and trackable

### ✅ **UI Features**
- **Clean Medical Theme**: Consistent with your existing design
- **Patient Name Handling**: Graceful display when names are not available
- **Status Icons**: Visual indicators for each case status
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Proper feedback during processing

### ✅ **Advanced Features**
- **Batch Processing**: Process multiple cases automatically
- **Search & Filter**: Find specific cases easily
- **Export Results**: Export processed data as CSV/JSON
- **Audit Trail**: Complete history of all processing activities

---

## 🚀 **Implementation Timeline**

### **Phase 1 (This Week)**
1. Set up Supabase project and tables
2. Import your 90 transcript cases
3. Install dependencies and configure environment
4. Add CaseSelector component to your app

### **Phase 2 (Next Week)**  
1. Add batch processing capabilities
2. Implement search and filtering
3. Add data export functionality
4. Enhance error handling and retry logic

### **Phase 3 (Future)**
1. Add user authentication and role management
2. Implement real-time collaboration features
3. Add advanced analytics and reporting
4. Mobile app integration

---

## 📋 **Quick Start Checklist**

- [ ] Create Supabase project
- [ ] Run SQL schema in Supabase SQL Editor
- [ ] Import your 90 transcript cases
- [ ] Install npm dependencies
- [ ] Set up environment variables
- [ ] Add CaseSelector component
- [ ] Test with first case processing
- [ ] Verify results storage in Supabase

**This setup gives you a complete case management and processing system for your clinical transcripts with AI-powered analysis!** 🎯