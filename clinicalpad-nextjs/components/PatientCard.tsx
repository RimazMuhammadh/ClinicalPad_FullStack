'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Calendar, User, FileText, Activity } from "lucide-react"

interface PatientData {
  PatientName: string
  DateOfConsultation: string
  TranscriptSummary: string
  ClinicalSummary: string
  StructuredPlan: {
    Diagnosis: string[]
    Medications: string[]
    FollowUp: string
  }
  PriorityLevel: "High" | "Medium" | "Low"
}

interface PatientCardProps {
  patient: PatientData
}

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-priority-high text-white"
    case "medium":
      return "bg-priority-medium text-white"
    case "low":
      return "bg-priority-low text-white"
    default:
      return "bg-medical-gray text-white"
  }
}

export function PatientCard({ patient }: PatientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showStructuredPlan, setShowStructuredPlan] = useState(false)

  return (
    <Card className="w-full shadow-card hover:shadow-hover transition-shadow duration-200 border-medical-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-blue rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {patient.PatientName}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-medical-gray mt-1">
                <Calendar className="w-4 h-4" />
                <span>{patient.DateOfConsultation}</span>
              </div>
            </div>
          </div>
          <Badge className={`${getPriorityColor(patient.PriorityLevel)} px-3 py-1 text-sm font-medium`}>
            {patient.PriorityLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Transcript Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-medical-blue" />
            <h4 className="font-medium text-foreground">Transcript Summary</h4>
          </div>
          <p className="text-sm text-medical-gray leading-relaxed bg-medical-light-gray p-3 rounded-md">
            {patient.TranscriptSummary}
          </p>
        </div>

        {/* Clinical Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-medical-blue" />
            <h4 className="font-medium text-foreground">Clinical Summary</h4>
          </div>
          <div className="text-sm text-medical-gray leading-relaxed bg-medical-light-gray p-3 rounded-md">
            {patient.ClinicalSummary.split('\n').map((line, index) => (
              <p key={index} className="mb-1 last:mb-0">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Structured Plan Toggle */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between text-medical-blue border-medical-border hover:bg-medical-light-gray"
            >
              <span className="font-medium">Structured Plan Details</span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3">
            <div className="space-y-4 p-4 bg-medical-light-gray rounded-md">
              <div className="flex gap-2 mb-3">
                <Button
                  size="sm"
                  variant={showStructuredPlan ? "outline" : "default"}
                  onClick={() => setShowStructuredPlan(false)}
                  className="text-xs"
                >
                  Summary View
                </Button>
                <Button
                  size="sm"
                  variant={showStructuredPlan ? "default" : "outline"}
                  onClick={() => setShowStructuredPlan(true)}
                  className="text-xs"
                >
                  JSON View
                </Button>
              </div>

              {showStructuredPlan ? (
                <pre className="text-xs bg-card p-3 rounded border overflow-x-auto">
                  {JSON.stringify(patient.StructuredPlan, null, 2)}
                </pre>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm text-foreground mb-2">Diagnosis</h5>
                    <ul className="list-disc list-inside text-sm text-medical-gray space-y-1">
                      {patient.StructuredPlan.Diagnosis.map((diagnosis, index) => (
                        <li key={index}>{diagnosis}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-foreground mb-2">Medications</h5>
                    <ul className="list-disc list-inside text-sm text-medical-gray space-y-1">
                      {patient.StructuredPlan.Medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-foreground mb-2">Follow-up</h5>
                    <p className="text-sm text-medical-gray">{patient.StructuredPlan.FollowUp}</p>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}