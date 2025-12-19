"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const heatmapData = [
  { dataset: "PaySim", high: 1234, medium: 2345, low: 890 },
  { dataset: "IEEE-CIS", high: 2100, medium: 1890, low: 450 },
  { dataset: "Elliptic", high: 567, medium: 1200, low: 234 },
]

export function DatasetHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset-wise Fraud Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {heatmapData.map((item) => (
            <div key={item.dataset} className="space-y-2">
              <p className="font-medium text-foreground">{item.dataset}</p>
              <div className="flex gap-2">
                <div className="flex-1 h-12 bg-chart-1 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{item.high}</span>
                </div>
                <div className="flex-1 h-12 bg-chart-5 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground">{item.medium}</span>
                </div>
                <div className="flex-1 h-12 bg-chart-4 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground">{item.low}</span>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="flex-1 text-center">High Risk</span>
                <span className="flex-1 text-center">Medium Risk</span>
                <span className="flex-1 text-center">Low Risk</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
