import { SOCAlertsList } from "@/components/soc-alerts/soc-alerts-list"

export default function SOCAlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">SOC Alerts</h1>
        <p className="text-muted-foreground mt-1">High-risk events requiring investigation</p>
      </div>

      <SOCAlertsList />
    </div>
  )
}
