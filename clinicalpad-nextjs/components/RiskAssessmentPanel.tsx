import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { RiskStratification } from "@/types/patient"

interface RiskAssessmentPanelProps {
  riskStratification: RiskStratification
}

export function RiskAssessmentPanel({ riskStratification }: RiskAssessmentPanelProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-600 text-white border-red-800"
      case "high":
        return "bg-red-500 text-white border-red-700"
      case "moderate":
        return "bg-orange-500 text-white border-orange-700"
      case "low":
        return "bg-green-600 text-white border-green-800"
      default:
        return "bg-gray-500 text-white border-gray-700"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return "bg-red-600 text-white"
      case "urgent_24h":
        return "bg-red-500 text-white"
      case "urgent_72h":
        return "bg-orange-500 text-white"
      case "routine":
        return "bg-green-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatUrgency = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return "Immediate"
      case "urgent_24h":
        return "Urgent (24h)"
      case "urgent_72h":
        return "Urgent (72h)"
      case "routine":
        return "Routine"
      default:
        return urgency
    }
  }

  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <AlertTriangle className="h-6 w-6 text-medical-blue" />
          Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Risk and Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted/40 rounded-xl p-4 border border-muted">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-medical-blue" />
              <span className="text-sm font-medium text-muted-foreground">Overall Risk</span>
            </div>
            <Badge className={`${getRiskColor(riskStratification.overall_risk)} text-base px-4 py-2 font-bold capitalize`}>
              {riskStratification.overall_risk}
            </Badge>
          </div>
          
          <div className="bg-muted/40 rounded-xl p-4 border border-muted">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-medical-blue" />
              <span className="text-sm font-medium text-muted-foreground">Urgency</span>
            </div>
            <Badge className={`${getUrgencyColor(riskStratification.urgency)} text-base px-4 py-2 font-bold`}>
              {formatUrgency(riskStratification.urgency)}
            </Badge>
          </div>
        </div>

        {/* Time-based Action */}
        <div className="bg-muted/40 rounded-xl p-4 border border-muted">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-medical-blue" />
            <span className="text-sm font-medium text-muted-foreground">Time-based Action</span>
          </div>
          <p className="text-base font-medium text-foreground">
            {riskStratification.time_based_action}
          </p>
        </div>

        {/* Specific Risks */}
        {Object.entries(riskStratification.specific_risks).some(([_, value]) => value) && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Specific Risk Areas</h4>
            <div className="space-y-2">
              {Object.entries(riskStratification.specific_risks).map(([riskType, riskDescription]) => {
                if (!riskDescription) return null
                return (
                  <div key={riskType} className="bg-muted/40 rounded-xl p-3 border border-muted">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {riskType.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">{riskDescription}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {riskStratification.risk_factors.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <TrendingUp className="h-5 w-5 text-red-600" />
              Risk Factors
            </h4>
            <div className="flex flex-wrap gap-2">
              {riskStratification.risk_factors.map((factor, index) => (
                <Badge 
                  key={index}
                  className="bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                >
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Protective Factors */}
        {riskStratification.protective_factors.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Shield className="h-5 w-5 text-green-600" />
              Protective Factors
            </h4>
            <div className="flex flex-wrap gap-2">
              {riskStratification.protective_factors.map((factor, index) => (
                <Badge 
                  key={index}
                  className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                >
                  {factor}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}