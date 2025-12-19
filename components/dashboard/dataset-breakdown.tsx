"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const datasets = [
  { name: "PaySim", transactions: "6.4M", fraud_rate: "0.13%", status: "active" },
  { name: "IEEE-CIS", transactions: "590K", fraud_rate: "3.5%", status: "active" },
  { name: "Elliptic", transactions: "203K", fraud_rate: "2.0%", status: "active" },
]

export function DatasetBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {datasets.map((dataset) => (
            <div
              key={dataset.name}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{dataset.name.substring(0, 2)}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{dataset.name}</p>
                  <p className="text-sm text-muted-foreground">{dataset.transactions} transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{dataset.fraud_rate}</p>
                  <p className="text-xs text-muted-foreground">Fraud Rate</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {dataset.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
