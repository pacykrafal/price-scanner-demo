"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardShell } from "@/components/dashboard/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  TrendingDown,
  Flame,
  Clock,
  ExternalLink,
  Bell,
  Star,
} from "lucide-react"
import { categories } from "@/lib/data"

const deals = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra 256GB",
    category: "Smartfony",
    currentPrice: 4999,
    originalPrice: 6499,
    lowestEver: 4799,
    discount: 23,
    store: "Media Expert",
    storeUrl: "#",
    expiresIn: "2 dni",
    isHot: true,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Sony WH-1000XM5 Słuchawki bezprzewodowe",
    category: "Audio",
    currentPrice: 1199,
    originalPrice: 1799,
    lowestEver: 1149,
    discount: 33,
    store: "RTV Euro AGD",
    storeUrl: "#",
    expiresIn: "5 godz.",
    isHot: true,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "MacBook Air M3 13\" 256GB",
    category: "Laptopy",
    currentPrice: 5499,
    originalPrice: 6299,
    lowestEver: 5299,
    discount: 13,
    store: "x-kom",
    storeUrl: "#",
    expiresIn: "3 dni",
    isHot: false,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "PlayStation 5 Slim + 2 kontrolery",
    category: "Gaming",
    currentPrice: 2199,
    originalPrice: 2699,
    lowestEver: 2099,
    discount: 19,
    store: "Allegro",
    storeUrl: "#",
    expiresIn: "1 dzień",
    isHot: true,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "LG OLED C3 55\" 4K TV",
    category: "Telewizory",
    currentPrice: 4599,
    originalPrice: 6499,
    lowestEver: 4499,
    discount: 29,
    store: "Media Expert",
    storeUrl: "#",
    expiresIn: "4 dni",
    isHot: true,
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Dyson V15 Detect Absolute",
    category: "AGD",
    currentPrice: 2799,
    originalPrice: 3499,
    lowestEver: 2699,
    discount: 20,
    store: "Morele.net",
    storeUrl: "#",
    expiresIn: "2 dni",
    isHot: false,
    image: "/placeholder.svg",
  },
  {
    id: "7",
    name: "Apple iPhone 15 128GB",
    category: "Smartfony",
    currentPrice: 3699,
    originalPrice: 4299,
    lowestEver: 3599,
    discount: 14,
    store: "x-kom",
    storeUrl: "#",
    expiresIn: "6 dni",
    isHot: false,
    image: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Nintendo Switch OLED + Mario Kart 8",
    category: "Gaming",
    currentPrice: 1649,
    originalPrice: 1999,
    lowestEver: 1599,
    discount: 18,
    store: "RTV Euro AGD",
    storeUrl: "#",
    expiresIn: "12 godz.",
    isHot: true,
    image: "/placeholder.svg",
  },
]

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie")
  const [sortBy, setSortBy] = useState("discount")
  const [showHotOnly, setShowHotOnly] = useState(false)

  const filteredDeals = deals
    .filter((deal) => {
      const matchesSearch = deal.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "Wszystkie" || deal.category === selectedCategory
      const matchesHot = !showHotOnly || deal.isHot
      return matchesSearch && matchesCategory && matchesHot
    })
    .sort((a, b) => {
      if (sortBy === "discount") return b.discount - a.discount
      if (sortBy === "price") return a.currentPrice - b.currentPrice
      if (sortBy === "expiring") {
        const aHours = a.expiresIn.includes("godz.")
          ? parseInt(a.expiresIn)
          : parseInt(a.expiresIn) * 24
        const bHours = b.expiresIn.includes("godz.")
          ? parseInt(b.expiresIn)
          : parseInt(b.expiresIn) * 24
        return aHours - bHours
      }
      return 0
    })

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Okazje</h1>
            <p className="text-muted-foreground">
              Najlepsze promocje i okazje cenowe
            </p>
          </div>
          <Button
            variant={showHotOnly ? "default" : "outline"}
            onClick={() => setShowHotOnly(!showHotOnly)}
            className={showHotOnly ? "bg-primary text-primary-foreground" : ""}
          >
            <Flame className="mr-2 h-4 w-4" />
            Tylko gorące okazje
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <TrendingDown className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aktywne okazje</p>
                  <p className="text-2xl font-bold text-foreground">{deals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gorące okazje</p>
                  <p className="text-2xl font-bold text-foreground">
                    {deals.filter((d) => d.isHot).length}
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
                  <p className="text-sm text-muted-foreground">Średni rabat</p>
                  <p className="text-2xl font-bold text-foreground">
                    -{Math.round(deals.reduce((acc, d) => acc + d.discount, 0) / deals.length)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-destructive/10 p-2">
                  <Clock className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wygasa dzisiaj</p>
                  <p className="text-2xl font-bold text-foreground">
                    {deals.filter((d) => d.expiresIn.includes("godz.")).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Szukaj okazji..."
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
                  <SelectTrigger className="w-[160px] bg-background border-border">
                    <SelectValue placeholder="Sortuj" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Największy rabat</SelectItem>
                    <SelectItem value="price">Najniższa cena</SelectItem>
                    <SelectItem value="expiring">Wygasające</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deals Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDeals.map((deal) => (
            <Card
              key={deal.id}
              className="bg-card border-border overflow-hidden group"
            >
              <div className="relative">
                <div className="h-40 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    Obraz produktu
                  </span>
                </div>
                {deal.isHot && (
                  <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                    <Flame className="mr-1 h-3 w-3" />
                    Gorąca okazja
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                >
                  -{deal.discount}%
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {deal.category}
                    </Badge>
                    <h3 className="font-medium text-foreground line-clamp-2 leading-tight">
                      {deal.name}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {deal.currentPrice.toLocaleString("pl-PL")} zł
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        {deal.originalPrice.toLocaleString("pl-PL")} zł
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Oszczędzasz</p>
                      <p className="font-semibold text-primary">
                        {(deal.originalPrice - deal.currentPrice).toLocaleString(
                          "pl-PL"
                        )}{" "}
                        zł
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{deal.store}</span>
                    <div className="flex items-center gap-1 text-destructive">
                      <Clock className="h-3 w-3" />
                      <span>{deal.expiresIn}</span>
                    </div>
                  </div>

                  {deal.currentPrice <= deal.lowestEver && (
                    <Badge className="w-full justify-center bg-primary/10 text-primary hover:bg-primary/20">
                      <TrendingDown className="mr-1 h-3 w-3" />
                      Najniższa cena w historii!
                    </Badge>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bell className="mr-1 h-3 w-3" />
                      Alert
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="mr-1 h-3 w-3" />
                      Zapisz
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-primary-foreground"
                      asChild
                    >
                      <Link href={deal.storeUrl} target="_blank">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Kup
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <TrendingDown className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground">
                Brak okazji do wyświetlenia
              </h3>
              <p className="text-muted-foreground text-center mt-1">
                Spróbuj zmienić filtry lub sprawdź ponownie później
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}
