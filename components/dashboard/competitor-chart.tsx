"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const data = [
  { name: "Media Expert", price: 1299, isYou: false },
  { name: "RTV Euro AGD", price: 1349, isYou: false },
  { name: "LoPrice", price: 1199, isYou: true },
  { name: "Allegro", price: 1279, isYou: false },
  { name: "x-kom", price: 1399, isYou: false },
]

export function CompetitorComparisonChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Porównanie z konkurencją
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis
                type="number"
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value} zł`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="oklch(0.6 0 0)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={75}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.13 0 0)",
                  border: "1px solid oklch(0.22 0 0)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
                formatter={(value: number) => [`${value} zł`, "Cena"]}
                labelStyle={{ color: "oklch(0.6 0 0)" }}
              />
              <Bar dataKey="price" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isYou ? "oklch(0.72 0.19 142)" : "oklch(0.3 0 0)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
