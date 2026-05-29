import { DashboardShell } from "@/components/dashboard/shell"
import { StatCard } from "@/components/dashboard/stat-card"
import { PriceTrendChart } from "@/components/dashboard/price-trend-chart"
import { CompetitorComparisonChart } from "@/components/dashboard/competitor-chart"
import { TopDeals } from "@/components/dashboard/top-deals"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { Package, TrendingDown, Users, Flame } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Przegląd cen i okazji na rynku polskim
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Śledzonych produktów"
            value="1,248"
            change={12}
            changeLabel="od zeszłego miesiąca"
            icon={<Package className="h-5 w-5" />}
          />
          <StatCard
            title="Średnia zmiana ceny"
            value="-4.2%"
            change={-4.2}
            changeLabel="trend spadkowy"
            icon={<TrendingDown className="h-5 w-5" />}
          />
          <StatCard
            title="Monitorowani konkurenci"
            value="28"
            change={3}
            changeLabel="nowych sklepów"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Aktywne okazje"
            value="156"
            change={24}
            changeLabel="od wczoraj"
            icon={<Flame className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <PriceTrendChart />
          <CompetitorComparisonChart />
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopDeals />
          </div>
          <RecentAlerts />
        </div>
      </div>
    </DashboardShell>
  )
}
