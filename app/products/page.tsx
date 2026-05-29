"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  Filter,
  TrendingDown,
  TrendingUp,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { products, categories } from "@/lib/data"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
  const [sortBy, setSortBy] = useState("name")

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ean.includes(searchQuery)
      const matchesCategory =
        selectedCategory === "Wszystkie" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "price") return a.currentPrice - b.currentPrice
      if (sortBy === "change") return a.priceChange - b.priceChange
      return 0
    })

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Produkty</h1>
            <p className="text-muted-foreground">
              Zarządzaj i monitoruj śledzone produkty
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Dodaj produkt
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Szukaj po nazwie, SKU lub EAN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background border-border"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[160px] bg-background border-border">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Kategoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] bg-background border-border">
                    <SelectValue placeholder="Sortuj" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nazwa</SelectItem>
                    <SelectItem value="price">Cena</SelectItem>
                    <SelectItem value="change">Zmiana %</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Produkt</TableHead>
                  <TableHead className="text-muted-foreground">SKU / EAN</TableHead>
                  <TableHead className="text-muted-foreground">Kategoria</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Cena
                  </TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Zmiana
                  </TableHead>
                  <TableHead className="text-muted-foreground text-center">
                    Konkurenci
                  </TableHead>
                  <TableHead className="text-muted-foreground w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <div className="h-10 w-10 rounded-lg bg-muted" />
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">{product.sku}</p>
                        <p className="text-xs text-muted-foreground">
                          EAN: {product.ean}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">
                          {product.currentPrice.toLocaleString("pl-PL")} zł
                        </p>
                        <p className="text-xs text-muted-foreground line-through">
                          {product.previousPrice.toLocaleString("pl-PL")} zł
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
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
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-foreground">{product.competitors}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.id}`}>
                              Szczegóły
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/price-history?product=${product.id}`}>
                              Historia cen
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Otwórz w sklepie
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            Wyświetlono {filteredProducts.length} z {products.length} produktów
          </p>
        </div>
      </div>
    </DashboardShell>
  )
}
