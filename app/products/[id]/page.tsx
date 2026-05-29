"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  ExternalLink,
  Bell,
  Share2,
  Star,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { products } from "@/lib/data"

const priceHistory = [
  { date: "1 Sty", price: 5499 },
  { date: "8 Sty", price: 5399 },
  { date: "15 Sty", price: 5299 },
  { date: "22 Sty", price: 5199 },
  { date: "29 Sty", price: 5099 },
  { date: "5 Lut", price: 4999 },
  { date: "12 Lut", price: 4999 },
]

const competitorPrices = [
  { store: "Media Expert", price: 5199, url: "#", inStock: true },
  { store: "RTV Euro AGD", price: 5299, url: "#", inStock: true },
  { store: "x-kom", price: 5099, url: "#", inStock: true },
  { store: "Allegro", price: 4999, url: "#", inStock: true },
  { store: "Komputronik", price: 5399, url: "#", inStock: false },
  { store: "Morele.net", price: 5149, url: "#", inStock: true },
]

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id) || products[0]

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Back Button & Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Powrót do listy
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Alert cenowy
            </Button>
            <Button variant="outline" size="sm">
              <Star className="mr-2 h-4 w-4" />
              Obserwuj
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Udostępnij
            </Button>
          </div>
        </div>

        {/* Product Header */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Product Image */}
              <div className="flex h-48 w-full items-center justify-center rounded-lg bg-muted lg:h-64 lg:w-64">
                <span className="text-muted-foreground">Obraz produktu</span>
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <h1 className="text-2xl font-bold text-foreground">
                    {product.name}
                  </h1>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SKU</p>
                    <p className="font-medium text-foreground">{product.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EAN</p>
                    <p className="font-medium text-foreground">{product.ean}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Najniższa cena</p>
                    <p className="font-medium text-primary">
                      {product.lowestPrice.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Najwyższa cena</p>
                    <p className="font-medium text-foreground">
                      {product.highestPrice.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                </div>

                {/* Current Price */}
                <div className="flex items-end gap-4 rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Aktualna cena</p>
                    <p className="text-3xl font-bold text-foreground">
                      {product.currentPrice.toLocaleString("pl-PL")} zł
                    </p>
                  </div>
                  <Badge
                    className={
                      product.priceChange < 0
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    }
                  >
                    {product.priceChange < 0 ? (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    )}
                    {product.priceChange > 0 && "+"}
                    {product.priceChange}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price History Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Historia cen (ostatnie 6 tygodni)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={priceHistory}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
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
                    domain={["dataMin - 200", "dataMax + 200"]}
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
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="oklch(0.72 0.19 142)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.72 0.19 142)", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Prices */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Oferty konkurencji ({competitorPrices.length} sklepów)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Sklep</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Cena
                  </TableHead>
                  <TableHead className="text-muted-foreground text-center">
                    Dostępność
                  </TableHead>
                  <TableHead className="text-muted-foreground w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorPrices
                  .sort((a, b) => a.price - b.price)
                  .map((competitor, index) => (
                    <TableRow
                      key={competitor.store}
                      className="border-border hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <Badge className="bg-primary/10 text-primary">
                              Najlepsza
                            </Badge>
                          )}
                          <span className="font-medium text-foreground">
                            {competitor.store}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-semibold ${
                            index === 0 ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {competitor.price.toLocaleString("pl-PL")} zł
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={competitor.inStock ? "default" : "secondary"}
                          className={
                            competitor.inStock
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {competitor.inStock ? "Dostępny" : "Brak"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={competitor.url} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
