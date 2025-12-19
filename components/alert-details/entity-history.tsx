"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getSocAlertDetail } from "@/lib/api"

interface HistoryItem {
  id: number;
  amount: number;
  risk: string;
  fraud_type: string;
  timestamp: string;
}

export function EntityHistory({ alertId }: { alertId: number }) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSocAlertDetail(alertId)
      .then((data) => {
        setHistory(data.history || [])
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entity Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-muted-foreground">No previous transactions found</p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">${item.amount.toLocaleString()}</p>
                    <Badge variant="secondary">{item.fraud_type || "Normal"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
