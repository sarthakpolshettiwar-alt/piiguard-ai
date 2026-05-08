import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { ChartDataPoint } from '@/types'

interface AreaChartWidgetProps {
  data: ChartDataPoint[]
  dataKey?: string
  secondaryKey?: string
  color?: string
  secondaryColor?: string
  height?: number
  gradient?: boolean
}

export function AreaChartWidget({
  data,
  dataKey = 'value',
  secondaryKey,
  color = '#06b6d4',
  secondaryColor = '#8b5cf6',
  height = 300,
  gradient = true,
}: AreaChartWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          {secondaryKey && (
            <linearGradient id={`gradient-${secondaryKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={secondaryColor} stopOpacity={0} />
            </linearGradient>
          )}
        </defs>
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
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={gradient ? `url(#gradient-${dataKey})` : color}
          fillOpacity={gradient ? 1 : 0.1}
        />
        {secondaryKey && (
          <Area
            type="monotone"
            dataKey={secondaryKey}
            stroke={secondaryColor}
            strokeWidth={2}
            fill={gradient ? `url(#gradient-${secondaryKey})` : secondaryColor}
            fillOpacity={gradient ? 1 : 0.1}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}
