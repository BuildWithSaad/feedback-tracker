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
import type { CategoryRatings } from '../../types'
import { Card } from '../common/Card'

export interface CategoryRatingsChartProps {
  ratings: CategoryRatings
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-[#111111] text-white p-3 rounded-xl shadow-lg border border-gray-800 text-xs space-y-1">
        <p className="font-semibold text-white">{data.category}</p>
        <p className="text-[#20C4EE] font-mono font-bold text-sm">
          {data.score.toFixed(1)} <span className="text-gray-400 font-normal">/ 5.0</span>
        </p>
      </div>
    )
  }
  return null
}

export const CategoryRatingsChart: React.FC<CategoryRatingsChartProps> = ({ ratings }) => {
  const chartData = [
    { category: 'Teaching Quality', score: ratings.teachingQuality },
    { category: 'Concept Clarity', score: ratings.conceptClarity },
    { category: 'Assignment Quality', score: ratings.assignmentQuality },
    { category: 'Practical Sessions', score: ratings.practicalSessions },
    { category: 'Overall Satisfaction', score: ratings.overallSatisfaction },
  ]

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <div>
          <h3 className="font-heading font-semibold text-base md:text-lg text-[#111111]">
            Category Ratings Breakdown
          </h3>
          <p className="text-xs text-[#6B7280]">
            Average rating across core academic aspects (0 to 5.0 scale)
          </p>
        </div>
        <span className="text-[11px] font-mono bg-[#EAF9FE] text-[#0A6C84] px-2.5 py-1 rounded-full border border-[#20C4EE]/30 self-start sm:self-auto">
          Sample Aggregate
        </span>
      </div>

      <div className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
            <XAxis
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              width={140}
              stroke="#4B5563"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EAF9FE', opacity: 0.5 }} />
            <Bar
              dataKey="score"
              radius={[0, 8, 8, 0]}
              barSize={20}
              animationDuration={800}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#20C4EE" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Numerical row legend for quick reading on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-[#E5E7EB] text-center">
        {chartData.map((item) => (
          <div key={item.category} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
            <div className="text-[10px] text-[#6B7280] truncate">{item.category}</div>
            <div className="font-heading font-bold text-sm text-[#111111]">{item.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}
