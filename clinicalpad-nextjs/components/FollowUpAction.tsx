import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface FollowUpActionProps {
  action: string
}

export function FollowUpAction({ action }: FollowUpActionProps) {
  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <Calendar className="h-6 w-6 text-medical-blue" />
          Follow-up Action
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/40 rounded-xl p-6 border border-muted">
          <p className="text-base font-medium text-foreground leading-relaxed">
            {action}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}