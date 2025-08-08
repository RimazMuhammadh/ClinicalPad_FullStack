import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react"

interface RiskLevelProps {
  level: "high" | "medium" | "low"
}

const getRiskConfig = (level: string) => {
  switch (level.toLowerCase()) {
    case "high":
      return {
        color: "bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-100 dark:ring-red-900 border-2 border-red-800",
        bgColor: "bg-red-50 dark:bg-red-950/20",
        borderColor: "border-red-200 dark:border-red-800",
        textColor: "text-red-900 dark:text-red-100",
        icon: ShieldAlert,
        iconColor: "text-red-500"
      }
    case "medium":
      return {
        color: "bg-orange-500 hover:bg-orange-600 text-white ring-4 ring-orange-100 dark:ring-orange-900 border-2 border-orange-700",
        bgColor: "bg-orange-50 dark:bg-orange-950/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        textColor: "text-orange-900 dark:text-orange-100",
        icon: Shield,
        iconColor: "text-orange-500"
      }
    case "low":
      return {
        color: "bg-green-600 hover:bg-green-700 text-white ring-4 ring-green-100 dark:ring-green-900 border-2 border-green-800",
        bgColor: "bg-green-50 dark:bg-green-950/20",
        borderColor: "border-green-200 dark:border-green-800",
        textColor: "text-green-900 dark:text-green-100",
        icon: ShieldCheck,
        iconColor: "text-green-500"
      }
    default:
      return {
        color: "bg-gray-500 hover:bg-gray-600 text-white ring-4 ring-gray-100 dark:ring-gray-900 border-2 border-gray-700",
        bgColor: "bg-gray-50 dark:bg-gray-950/20",
        borderColor: "border-gray-200 dark:border-gray-800",
        textColor: "text-gray-900 dark:text-gray-100",
        icon: Shield,
        iconColor: "text-gray-500"
      }
  }
}

export function RiskLevel({ level }: RiskLevelProps) {
  const config = getRiskConfig(level)
  const IconComponent = config.icon

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
          <IconComponent className={`h-6 w-6 ${config.iconColor}`} />
          Risk Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`${config.bgColor} rounded-xl p-6 border ${config.borderColor} text-center`}>
          <Badge className={`text-lg px-6 py-3 font-bold shadow-lg transition-all duration-300 tracking-wide ${config.color}`}>
            {level.toUpperCase()} RISK
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}