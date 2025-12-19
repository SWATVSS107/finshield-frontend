"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Lightbulb } from "lucide-react"
import { investigateAlert } from "@/lib/api"

export function AIExplanation({ alertId }: { alertId: number }) {
  const [explanation, setExplanation] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    investigateAlert(alertId)
      .then((data) => {
        setExplanation(data.explanation)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [alertId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-chart-1/20 bg-chart-1/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-chart-1" />
          <CardTitle>AI Fraud Explanation</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{explanation || "No explanation available for this alert."}</p>
      </CardContent>
    </Card>
  )
}
