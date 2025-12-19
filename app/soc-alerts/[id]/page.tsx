import { AlertSummary } from "@/components/alert-details/alert-summary"
import { AIExplanation } from "@/components/alert-details/ai-explanation"
import { EntityHistory } from "@/components/alert-details/entity-history"
import { InvestigatorActions } from "@/components/alert-details/investigator-actions"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

type PageProps = {
  params: {
    id: string
  }
}

export default function AlertDetailsPage({ params }: PageProps) {
  const alertId = Number.parseInt(params.id, 10)
  // Invalid URL shape -> treat as a true 404 for this route segment.
  // This matches Next/Vercel's intended "not found" control flow.
  if (!Number.isFinite(alertId) || alertId <= 0) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/soc-alerts">
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Alerts
          </Button>
        </Link>
        <h1 className="text-3xl font-semibold text-foreground">Alert Investigation</h1>
        <p className="text-muted-foreground mt-1">Alert ID: {params.id}</p>
      </div>

      <AlertSummary alertId={alertId} />

      <AIExplanation alertId={alertId} />

      <EntityHistory alertId={alertId} />

      <InvestigatorActions alertId={alertId} />
    </div>
  )
}
