import { RiskSummaryCards } from "@/components/dashboard/risk-summary-cards"
import { FraudTrendChart } from "@/components/dashboard/fraud-trend-chart"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { DatasetBreakdown } from "@/components/dashboard/dataset-breakdown"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time fraud detection metrics and trends</p>
      </div>

      <RiskSummaryCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <FraudTrendChart />
        <RiskDistributionChart />
      </div>

      <DatasetBreakdown />
    </div>
  )
}
