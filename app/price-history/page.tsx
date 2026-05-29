"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Calendar, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { products } from "@/lib/data"

const priceHistoryData = {
  "7d": [
    { date: "Pon", product1: 4999, product2: 6299, product3: 1299 },
    { date: "Wt", product1: 4999, product2: 6199, product3: 1299 },
    { date: "Śr", product1: 4899, product2: 6199, product3: 1249 },
    { date: "Czw", product1: 4899, product2: 6099, product3: 1249 },
    { date: "Pt", product1: 4799, product2: 6099, product3: 1199 },
    { date: "Sob", product1: 4799, product2: 5999, product3: 1199 },
    { date: "Nd", product1: 4799, product2: 5999, product3: 1199 },
  ],
  "30d": [
    { date: "Tydz 1", product1: 5299, product2: 6499, product3: 1499 },
    { date: "Tydz 2", product1: 5199, product2: 6399, product3: 1399 },
    { date: "Tydz 3", product1: 5099, product2: 6299, product3: 1349 },
    { date: "Tydz 4", product1: 4999, product2: 6199, product3: 1299 },
    { date: "Tydz 5", product1: 4899, product2: 6099, product3: 1249 },
  ],
  "90d": [
    { date: "Sty", product1: 5499, product2: 6699, product3: 1599 },
    { date: "Lut", product1: 5399, product2: 6599, product3: 1499 },
    { date: "Mar", product1: 5199, product2: 6399, product3: 1399 },
    { date: "Kwi", product1: 4999, product2: 6199, product3: 1299 },
  ],
}

const trackedProducts = products.slice(0, 3)

export default function PriceHistoryPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [selectedProduct, setSelectedProduct] = useState("all")

  const data = priceHistoryData[timeRange]

  const chartColors = [
    "oklch(0.72 0.19 142)",
    "oklch(0.65 0.15 200)",
    "oklch(0.6 0.12 280)",
  ]

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Historia cen</h1>
            <p className="text-muted-foreground">
              Śledź zmiany cen produktów w czasie
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={(v) => setTimeRange(v as "7d" | "30d" | "90d")}>
              <SelectTrigger className="w-[140px] bg-background border-border">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 dni</SelectItem>
                <SelectItem value="30d">30 dni</SelectItem>
                <SelectItem value="90d">90 dni</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[200px] bg-background border-border">
                <SelectValue placeholder="Wybierz produkt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie produkty</SelectItem>
                {trackedProducts.map((product, index) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name.slice(0, 30)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {trackedProducts.map((product, index) => (
            <Card key={product.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: chartColors[index] }}
                    />
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {product.currentPrice.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                  <Badge
                    className={
                      product.priceChange < 0
                        ? "bg-primary/10 text-primary"
                        : product.priceChange > 0
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {product.priceChange < 0 ? (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    ) : product.priceChange > 0 ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <Minus className="mr-1 h-3 w-3" />
                    )}
                    {product.priceChange > 0 && "+"}
                    {product.priceChange}%
                  </Badge>
                </div>
                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>Min: {product.lowestPrice.toLocaleString("pl-PL")} zł</span>
                  <span>Max: {product.highestPrice.toLocaleString("pl-PL")} zł</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Wykres cen ({timeRange === "7d" ? "7 dni" : timeRange === "30d" ? "30 dni" : "90 dni"})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.22 0 0)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
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
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    formatter={(value) => {
                      const index = parseInt(value.replace("product", "")) - 1
                      return (
                        <span className="text-sm text-foreground">
                          {trackedProducts[index]?.name.slice(0, 25)}...
                        </span>
                      )
                    }}
                  />
                  {(selectedProduct === "all" || selectedProduct === "1") && (
                    <Line
                      type="monotone"
                      dataKey="product1"
                      name="product1"
                      stroke={chartColors[0]}
                      strokeWidth={2}
                      dot={{ fill: chartColors[0], strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  )}
                  {(selectedProduct === "all" || selectedProduct === "2") && (
                    <Line
                      type="monotone"
                      dataKey="product2"
                      name="product2"
                      stroke={chartColors[1]}
                      strokeWidth={2}
                      dot={{ fill: chartColors[1], strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  )}
                  {(selectedProduct === "all" || selectedProduct === "3") && (
                    <Line
                      type="monotone"
                      dataKey="product3"
                      name="product3"
                      stroke={chartColors[2]}
                      strokeWidth={2}
                      dot={{ fill: chartColors[2], strokeWidth: 0, r: 3 }}
                      activeDot={{ r: 5, strokeWidth: 0 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Price Statistics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Statystyki cenowe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Największe spadki
                </h3>
                {products
                  .filter((p) => p.priceChange < 0)
                  .sort((a, b) => a.priceChange - b.priceChange)
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <span className="text-sm text-foreground line-clamp-1">
                        {product.name}
                      </span>
                      <Badge className="bg-primary/10 text-primary">
                        {product.priceChange}%
                      </Badge>
                    </div>
                  ))}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Stabilne ceny
                </h3>
                <div className="flex h-[140px] items-center justify-center rounded-lg border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">
                    Brak produktów ze stabilnymi cenami
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Średnia zmiana
                </h3>
                <div className="rounded-lg border border-border p-4 text-center">
                  <p className="text-3xl font-bold text-primary">-8.1%</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    w ostatnich 30 dniach
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
