import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const thresholds = [
  {
    name: "Auto-Block Threshold",
    value: "0.85",
    description: "Transactions above this risk score are automatically blocked",
  },
  {
    name: "Manual Review Threshold",
    value: "0.60",
    description: "Transactions above this score require manual review",
  },
  { name: "Low Risk Threshold", value: "0.30", description: "Transactions below this score are auto-approved" },
]

export function ThresholdSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Thresholds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {thresholds.map((threshold) => (
            <div
              key={threshold.name}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="font-medium text-foreground">{threshold.name}</p>
                <p className="text-sm text-muted-foreground">{threshold.description}</p>
              </div>
              <div className="text-2xl font-semibold text-foreground">{threshold.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
