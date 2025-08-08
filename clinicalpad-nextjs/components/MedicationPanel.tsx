import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pill, AlertTriangle } from "lucide-react"
import { Medication, MedicationChange } from "@/types/patient"

interface MedicationPanelProps {
  currentMedications: Medication[]
  medicationChanges?: MedicationChange[]
  allergies?: Array<{ allergen: string; reaction_type?: string }>
}

export function MedicationPanel({ currentMedications, medicationChanges, allergies }: MedicationPanelProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "start":
        return "bg-green-100 text-green-800 border-green-200"
      case "increase":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "decrease":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "stop":
        return "bg-red-100 text-red-800 border-red-200"
      case "change":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <Pill className="h-6 w-6 text-medical-blue" />
          Medications & Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Allergies Section */}
        {allergies && allergies.length > 0 && (
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Allergies
            </h4>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Badge 
                  key={index}
                  className="bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                >
                  {allergy.allergen}
                  {allergy.reaction_type && ` (${allergy.reaction_type})`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Current Medications */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Current Medications</h4>
          <div className="space-y-2">
            {currentMedications.map((medication, index) => (
              <div key={index} className="bg-muted/40 rounded-xl p-4 border border-muted">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground">{medication.name}</p>
                    <div className="text-sm text-muted-foreground mt-1">
                      {medication.dose && <span>{medication.dose}</span>}
                      {medication.frequency && <span> • {medication.frequency}</span>}
                      {medication.route && <span> • {medication.route}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medication Changes */}
        {medicationChanges && medicationChanges.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground">Treatment Changes</h4>
            <div className="space-y-3">
              {medicationChanges.map((change, index) => (
                <div key={index} className="bg-muted/40 rounded-xl p-4 border border-muted">
                  <div className="flex items-start gap-3">
                    <Badge className={`${getActionColor(change.action)} capitalize font-medium`}>
                      {change.action}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{change.medication}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {change.instructions}
                      </p>
                      {change.duration && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Duration: {change.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}