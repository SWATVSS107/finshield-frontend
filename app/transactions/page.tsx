import { TransactionsTable } from "@/components/transactions/transactions-table"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Transactions</h1>
        <p className="text-muted-foreground mt-1">Complete transaction audit log</p>
      </div>

      <TransactionsTable />
    </div>
  )
}
