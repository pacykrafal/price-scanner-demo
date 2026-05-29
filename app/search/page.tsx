"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  TrendingDown,
  TrendingUp,
  Barcode,
  Hash,
  Package,
  Clock,
  X,
} from "lucide-react"
import { products } from "@/lib/data"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState<"all" | "name" | "sku" | "ean">("all")
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Samsung Galaxy",
    "8806095369181",
    "APL-IP15PM",
    "Sony słuchawki",
  ])

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery)
    }
  }, [initialQuery])

  const searchResults = products.filter((product) => {
    const query = searchQuery.toLowerCase()
    if (!query) return false

    switch (searchType) {
      case "name":
        return product.name.toLowerCase().includes(query)
      case "sku":
        return product.sku.toLowerCase().includes(query)
      case "ean":
        return product.ean.includes(query)
      default:
        return (
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.ean.includes(query)
        )
    }
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter((s) => s !== search))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Wyszukiwarka</h1>
        <p className="text-muted-foreground">
          Szukaj produktów po nazwie, kodzie SKU lub numerze EAN
        </p>
      </div>

      {/* Search Box */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSearch}>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Wpisz nazwę produktu, kod SKU lub numer EAN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-lg bg-background border-border"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Tabs value={searchType} onValueChange={(v) => setSearchType(v as "all" | "name" | "sku" | "ean")}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="all" className="gap-2">
                    <Search className="h-4 w-4" />
                    Wszystko
                  </TabsTrigger>
                  <TabsTrigger value="name" className="gap-2">
                    <Package className="h-4 w-4" />
                    Nazwa
                  </TabsTrigger>
                  <TabsTrigger value="sku" className="gap-2">
                    <Hash className="h-4 w-4" />
                    SKU
                  </TabsTrigger>
                  <TabsTrigger value="ean" className="gap-2">
                    <Barcode className="h-4 w-4" />
                    EAN
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      {!searchQuery && recentSearches.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Ostatnie wyszukiwania
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <Badge
                  key={search}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm cursor-pointer hover:bg-muted/80 group"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeRecentSearch(search)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchQuery && (
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">
                Wyniki wyszukiwania
              </CardTitle>
              <Badge variant="outline">
                {searchResults.length}{" "}
                {searchResults.length === 1
                  ? "produkt"
                  : searchResults.length < 5
                  ? "produkty"
                  : "produktów"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {searchResults.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Produkt</TableHead>
                    <TableHead className="text-muted-foreground">SKU</TableHead>
                    <TableHead className="text-muted-foreground">EAN</TableHead>
                    <TableHead className="text-muted-foreground">Kategoria</TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Cena
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Zmiana
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((product) => (
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
                        <code className="rounded bg-muted px-2 py-1 text-sm text-foreground">
                          {product.sku}
                        </code>
                      </TableCell>
                      <TableCell>
                        <code className="rounded bg-muted px-2 py-1 text-sm text-foreground">
                          {product.ean}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-foreground">
                          {product.currentPrice.toLocaleString("pl-PL")} zł
                        </span>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  Brak wyników
                </h3>
                <p className="text-muted-foreground text-center mt-1 max-w-md">
                  Nie znaleziono produktów pasujących do &quot;{searchQuery}&quot;.
                  Spróbuj zmienić zapytanie lub typ wyszukiwania.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Tips */}
      {!searchQuery && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Wskazówki wyszukiwania
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-foreground">Nazwa produktu</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wpisz pełną lub częściową nazwę produktu, np. &quot;Samsung Galaxy&quot;
                  lub &quot;iPhone 15&quot;
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-foreground">Kod SKU</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Użyj kodu SKU produktu do precyzyjnego wyszukiwania, np.
                  &quot;SAM-S24U-256&quot;
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Barcode className="h-5 w-5 text-primary" />
                  <h4 className="font-medium text-foreground">Numer EAN</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Zeskanuj lub wpisz 13-cyfrowy kod EAN produktu, np.
                  &quot;8806095369181&quot;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="text-muted-foreground">Ładowanie...</div>}>
        <SearchContent />
      </Suspense>
    </DashboardShell>
  )
}
