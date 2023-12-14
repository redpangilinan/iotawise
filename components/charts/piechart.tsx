"use client"

import { ActivityEntry } from "@/types"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card } from "@/components/ui/card"

interface PieChartProps {
  data: ActivityEntry[]
}

export function PieChartComponent({ data }: PieChartProps) {
  return (
    <Card className="grid grid-cols-1 p-2 md:grid-cols-2">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            stroke="black"
            strokeWidth={1}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(count, name, entry) => [
              entry.payload.count,
              entry.payload.name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center">
        <div className="p-4">
          {data.map((entry, index) => (
            <div
              key={`label-${index}`}
              className="mb-2 flex items-center text-sm"
            >
              <span
                className="mr-2 inline-block h-4 w-4 shadow-sm"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
