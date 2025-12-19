"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EnvironmentInfo() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://finshield-backend-2.onrender.com"
  const environment = process.env.NODE_ENV === "production" ? "Production" : "Development"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Environment</p>
            <Badge variant="secondary" className="mt-1">
              {environment}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">API Endpoint</p>
            <p className="text-sm font-mono mt-1 break-all">{apiBaseUrl}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Platform Version</p>
            <p className="text-sm font-mono mt-1">v3.2.0</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="text-sm mt-1">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
