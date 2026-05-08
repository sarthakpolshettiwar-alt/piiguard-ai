import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { ChartDataPoint } from '@/types'

interface LineChartWidgetProps {
  data: ChartDataPoint[]
  lines: { key: string; color: string; dashed?: boolean }[]
  height?: number
}

export function LineChartWidget({
  data,
  lines,
  height = 300,
}: LineChartWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '12px',
            color: '#e2e8f0',
            fontSize: '13px',
          }}
        />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            strokeDasharray={line.dashed ? '5 5' : undefined}
            dot={false}
            activeDot={{ r: 4, fill: line.color, stroke: '#0f172a', strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
