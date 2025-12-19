"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw } from "lucide-react"
import Link from "next/link"
import { getSocAlerts, type SOCAlert } from "@/lib/api"

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "manual_review":
      return <Badge className="bg-chart-5 text-foreground">Review</Badge>
    case "auto_block":
      return <Badge variant="destructive">Block</Badge>
    default:
      return <Badge variant="secondary">{risk}</Badge>
  }
}

export function SOCAlertsList() {
  const [data, setData] = useState<SOCAlert[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAlerts = () => {
    setLoading(true)
    getSocAlerts()
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Active Alerts</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchAlerts}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Fraud Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No active alerts
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((alert) => (
                    <TableRow key={alert.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{alert.id}</TableCell>
                      <TableCell className="font-mono text-sm">{alert.entity_id}</TableCell>
                      <TableCell className="text-right font-medium">${alert.amount.toLocaleString()}</TableCell>
                      <TableCell>{alert.fraud_type}</TableCell>
                      <TableCell>{getRiskBadge(alert.risk)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Link href={`/soc-alerts/${alert.id}`}>
                          <Button variant="outline" size="sm">
                            Investigate
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
