import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, CheckCircle } from "lucide-react"

interface ClinicalSummaryProps {
  summary: string
}

export function ClinicalSummary({ summary }: ClinicalSummaryProps) {
  const formatSummary = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('Plan:')) {
        return (
          <div key={index} className="mt-3 pt-3 border-t border-border">
            <h4 className="font-bold text-lg text-medical-blue mb-3">Treatment Plan</h4>
            <p className="text-base text-foreground font-medium leading-relaxed">{line.replace('Plan:', '').trim()}</p>
          </div>
        )
      }
      
      if (line.trim().match(/^\d+\./)) {
        return (
          <div key={index} className="flex items-start gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-medical-blue mt-0.5 flex-shrink-0" />
            <span className="text-base text-foreground font-medium">{line.trim()}</span>
          </div>
        )
      }
      
      return (
        <p key={index} className="text-base text-foreground font-medium mb-2 leading-relaxed">
          {line}
        </p>
      )
    })
  }

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <Stethoscope className="h-6 w-6 text-medical-blue" />
          Clinical Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/40 rounded-xl p-6 border border-muted">
          {formatSummary(summary)}
        </div>
      </CardContent>
    </Card>
  )
}