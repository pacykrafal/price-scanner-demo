import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingDown, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    currentPrice: 4999,
    originalPrice: 6499,
    discount: 23,
    store: "Media Expert",
    category: "Smartfony",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    currentPrice: 1199,
    originalPrice: 1799,
    discount: 33,
    store: "RTV Euro AGD",
    category: "Audio",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    currentPrice: 5499,
    originalPrice: 6299,
    discount: 13,
    store: "x-kom",
    category: "Laptopy",
  },
  {
    id: 4,
    name: "PlayStation 5 Slim",
    currentPrice: 2199,
    originalPrice: 2699,
    discount: 19,
    store: "Allegro",
    category: "Gaming",
  },
]

export function TopDeals() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-foreground">
            Najlepsze okazje
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/deals" className="text-primary hover:text-primary/80">
            Zobacz wszystkie
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deals.map((deal) => (
            <Link
              key={deal.id}
              href={`/products/${deal.id}`}
              className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{deal.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {deal.category}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{deal.store}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {deal.currentPrice} zł
                    </span>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      <TrendingDown className="mr-1 h-3 w-3" />-{deal.discount}%
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground line-through">
                    {deal.originalPrice} zł
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
