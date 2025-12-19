"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { takeAlertAction } from "@/lib/api"

export function InvestigatorActions({ alertId }: { alertId: number }) {
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleAction = async (action: "approve" | "block" | "escalate") => {
    setLoading(true)

    try {
      const result = await takeAlertAction(alertId, action, comment || undefined)
      setSubmitted(true)
      toast({
        title: "Action Submitted",
        description: result.message || `Alert has been ${action}d successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit action. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="border-chart-4/20 bg-chart-4/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-foreground">
            <CheckCircle className="h-6 w-6 text-chart-4" />
            <div>
              <p className="font-medium">Action Submitted</p>
              <p className="text-sm text-muted-foreground">Your investigation action has been recorded</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investigator Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Add investigation notes (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleAction("approve")}
            disabled={loading}
            className="bg-chart-4 hover:bg-chart-4/90 text-foreground"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Transaction
          </Button>

          <Button onClick={() => handleAction("block")} disabled={loading} variant="destructive">
            <XCircle className="h-4 w-4 mr-2" />
            Block Transaction
          </Button>

          <Button onClick={() => handleAction("escalate")} disabled={loading} variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Escalate to Senior Analyst
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
