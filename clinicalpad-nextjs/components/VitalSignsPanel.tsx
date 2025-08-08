import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Thermometer, Heart, Gauge } from "lucide-react"
import { VitalSigns } from "@/types/patient"

interface VitalSignsPanelProps {
  vitalSigns: VitalSigns
}

export function VitalSignsPanel({ vitalSigns }: VitalSignsPanelProps) {
  const vitalsData = [
    {
      label: "Temperature",
      value: vitalSigns.temperature,
      icon: Thermometer,
      color: "text-orange-600"
    },
    {
      label: "O₂ Saturation",
      value: vitalSigns.oxygen_saturation,
      icon: Activity,
      color: "text-blue-600"
    },
    {
      label: "Pulse",
      value: vitalSigns.pulse,
      icon: Heart,
      color: "text-red-600"
    },
    {
      label: "Blood Pressure",
      value: vitalSigns.blood_pressure,
      icon: Gauge,
      color: "text-purple-600"
    }
  ].filter(vital => vital.value)

  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <Activity className="h-6 w-6 text-medical-blue" />
          Vital Signs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {vitalsData.map((vital, index) => {
            const IconComponent = vital.icon
            return (
              <div key={index} className="bg-muted/40 rounded-xl p-4 border border-muted">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className={`h-4 w-4 ${vital.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    {vital.label}
                  </span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {vital.value}
                </p>
              </div>
            )
          })}
          {vitalSigns.respiratory_rate && (
            <div className="bg-muted/40 rounded-xl p-4 border border-muted">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Respiratory Rate
                </span>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {vitalSigns.respiratory_rate}
              </p>
            </div>
          )}
          {vitalSigns.other && (
            <div className="bg-muted/40 rounded-xl p-4 border border-muted col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-muted-foreground">
                  Additional
                </span>
              </div>
              <p className="text-base font-medium text-foreground">
                {vitalSigns.other}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}