"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getSocAlerts, type SOCAlert } from "@/lib/api"

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "allow":
      return <Badge className="bg-chart-4 text-foreground">Allow</Badge>
    case "manual_review":
      return <Badge className="bg-chart-5 text-foreground">Review</Badge>
    case "auto_block":
      return <Badge variant="destructive">Block</Badge>
    default:
      return <Badge variant="secondary">{risk}</Badge>
  }
}

export function TransactionsTable() {
  const [data, setData] = useState<SOCAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)

    getSocAlerts()
      .then((resData) => {
        setData(resData)
      })
      .catch((err) => {
        console.error("Fetch failed:", err)
        setData([])
      })
      .finally(() => setLoading(false))
  }, [page])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-[500px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Dataset</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Fraud Type</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.entity_id}</TableCell>
                    <TableCell>{tx.dataset}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{tx.amount?.toLocaleString() ?? "—"}
                    </TableCell>
                    <TableCell>{getRiskBadge(tx.risk)}</TableCell>
                    <TableCell>{tx.fraud_type || "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination UI (frontend-only for now) */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing page {page}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
