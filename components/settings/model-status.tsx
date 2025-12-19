import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

const models = [
  { name: "Random Forest Classifier", status: "healthy", version: "v2.3.1" },
  { name: "XGBoost Ensemble", status: "healthy", version: "v1.8.0" },
  { name: "Neural Network Detector", status: "healthy", version: "v3.0.2" },
]

export function ModelStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ML Model Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {models.map((model) => (
            <div
              key={model.name}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-chart-4" />
                <div>
                  <p className="font-medium text-foreground">{model.name}</p>
                  <p className="text-sm text-muted-foreground">{model.version}</p>
                </div>
              </div>
              <Badge className="bg-chart-4 text-foreground capitalize">{model.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
