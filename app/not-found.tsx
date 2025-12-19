import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center space-y-4">
      <h1 className="text-3xl font-semibold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">
        The page you’re looking for doesn’t exist (or the URL is invalid).
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
        <Link href="/soc-alerts">
          <Button variant="outline">View SOC Alerts</Button>
        </Link>
      </div>
    </div>
  )
}


