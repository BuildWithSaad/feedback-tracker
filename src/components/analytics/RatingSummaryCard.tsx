import React from 'react'
import { Card } from '../common/Card'
import { Star } from 'lucide-react'

export interface RatingSummaryCardProps {
  label: string
  value: string | number
  subtext: string
  icon?: React.ReactNode
  isRating?: boolean
  highlight?: boolean
}

export const RatingSummaryCard: React.FC<RatingSummaryCardProps> = ({
  label,
  value,
  subtext,
  icon,
  isRating = true,
  highlight = false,
}) => {
  return (
    <Card
      className={`relative overflow-hidden transition-all ${
        highlight
          ? 'border-[#20C4EE]/50 bg-linear-to-br from-[#EAF9FE]/60 to-white shadow-xs'
          : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
          {label}
        </span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-heading text-3xl md:text-4xl font-bold text-[#111111]">
          {value}
        </span>
        {isRating && typeof value === 'number' && value > 0 && (
          <span className="text-sm font-medium text-[#6B7280]">/ 5.0</span>
        )}
      </div>

      {isRating && typeof value === 'number' && value > 0 && (
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                star <= Math.round(value)
                  ? 'text-[#20C4EE] fill-[#20C4EE]'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <p className="text-xs text-[#6B7280] leading-relaxed">{subtext}</p>
    </Card>
  )
}
