import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { ChartDataPoint } from '@/types'

interface BarChartWidgetProps {
  data: ChartDataPoint[]
  dataKey?: string
  color?: string
  height?: number
  barRadius?: number
}

export function BarChartWidget({
  data,
  dataKey = 'value',
  color = '#06b6d4',
  height = 300,
  barRadius = 6,
}: BarChartWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[barRadius, barRadius, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
