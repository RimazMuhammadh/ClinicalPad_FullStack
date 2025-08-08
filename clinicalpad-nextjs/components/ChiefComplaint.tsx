import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ChiefComplaintProps {
  complaint: string
}

export function ChiefComplaint({ complaint }: ChiefComplaintProps) {
  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <AlertTriangle className="h-6 w-6 text-medical-blue" />
          Chief Complaint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/40 rounded-xl p-6 border border-muted">
          <p className="text-lg font-semibold text-foreground leading-relaxed">
            {complaint}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}