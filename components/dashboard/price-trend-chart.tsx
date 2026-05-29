"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Sty", current: 145, avg: 152 },
  { name: "Lut", current: 142, avg: 150 },
  { name: "Mar", current: 148, avg: 151 },
  { name: "Kwi", current: 139, avg: 149 },
  { name: "Maj", current: 135, avg: 148 },
  { name: "Cze", current: 132, avg: 147 },
  { name: "Lip", current: 128, avg: 145 },
]

export function PriceTrendChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Trend cenowy (ostatnie 7 miesięcy)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.22 0 0)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} zł`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.13 0 0)",
                  border: "1px solid oklch(0.22 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`${value} zł`, ""]}
                labelStyle={{ color: "oklch(0.6 0 0)" }}
              />
              <Line
                type="monotone"
                dataKey="current"
                name="Twoja cena"
                stroke="oklch(0.72 0.19 142)"
                strokeWidth={2}
                dot={{ fill: "oklch(0.72 0.19 142)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="avg"
                name="Średnia rynkowa"
                stroke="oklch(0.5 0 0)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Twoja cena</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-4 border-t-2 border-dashed border-muted-foreground" />
            <span className="text-sm text-muted-foreground">Średnia rynkowa</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
