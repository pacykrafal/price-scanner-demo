import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
}: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  const isNeutral = change === 0 || change === undefined

  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                  isPositive && "bg-primary/10 text-primary",
                  isNegative && "bg-destructive/10 text-destructive",
                  isNeutral && "bg-muted text-muted-foreground"
                )}
              >
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {isNeutral && <Minus className="h-3 w-3" />}
                <span>
                  {isPositive && "+"}
                  {change}%
                </span>
              </div>
              {changeLabel && (
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
