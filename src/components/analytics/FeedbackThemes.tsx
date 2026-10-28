import React from 'react'
import { ThumbsUp, Lightbulb, Shield, Sparkles } from 'lucide-react'
import type { FeedbackThemes as FeedbackThemesType } from '../../types'
import { Card } from '../common/Card'

export interface FeedbackThemesProps {
  themes: FeedbackThemesType
}

export const FeedbackThemes: React.FC<FeedbackThemesProps> = ({ themes }) => {
  const hasStrengths = themes.strengths && themes.strengths.length > 0
  const hasImprovements = themes.improvements && themes.improvements.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-semibold text-lg md:text-xl text-[#111111] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#20C4EE]" />
            What Students Are Saying
          </h3>
          <p className="text-xs text-[#6B7280]">
            Recurring aggregate feedback themes synthesized across student evaluations
          </p>
        </div>

        {/* Disclaimer badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#0A6C84] bg-[#EAF9FE] px-3 py-1 rounded-full border border-[#20C4EE]/25 self-start sm:self-auto">
          <Shield className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Illustrative Themes • Raw comments are kept private</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What students appreciate (Strengths) */}
        <Card className="border-l-4 border-l-[#20C4EE] bg-white space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-[#EAF9FE] text-[#0A6C84] flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-[#20C4EE]" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-[#111111]">
                What Students Appreciate
              </h4>
              <p className="text-[11px] text-[#6B7280]">Key classroom strengths & highlights</p>
            </div>
          </div>

          {hasStrengths ? (
            <ul className="space-y-3">
              {themes.strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20C4EE] mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#6B7280] italic py-2">
              No positive themes recorded for this group yet.
            </p>
          )}
        </Card>

        {/* Opportunities for improvement */}
        <Card className="border-l-4 border-l-[#F59E0B] bg-white space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5E7EB]">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-[#111111]">
                Opportunities for Improvement
              </h4>
              <p className="text-[11px] text-[#6B7280]">Constructive suggestions for course delivery</p>
            </div>
          </div>

          {hasImprovements ? (
            <ul className="space-y-3">
              {themes.improvements.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333333]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#6B7280] italic py-2">
              No improvement suggestions recorded for this group yet.
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
