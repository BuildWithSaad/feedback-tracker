import React from 'react'
import { ShieldAlert, Users, Lock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../common/Button'

export interface PrivacyThresholdNoticeProps {
  currentResponses: number
  threshold?: number
  courseId: string
  onResetFilters?: () => void
}

export const PrivacyThresholdNotice: React.FC<PrivacyThresholdNoticeProps> = ({
  currentResponses,
  threshold = 10,
  courseId,
  onResetFilters,
}) => {
  const needed = Math.max(0, threshold - currentResponses)

  return (
    <div className="bg-[#EAF9FE]/70 border-2 border-dashed border-[#20C4EE]/40 rounded-3xl p-6 md:p-10 text-center space-y-6 my-6 animate-in fade-in duration-200">
      <div className="w-16 h-16 rounded-2xl bg-white border border-[#20C4EE]/30 flex items-center justify-center text-[#0A6C84] mx-auto shadow-xs">
        <Lock className="w-8 h-8 text-[#20C4EE]" />
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0A6C84] bg-white px-3 py-1 rounded-full border border-[#20C4EE]/30 mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Privacy Protection Active</span>
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-bold text-[#111111]">
          Results aren't available for this group yet.
        </h3>
        <p className="text-sm md:text-base text-[#4B5563] leading-relaxed">
          Course summaries are displayed only when enough responses are available to help protect student privacy.
        </p>
      </div>

      {/* Threshold metric progress bar */}
      <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-[#6B7280] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#20C4EE]" />
            Current Responses
          </span>
          <span className="font-mono text-[#111111] font-bold">
            {currentResponses} / {threshold} required
          </span>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#20C4EE] to-[#0fb2dc] rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (currentResponses / threshold) * 100)}%` }}
          />
        </div>

        <p className="text-[11px] text-[#6B7280]">
          <strong>{needed} more {needed === 1 ? 'response' : 'responses'}</strong> needed to unlock aggregate analytics for this specific semester or section.
        </p>
      </div>

      {/* Backend note */}
      <p className="text-xs text-[#6B7280] max-w-lg mx-auto">
        <em>Demonstration Notice:</em> This frontend threshold illustrates differential privacy principles. In a production system, minimum group sizes are enforced at the database layer to prevent inference attacks.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to={`/feedback/${courseId}`}>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Feedback for this Course
          </Button>
        </Link>
        {onResetFilters && (
          <Button
            variant="outline"
            size="md"
            onClick={onResetFilters}
          >
            View All Offerings (Unfiltered)
          </Button>
        )}
      </div>
    </div>
  )
}
