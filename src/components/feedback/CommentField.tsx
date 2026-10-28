import React from 'react'

export interface CommentFieldProps {
  id: string
  value: string
  onChange: (value: string) => void
  error?: string
  maxLength?: number
}

export const CommentField: React.FC<CommentFieldProps> = ({
  id,
  value,
  onChange,
  error,
  maxLength = 500,
}) => {
  const currentLength = value?.length || 0
  const isNearLimit = currentLength >= maxLength - 40
  const isOverLimit = currentLength > maxLength

  return (
    <div className="space-y-2 p-4 md:p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-gray-300 transition-colors">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-heading font-semibold text-sm md:text-base text-[#111111]"
        >
          Anything else you'd like to share?
          <span className="text-xs font-normal text-[#6B7280] ml-2">(Optional)</span>
        </label>
        <div
          className={`text-xs font-mono font-medium ${
            isOverLimit
              ? 'text-[#DC2626]'
              : isNearLimit
              ? 'text-[#B45309]'
              : 'text-[#6B7280]'
          }`}
          aria-live="polite"
        >
          {currentLength} / {maxLength}
        </div>
      </div>

      <p className="text-xs text-[#6B7280] leading-relaxed">
        Comments are optional. Avoid including names, grades, or other identifying information to preserve privacy.
      </p>

      <div className="pt-1">
        <textarea
          id={id}
          rows={4}
          value={value}
          maxLength={maxLength + 10}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Share suggestions or describe what worked well..."
          className="w-full p-3.5 bg-gray-50/70 border border-[#E5E7EB] rounded-xl text-sm text-[#111111] placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#20C4EE] focus:ring-2 focus:ring-[#20C4EE]/20 transition-all resize-y min-h-[110px]"
          aria-invalid={!!error}
          aria-describedby={`${id}-hint`}
        />
      </div>

      {error && (
        <p className="text-xs font-medium text-[#DC2626] flex items-center gap-1" role="alert">
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
