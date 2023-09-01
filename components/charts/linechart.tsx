"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Card } from "@/components/ui/card"
import { ActivityByDate } from "@/types"
import { formatDate } from "@/lib/utils"

interface LineChartProps {
  data: ActivityByDate[]
}

export function LineChartComponent({ data }: LineChartProps) {
  return (
    <Card className="p-2">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDate}
          />
          <YAxis
            dataKey="count"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(count, name, entry) => [`Logs: ${entry.payload.count}`]}
            labelStyle={{ color: "#000" }}
            labelFormatter={formatDate}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#DC2626"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
