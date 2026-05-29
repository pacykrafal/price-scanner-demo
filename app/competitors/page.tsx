"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  Search,
  ExternalLink,
  TrendingDown,
  TrendingUp,
  Store,
  Package,
  AlertCircle,
} from "lucide-react"

const competitors = [
  {
    id: "1",
    name: "Media Expert",
    logo: "/placeholder.svg",
    productsTracked: 845,
    avgPriceDiff: -3.2,
    cheaperProducts: 312,
    moreExpensive: 420,
    same: 113,
    lastSync: "5 min temu",
  },
  {
    id: "2",
    name: "RTV Euro AGD",
    logo: "/placeholder.svg",
    productsTracked: 723,
    avgPriceDiff: 2.1,
    cheaperProducts: 198,
    moreExpensive: 485,
    same: 40,
    lastSync: "12 min temu",
  },
  {
    id: "3",
    name: "x-kom",
    logo: "/placeholder.svg",
    productsTracked: 956,
    avgPriceDiff: -1.5,
    cheaperProducts: 421,
    moreExpensive: 389,
    same: 146,
    lastSync: "3 min temu",
  },
  {
    id: "4",
    name: "Allegro",
    logo: "/placeholder.svg",
    productsTracked: 1234,
    avgPriceDiff: -5.8,
    cheaperProducts: 678,
    moreExpensive: 412,
    same: 144,
    lastSync: "1 min temu",
  },
  {
    id: "5",
    name: "Komputronik",
    logo: "/placeholder.svg",
    productsTracked: 567,
    avgPriceDiff: 4.2,
    cheaperProducts: 145,
    moreExpensive: 398,
    same: 24,
    lastSync: "8 min temu",
  },
  {
    id: "6",
    name: "Morele.net",
    logo: "/placeholder.svg",
    productsTracked: 678,
    avgPriceDiff: -0.8,
    cheaperProducts: 312,
    moreExpensive: 298,
    same: 68,
    lastSync: "15 min temu",
  },
]

const priceComparison = competitors.map((c) => ({
  name: c.name,
  diff: c.avgPriceDiff,
}))

const recentChanges = [
  {
    product: "Samsung Galaxy S24 Ultra",
    competitor: "Media Expert",
    oldPrice: 5299,
    newPrice: 4999,
    change: -5.7,
    time: "2 godz. temu",
  },
  {
    product: "Sony WH-1000XM5",
    competitor: "x-kom",
    oldPrice: 1399,
    newPrice: 1299,
    change: -7.1,
    time: "3 godz. temu",
  },
  {
    product: "MacBook Air M3",
    competitor: "Allegro",
    oldPrice: 5499,
    newPrice: 5699,
    change: 3.6,
    time: "4 godz. temu",
  },
  {
    product: "PlayStation 5 Slim",
    competitor: "RTV Euro AGD",
    oldPrice: 2399,
    newPrice: 2299,
    change: -4.2,
    time: "5 godz. temu",
  },
]

export default function CompetitorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const filteredCompetitors = competitors
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "products") return b.productsTracked - a.productsTracked
      if (sortBy === "diff") return a.avgPriceDiff - b.avgPriceDiff
      return 0
    })

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Konkurencja</h1>
            <p className="text-muted-foreground">
              Monitoruj ceny i oferty konkurentów
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Dodaj konkurenta
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Konkurenci</p>
                  <p className="text-2xl font-bold text-foreground">
                    {competitors.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Śledzone produkty</p>
                  <p className="text-2xl font-bold text-foreground">
                    {competitors
                      .reduce((acc, c) => acc + c.productsTracked, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <TrendingDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tańsze u konkurencji</p>
                  <p className="text-2xl font-bold text-foreground">
                    {competitors.reduce((acc, c) => acc + c.cheaperProducts, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wymagają reakcji</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Comparison Chart */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Średnia różnica cenowa (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceComparison} layout="vertical">
                  <XAxis
                    type="number"
                    stroke="oklch(0.6 0 0)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="oklch(0.6 0 0)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.13 0 0)",
                      border: "1px solid oklch(0.22 0 0)",
                      borderRadius: "8px",
                      color: "oklch(0.95 0 0)",
                    }}
                    formatter={(value: number) => [
                      `${value > 0 ? "+" : ""}${value}%`,
                      "Różnica",
                    ]}
                  />
                  <Bar dataKey="diff" radius={[0, 4, 4, 0]}>
                    {priceComparison.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.diff < 0
                            ? "oklch(0.72 0.19 142)"
                            : "oklch(0.55 0.22 27)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Ujemne wartości oznaczają tańszą ofertę konkurenta
            </p>
          </CardContent>
        </Card>

        {/* Competitors Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Lista konkurentów
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px] bg-background border-border"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] bg-background border-border">
                    <SelectValue placeholder="Sortuj" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nazwa</SelectItem>
                    <SelectItem value="products">Produkty</SelectItem>
                    <SelectItem value="diff">Różnica %</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Sklep</TableHead>
                  <TableHead className="text-muted-foreground text-center">
                    Produkty
                  </TableHead>
                  <TableHead className="text-muted-foreground text-center">
                    Tańsze
                  </TableHead>
                  <TableHead className="text-muted-foreground text-center">
                    Droższe
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Śr. różnica
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Ostatnia sync.
                  </TableHead>
                  <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompetitors.map((competitor) => (
                  <TableRow
                    key={competitor.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted" />
                        <span className="font-medium text-foreground">
                          {competitor.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-foreground">
                      {competitor.productsTracked}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-primary">{competitor.cheaperProducts}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-destructive">
                        {competitor.moreExpensive}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={
                          competitor.avgPriceDiff < 0
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }
                      >
                        {competitor.avgPriceDiff < 0 ? (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        )}
                        {competitor.avgPriceDiff > 0 && "+"}
                        {competitor.avgPriceDiff}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {competitor.lastSync}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Price Changes */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Ostatnie zmiany cen u konkurencji
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentChanges.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{change.product}</p>
                    <p className="text-sm text-muted-foreground">
                      {change.competitor} - {change.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground line-through">
                          {change.oldPrice} zł
                        </span>
                        <span className="font-semibold text-foreground">
                          {change.newPrice} zł
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={
                        change.change < 0
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }
                    >
                      {change.change < 0 ? (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      )}
                      {change.change > 0 && "+"}
                      {change.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
