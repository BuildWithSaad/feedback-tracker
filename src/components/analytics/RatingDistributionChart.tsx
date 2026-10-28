import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts'
import type { RatingDistribution } from '../../types'
import { Card } from '../common/Card'

export interface RatingDistributionChartProps {
  distribution: RatingDistribution
  totalResponses: number
}

const CustomDistributionTooltip = ({ active, payload, totalResponses }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const pct = totalResponses > 0 ? ((data.count / totalResponses) * 100).toFixed(0) : '0'
    return (
      <div className="bg-[#111111] text-white p-3 rounded-xl shadow-lg border border-gray-800 text-xs space-y-1">
        <p className="font-semibold text-white">{data.rating}</p>
        <p className="text-[#20C4EE] font-mono font-bold text-sm">
          {data.count} {data.count === 1 ? 'response' : 'responses'}{' '}
          <span className="text-gray-400 font-normal">({pct}%)</span>
        </p>
      </div>
    )
  }
  return null
}

export const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({
  distribution,
  totalResponses,
}) => {
  const chartData = [
    { rating: '5 Stars (Excellent)', count: distribution[5] || 0, star: 5 },
    { rating: '4 Stars (Good)', count: distribution[4] || 0, star: 4 },
    { rating: '3 Stars (Average)', count: distribution[3] || 0, star: 3 },
    { rating: '2 Stars (Poor)', count: distribution[2] || 0, star: 2 },
    { rating: '1 Star (Very Poor)', count: distribution[1] || 0, star: 1 },
  ]

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="font-heading font-semibold text-base md:text-lg text-[#111111]">
            Overall Rating Distribution
          </h3>
          <p className="text-xs text-[#6B7280]">
            Spread of ratings across {totalResponses} total student responses
          </p>
        </div>
        <span className="text-xs text-[#6B7280] font-mono">
          Total: <strong className="text-[#111111]">{totalResponses}</strong>
        </span>
      </div>

      <div className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis
              dataKey="rating"
              stroke="#6B7280"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => val.split(' ')[0] + ' ★'}
            />
            <YAxis
              allowDecimals={false}
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={(props) => <CustomDistributionTooltip {...props} totalResponses={totalResponses} />} cursor={{ fill: '#EAF9FE', opacity: 0.5 }} />
            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
              barSize={32}
              animationDuration={800}
            >
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.star}`}
                  fill={entry.star >= 4 ? '#20C4EE' : entry.star === 3 ? '#94A3B8' : '#F87171'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution percentage bars */}
      <div className="space-y-1.5 pt-2 border-t border-[#E5E7EB]">
        {chartData.map((item) => {
          const pct = totalResponses > 0 ? (item.count / totalResponses) * 100 : 0
          return (
            <div key={item.rating} className="flex items-center gap-3 text-xs">
              <span className="w-20 font-medium text-[#4B5563] shrink-0 truncate">
                {item.star} Star
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.star >= 4 ? 'bg-[#20C4EE]' : item.star === 3 ? 'bg-gray-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-12 text-right font-mono text-gray-500 shrink-0">
                {item.count} ({pct.toFixed(0)}%)
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
