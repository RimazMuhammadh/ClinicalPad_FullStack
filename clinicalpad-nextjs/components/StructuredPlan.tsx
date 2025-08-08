import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Pill, Calendar, Stethoscope } from "lucide-react"

interface StructuredPlan {
  Diagnosis: string[]
  Medications: string[]
  FollowUp: string
}

interface StructuredPlanProps {
  plan: StructuredPlan
}

export function StructuredPlan({ plan }: StructuredPlanProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-medical-blue" />
          Structured Treatment Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Diagnosis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-medical-blue" />
              <h3 className="font-semibold text-foreground">Diagnosis</h3>
            </div>
            <div className="space-y-2">
              {plan.Diagnosis.map((diagnosis, index) => (
                <Badge key={index} variant="secondary" className="w-full justify-start py-2 px-3">
                  {diagnosis}
                </Badge>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-medical-blue" />
              <h3 className="font-semibold text-foreground">Medications</h3>
            </div>
            <div className="space-y-2">
              {plan.Medications.map((medication, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">{medication}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Up */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-medical-blue" />
              <h3 className="font-semibold text-foreground">Follow-up</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 leading-relaxed">
                {plan.FollowUp}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}