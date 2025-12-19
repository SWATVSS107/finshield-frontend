"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RiskFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Datasets</SelectItem>
                <SelectItem value="paysim">PaySim</SelectItem>
                <SelectItem value="ieee">IEEE-CIS</SelectItem>
                <SelectItem value="elliptic">Elliptic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="allow">Allow</SelectItem>
                <SelectItem value="review">Manual Review</SelectItem>
                <SelectItem value="block">Auto Block</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
