import React from 'react'
import { ShieldCheck, Info } from 'lucide-react'

export interface PrivacyNoticeProps {
  variant?: 'inline' | 'banner' | 'card'
  className?: string
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
  variant = 'card',
  className = '',
}) => {
  if (variant === 'inline') {
    return (
      <div className={`flex items-start gap-2.5 text-xs text-[#6B7280] ${className}`}>
        <ShieldCheck className="w-4 h-4 text-[#20C4EE] shrink-0 mt-0.5" />
        <p>
          Responses contribute to anonymised aggregate summaries. Individual responses are not publicly displayed.
        </p>
      </div>
    )
  }

  return (
    <div
      className={`rounded-2xl bg-[#EAF9FE]/70 border border-[#20C4EE]/25 p-4 md:p-5 flex items-start gap-3.5 ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#20C4EE] shadow-xs shrink-0 mt-0.5">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div className="text-xs md:text-sm text-[#333333] space-y-1">
        <h4 className="font-semibold text-[#111111] flex items-center gap-1.5">
          Student Privacy & Anonymity
          <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#20C4EE]/20 text-[#096B83]">
            Privacy Shield
          </span>
        </h4>
        <p className="text-[#4B5563] leading-relaxed">
          Your feedback is aggregated with other students. Individual ratings and comments are never attached to your identity, and summaries are only shown when at least 10 responses exist.
        </p>
        <div className="pt-1 text-[11px] text-[#6B7280] flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Demonstration prototype — privacy enforcement rules simulate production thresholding.</span>
        </div>
      </div>
    </div>
  )
}
