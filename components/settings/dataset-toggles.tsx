"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const datasets = [
  { id: "paysim", name: "PaySim", enabled: true },
  { id: "ieee", name: "IEEE-CIS", enabled: true },
  { id: "elliptic", name: "Elliptic", enabled: true },
]

export function DatasetToggles() {
  const [toggles, setToggles] = useState(datasets)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Datasets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {toggles.map((dataset) => (
            <div key={dataset.id} className="flex items-center justify-between py-2">
              <p className="font-medium text-foreground">{dataset.name}</p>
              <Switch
                checked={dataset.enabled}
                onCheckedChange={(checked) => {
                  setToggles(toggles.map((t) => (t.id === dataset.id ? { ...t, enabled: checked } : t)))
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
