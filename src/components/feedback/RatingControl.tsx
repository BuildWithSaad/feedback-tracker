import React from 'react'
import { Check } from 'lucide-react'

export interface RatingOption {
  value: number
  label: string
}

const RATING_SCALE: RatingOption[] = [
  { value: 1, label: 'Very poor' },
  { value: 2, label: 'Poor' },
  { value: 3, label: 'Average' },
  { value: 4, label: 'Good' },
  { value: 5, label: 'Excellent' },
]

export interface RatingControlProps {
  id: string
  label: string
  description?: string
  value?: number
  onChange: (value: number) => void
  error?: string
  required?: boolean
}

export const RatingControl: React.FC<RatingControlProps> = ({
  id,
  label,
  description,
  value,
  onChange,
  error,
  required = true,
}) => {
  const selectedOption = RATING_SCALE.find((opt) => opt.value === value)

  return (
    <div className="space-y-3 p-4 md:p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <label
          id={`${id}-label`}
          className="font-heading font-semibold text-sm md:text-base text-[#111111] flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && (
            <span className="text-[#DC2626] font-bold text-xs" title="Required question">
              *
            </span>
          )}
        </label>

        {/* Selected scale readout */}
        {selectedOption ? (
          <span className="text-xs font-semibold text-[#0A6C84] bg-[#EAF9FE] px-2.5 py-0.5 rounded-full border border-[#20C4EE]/30 w-fit">
            Rating: {selectedOption.value} — {selectedOption.label}
          </span>
        ) : (
          <span className="text-xs text-[#6B7280]">Select a rating (1 to 5)</span>
        )}
      </div>

      {description && (
        <p className="text-xs text-[#6B7280] leading-relaxed">{description}</p>
      )}

      {/* 5-point rating buttons */}
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-required={required}
        aria-invalid={!!error}
        className="grid grid-cols-5 gap-2 sm:gap-3 pt-1"
      >
        {RATING_SCALE.map((opt) => {
          const isSelected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl border transition-all duration-150 cursor-pointer focus-ring select-none text-center ${
                isSelected
                  ? 'bg-[#20C4EE] text-[#111111] font-bold border-[#0fb2dc] shadow-sm scale-[1.02]'
                  : 'bg-gray-50/70 hover:bg-[#EAF9FE]/50 text-[#333333] border-[#E5E7EB] hover:border-[#20C4EE]/40'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className="text-base sm:text-lg">{opt.value}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] text-[#111111]" />}
              </div>
              <span
                className={`text-[10px] sm:text-xs mt-1 truncate max-w-full font-medium ${
                  isSelected ? 'text-[#111111]' : 'text-[#6B7280]'
                }`}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1 pt-1" role="alert">
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
