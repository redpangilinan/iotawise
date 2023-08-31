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
          />
          <YAxis
            dataKey="count"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            labelFormatter={(label) => `${label}`}
            formatter={(value, name, props) => [
              `Count: ${value}`,
              `${props.payload.date}`,
            ]}
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
