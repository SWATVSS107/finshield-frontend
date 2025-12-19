import { FraudByTypeTable } from "@/components/risk-intelligence/fraud-by-type-table"
import { FraudByAmountChart } from "@/components/risk-intelligence/fraud-by-amount-chart"
import { DatasetHeatmap } from "@/components/risk-intelligence/dataset-heatmap"
import { RiskFilters } from "@/components/risk-intelligence/risk-filters"

export default function RiskIntelligencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Risk Intelligence</h1>
        <p className="text-muted-foreground mt-1">Pattern analysis and fraud insights</p>
      </div>

      <RiskFilters />

      <div className="grid gap-6 lg:grid-cols-2">
        <FraudByTypeTable />
        <FraudByAmountChart />
      </div>

      <DatasetHeatmap />
    </div>
  )
}
