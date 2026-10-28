import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, BarChart2, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { Button } from '../common/Button'
import type { Course } from '../../types'

export interface FeedbackSuccessProps {
  course: Course
  onReset?: () => void
}

export const FeedbackSuccess: React.FC<FeedbackSuccessProps> = ({
  course,
}) => {
  return (
    <div className="max-w-xl mx-auto my-8 p-8 md:p-10 bg-white rounded-3xl border border-[#E5E7EB] shadow-lg shadow-black/5 text-center space-y-6 animate-in zoom-in-95 duration-200">
      {/* Success Badge Icon */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 flex items-center justify-center text-[#15803D] shadow-xs">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#15803D] bg-[#ECFDF5] px-3 py-1 rounded-full">
          Submission Received
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#111111]">
          Feedback submitted successfully
        </h2>
        <p className="text-sm md:text-base text-[#4B5563] max-w-md mx-auto leading-relaxed">
          Thank you for sharing your experience for <strong>{course.code}: {course.title}</strong>. Your input helps build a clearer understanding of student learning.
        </p>
      </div>

      {/* Trust reassurance notice */}
      <div className="p-4 rounded-xl bg-[#EAF9FE] border border-[#20C4EE]/25 flex items-center justify-center gap-2 text-xs text-[#096B83]">
        <ShieldCheck className="w-4 h-4 text-[#20C4EE] shrink-0" />
        <span>Your response has been anonymised and added to aggregate metrics.</span>
      </div>

      {/* Action buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to={`/insights/${course.id}`} className="w-full sm:w-auto">
          <Button
            variant="primary"
            size="md"
            icon={<BarChart2 className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            View Course Insights
          </Button>
        </Link>
        <Link to="/dashboard" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            icon={<LayoutDashboard className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
