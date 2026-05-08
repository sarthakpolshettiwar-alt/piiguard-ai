import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import type { ChartDataPoint } from '@/types'

interface PieChartWidgetProps {
  data: ChartDataPoint[]
  colors?: string[]
  height?: number
  innerRadius?: number
  outerRadius?: number
  showLabels?: boolean
}

const DEFAULT_COLORS = ['#06b6d4', '#8b5cf6', '#ef4444', '#f97316', '#10b981', '#eab308']

export function PieChartWidget({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  showLabels = true,
}: PieChartWidgetProps) {
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width="60%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]!} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '12px',
              color: '#e2e8f0',
              fontSize: '13px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {showLabels && (
        <div className="flex flex-col gap-2.5 w-[40%]">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs text-slate-400 truncate">{item.name}</span>
              <span className="text-xs font-semibold text-slate-200 ml-auto">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
