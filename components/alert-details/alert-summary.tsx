"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getSocAlertDetail, type AlertDetail } from "@/lib/api"

export function AlertSummary({ alertId }: { alertId: number }) {
  const [data, setData] = useState<AlertDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSocAlertDetail(alertId)
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [alertId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Alert not found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <p className="font-mono text-sm font-medium mt-1">{data.transaction_id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dataset</p>
            <p className="font-medium mt-1">{data.dataset}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Risk Score</p>
            <p className="font-medium mt-1">{data.risk_score?.toFixed(2) || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Fraud Type</p>
            <Badge className="mt-1">{data.fraud_type}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="font-medium mt-1 text-lg">${data.amount?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Timestamp</p>
            <p className="text-sm mt-1">{new Date(data.timestamp).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
