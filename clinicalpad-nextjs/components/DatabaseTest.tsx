'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Database, CheckCircle, XCircle } from "lucide-react"
import { supabase } from '@/lib/supabase'

export function DatabaseTest() {
  const [isConnected, setIsConnected] = useState(false)
  const [caseCount, setCaseCount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [firstCase, setFirstCase] = useState<any>(null)

  const testConnection = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Test 1: Count total cases
      const { data: countData, error: countError } = await supabase
        .from('clinical_cases')
        .select('*', { count: 'exact', head: true })

      if (countError) throw countError

      // Test 2: Get first case as example
      const { data: caseData, error: caseError } = await supabase
        .from('clinical_cases')
        .select('case_number, transcript, model_b_letter, patient_name, status')
        .order('case_number', { ascending: true })
        .limit(1)
        .single()

      if (caseError && caseError.code !== 'PGRST116') throw caseError

      setIsConnected(true)
      setCaseCount(countData?.length || 0)
      setFirstCase(caseData)

    } catch (err: any) {
      setError(`Connection failed: ${err.message}`)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Database className="h-6 w-6" />
          Supabase Database Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span>Testing database connection...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {isConnected && !loading && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                ✅ Connected successfully! Found {caseCount} clinical cases
              </span>
            </div>

            {firstCase && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-3">Sample Case Data:</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Case Number:</strong> {firstCase.case_number}</div>
                  <div><strong>Patient Name:</strong> {firstCase.patient_name || 'Not specified'}</div>
                  <div><strong>Status:</strong> {firstCase.status}</div>
                  <div><strong>Transcript Preview:</strong> {firstCase.transcript?.substring(0, 100)}...</div>
                  <div><strong>Model B Preview:</strong> {firstCase.model_b_letter?.substring(0, 100)}...</div>
                </div>
              </div>
            )}
          </div>
        )}

        <Button onClick={testConnection} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            'Test Connection Again'
          )}
        </Button>
      </CardContent>
    </Card>
  )
}