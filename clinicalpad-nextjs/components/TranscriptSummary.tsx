import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock } from "lucide-react"

interface TranscriptSummaryProps {
  summary: string
}

export function TranscriptSummary({ summary }: TranscriptSummaryProps) {
  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <FileText className="h-6 w-6 text-medical-blue" />
          Transcript Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-muted/40 rounded-xl p-6 border border-muted">
            <p className="text-base leading-relaxed text-foreground font-medium">
              {summary}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Generated automatically from consultation audio</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}