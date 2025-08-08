'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Play, CheckCircle, XCircle, Clock, User, Eye } from "lucide-react"
import { supabase } from '@/lib/supabase'

// Components for displaying results
import { ChiefComplaint } from "@/components/ChiefComplaint"
import { DiagnosisSummary } from "@/components/DiagnosisSummary" 
import { FollowUpAction } from "@/components/FollowUpAction"
import { AlertsPanel } from "@/components/AlertsPanel"

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

interface CaseWithResults extends ClinicalCase {
  results?: ProcessedResult
}

export function CaseProcessor() {
  const [cases, setCases] = useState<CaseWithResults[]>([])
  const [selectedCase, setSelectedCase] = useState<CaseWithResults | null>(null)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string>('')

  // Load all cases from Supabase
  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      console.log('🔄 Loading cases from Supabase...')
      
      const { data: casesData, error: casesError } = await supabase
        .from('clinical_cases')
        .select('*')
        .order('case_number', { ascending: true })

      console.log('📊 Cases query result:', { casesData, casesError })

      if (casesError) {
        console.error('❌ Cases error:', casesError)
        throw casesError
      }

      console.log(`✅ Found ${casesData?.length || 0} cases`)

      // Load existing results for completed cases
      console.log('🔄 Loading extraction results...')
      const { data: resultsData, error: resultsError } = await supabase
        .from('extraction_results')
        .select('*')

      console.log('📊 Results query result:', { resultsData, resultsError })

      if (resultsError) {
        console.error('❌ Results error:', resultsError)
        // Don't throw here, just log - results table might be empty
        console.log('⚠️ No results found, continuing with cases only')
      }

      // Combine cases with their results
      const casesWithResults = casesData?.map(clinicalCase => {
        const result = resultsData?.find(r => r.case_id === clinicalCase.id)
        return {
          ...clinicalCase,
          results: result ? {
            chief_complaint: result.chief_complaint,
            diagnosis_summary: result.diagnosis_summary,
            risk_level: result.risk_level,
            follow_up_action: result.follow_up_action,
            social_or_medication_risks: result.social_or_medication_risks,
            alerts: result.alerts || [],
            insights: result.insights || []
          } : undefined
        }
      }) || []

      console.log(`✅ Processed ${casesWithResults.length} cases with results`)
      setCases(casesWithResults)
      setError('') // Clear any previous errors
    } catch (error) {
      console.error('❌ Error loading cases:', error)
      // Show more detailed error information
      if (error && typeof error === 'object') {
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        })
        setError(`Database error: ${error.message || 'Unknown error'}`)
      } else {
        setError('Failed to load cases from database')
      }
    } finally {
      setLoading(false)
    }
  }

  const processCase = async (clinicalCase: ClinicalCase) => {
    setIsProcessing(clinicalCase.id)

    try {
      // Update status to processing
      await supabase
        .from('clinical_cases')
        .update({ status: 'processing' })
        .eq('id', clinicalCase.id)

      // Call your Python FastAPI
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

        // Refresh cases to show new results
        await loadCases()
        
        console.log('✅ Processing completed for case', clinicalCase.case_number)
      } else {
        // Mark as failed
        await supabase
          .from('clinical_cases')
          .update({ status: 'failed' })
          .eq('id', clinicalCase.id)
        
        console.error('❌ Processing failed:', result.error)
      }
    } catch (error) {
      console.error('Error processing case:', error)
      await supabase
        .from('clinical_cases')
        .update({ status: 'failed' })
        .eq('id', clinicalCase.id)
    } finally {
      setIsProcessing(null)
      await loadCases()
    }
  }

  const viewCase = (clinicalCase: CaseWithResults) => {
    setSelectedCase(clinicalCase)
    setShowResults(true)
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
        return 'bg-green-100 text-green-800 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading clinical cases...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            Database Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-800 mb-4">{error}</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Troubleshooting steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check if your Supabase project is running</li>
              <li>Verify environment variables in .env.local</li>
              <li>Ensure tables exist in Supabase dashboard</li>
              <li>Check browser console for detailed error logs</li>
            </ol>
          </div>
          <Button onClick={loadCases} className="mt-4">
            <Loader2 className="h-4 w-4 mr-2" />
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (showResults && selectedCase) {
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Case #{selectedCase.case_number}</h2>
            <p className="text-muted-foreground">
              {selectedCase.patient_name || 'Patient Name Not Available'}
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowResults(false)}>
            ← Back to Cases
          </Button>
        </div>

        {selectedCase.results ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chief Complaint */}
            {selectedCase.results.chief_complaint && (
              <ChiefComplaint complaint={selectedCase.results.chief_complaint} />
            )}

            {/* Diagnosis Summary */}
            {selectedCase.results.diagnosis_summary && (
              <DiagnosisSummary diagnosis={selectedCase.results.diagnosis_summary} />
            )}

            {/* Follow-up Action */}
            {selectedCase.results.follow_up_action && (
              <FollowUpAction action={selectedCase.results.follow_up_action} />
            )}

            {/* Risk Level */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getRiskColor(selectedCase.results.risk_level)}>
                  {selectedCase.results.risk_level.toUpperCase()} RISK
                </Badge>
                {selectedCase.results.social_or_medication_risks && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Social/Medication Risks:</h4>
                    <p className="text-sm bg-muted/50 p-3 rounded">
                      {selectedCase.results.social_or_medication_risks}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alerts */}
            {selectedCase.results.alerts.length > 0 && (
              <AlertsPanel alerts={selectedCase.results.alerts} />
            )}

            {/* Clinical Insights */}
            {selectedCase.results.insights.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl">Clinical Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedCase.results.insights.map((insight, index) => (
                      <div key={index} className="bg-blue-50 text-blue-800 p-3 rounded-lg">
                        <p className="text-sm font-medium">• {insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                This case hasn't been processed yet. 
                <Button 
                  variant="link" 
                  onClick={() => {
                    setShowResults(false)
                    processCase(selectedCase)
                  }}
                >
                  Process it now →
                </Button>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinical Cases</h1>
          <p className="text-muted-foreground mt-2">
            Process your clinical transcripts with AI analysis ({cases.length} cases loaded)
          </p>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((clinicalCase) => (
          <Card key={clinicalCase.id} className="shadow-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-medical-blue rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Case #{clinicalCase.case_number}</div>
                    <div className="text-sm text-muted-foreground">
                      {clinicalCase.patient_name || 'Patient Name Not Available'}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(clinicalCase.status)}>
                  {getStatusIcon(clinicalCase.status)}
                  <span className="ml-1">{clinicalCase.status}</span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Show results preview if available */}
              {clinicalCase.results && (
                <div className="space-y-2 mb-4">
                  <div className="text-sm">
                    <strong>Risk:</strong> 
                    <Badge size="sm" className={`ml-2 ${getRiskColor(clinicalCase.results.risk_level)}`}>
                      {clinicalCase.results.risk_level.toUpperCase()}
                    </Badge>
                  </div>
                  {clinicalCase.results.chief_complaint && (
                    <div className="text-sm">
                      <strong>Chief Complaint:</strong> {clinicalCase.results.chief_complaint.substring(0, 60)}...
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => viewCase(clinicalCase)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                
                <Button
                  size="sm"
                  onClick={() => processCase(clinicalCase)}
                  disabled={isProcessing === clinicalCase.id || clinicalCase.status === 'processing'}
                  className="flex-1"
                >
                  {isProcessing === clinicalCase.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Play className="h-4 w-4 mr-1" />
                  )}
                  {clinicalCase.status === 'completed' ? 'Reprocess' : 'Process'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}