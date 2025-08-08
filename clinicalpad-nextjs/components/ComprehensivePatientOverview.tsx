import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Hash, Activity, Clock, MapPin } from "lucide-react"
import { ComprehensivePatient } from "@/types/patient"

interface ComprehensivePatientOverviewProps {
  patient: ComprehensivePatient
}

const getRiskVariant = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive"
    case "moderate":
      return "secondary"
    case "low":
      return "default"
    default:
      return "secondary"
  }
}

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "critical":
      return "bg-red-700 hover:bg-red-800 text-white ring-4 ring-red-100 dark:ring-red-900 border-2 border-red-900"
    case "high":
      return "bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-100 dark:ring-red-900 border-2 border-red-800"
    case "moderate":
      return "bg-orange-500 hover:bg-orange-600 text-white ring-4 ring-orange-100 dark:ring-orange-900 border-2 border-orange-700"
    case "low":
      return "bg-green-600 hover:bg-green-700 text-white ring-4 ring-green-100 dark:ring-green-900 border-2 border-green-800"
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white ring-4 ring-gray-100 dark:ring-gray-900 border-2 border-gray-700"
  }
}

export function ComprehensivePatientOverview({ patient }: ComprehensivePatientOverviewProps) {
  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-medical-blue rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">{patient.PatientName}</h2>
              <div className="flex items-center gap-6 text-base text-muted-foreground font-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{patient.DateOfConsultation}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{patient.PatientAge} • {patient.gender}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  <span>{patient.PatientID}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{patient.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last visit: {patient.lastVisit}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge 
              className={`text-lg px-6 py-3 font-bold shadow-lg transition-all duration-300 tracking-wide ${getRiskColor(patient.risk_stratification.overall_risk)}`}
            >
              <Activity className="h-3 w-3 mr-2" />
              {patient.risk_stratification.overall_risk.toUpperCase()} RISK
            </Badge>
            
            {/* Primary Complaint Badge */}
            <Badge 
              variant="outline"
              className="text-base px-4 py-2 font-semibold bg-background/80 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white transition-all duration-300"
            >
              {patient.presenting_complaints.primary}
            </Badge>
          </div>
        </div>

        {/* Quick Summary Section */}
        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-muted">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Primary Diagnosis:</span>
              <p className="font-semibold text-foreground mt-1">{patient.assessment_and_diagnosis.primary_diagnosis}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Symptom Duration:</span>
              <p className="font-semibold text-foreground mt-1">{patient.presenting_complaints.symptom_duration}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Urgency Level:</span>
              <p className="font-semibold text-foreground mt-1 capitalize">
                {patient.risk_stratification.urgency.replace(/_/g, ' ')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}