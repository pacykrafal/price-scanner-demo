import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, AlertCircle, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: 1,
    type: "drop",
    message: "iPhone 15 Pro Max spadł o 15% u konkurencji",
    store: "Media Expert",
    time: "2 godz. temu",
  },
  {
    id: 2,
    type: "rise",
    message: "Samsung 55\" TV wzrósł o 8%",
    store: "RTV Euro AGD",
    time: "4 godz. temu",
  },
  {
    id: 3,
    type: "drop",
    message: "Dyson V15 - najniższa cena od 3 miesięcy",
    store: "x-kom",
    time: "6 godz. temu",
  },
]

export function RecentAlerts() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            Ostatnie alerty
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/alerts" className="text-primary hover:text-primary/80">
            Wszystkie
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 rounded-lg border border-border p-3"
            >
              <div
                className={`mt-0.5 rounded-full p-1.5 ${
                  alert.type === "drop"
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {alert.type === "drop" ? (
                  <TrendingDown className="h-3.5 w-3.5" />
                ) : (
                  <TrendingUp className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {alert.message}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {alert.store}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {alert.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
