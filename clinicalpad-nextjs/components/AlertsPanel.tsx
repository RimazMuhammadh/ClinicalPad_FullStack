import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface AlertsPanelProps {
  alerts: string[]
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <AlertCircle className="h-6 w-6 text-medical-blue" />
          Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div 
              key={index}
              className="bg-muted/40 rounded-xl p-4 border border-muted"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-medical-blue mt-0.5 flex-shrink-0" />
                <p className="text-base font-medium text-foreground leading-relaxed">
                  {alert}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}