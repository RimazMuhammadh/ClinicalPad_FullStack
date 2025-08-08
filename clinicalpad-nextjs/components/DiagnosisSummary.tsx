import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope } from "lucide-react"

interface DiagnosisSummaryProps {
  diagnosis: string
}

export function DiagnosisSummary({ diagnosis }: DiagnosisSummaryProps) {
  return (
    <Card className="shadow-card border-l-4 border-l-medical-blue hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <Stethoscope className="h-6 w-6 text-medical-blue" />
          Diagnosis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-medical-blue/5 dark:bg-medical-blue/10 rounded-xl p-6 border border-medical-blue/20">
          <p className="text-lg font-semibold text-medical-blue dark:text-medical-blue-light leading-relaxed">
            {diagnosis}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}