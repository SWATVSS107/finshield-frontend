import { ThresholdSettings } from "@/components/settings/threshold-settings"
import { DatasetToggles } from "@/components/settings/dataset-toggles"
import { ModelStatus } from "@/components/settings/model-status"
import { EnvironmentInfo } from "@/components/settings/environment-info"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Platform configuration and operational controls</p>
      </div>

      <ThresholdSettings />

      <DatasetToggles />

      <ModelStatus />

      <EnvironmentInfo />
    </div>
  )
}
