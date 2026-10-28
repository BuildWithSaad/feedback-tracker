import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MessageSquarePlus, BarChart3, Users } from 'lucide-react'
import type { Course } from '../../types'
import { getCourseOverviewStats } from '../../lib/calculations'
import { Card } from '../common/Card'
import { Badge } from '../common/Badge'
import { Button } from '../common/Button'

export interface CourseCardProps {
  course: Course
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const stats = getCourseOverviewStats(course)

  return (
    <Card hoverEffect className="flex flex-col h-full justify-between group">
      <div>
        {/* Header badges: Department & Code */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="cyan" size="sm">
            {course.department}
          </Badge>
          <span className="font-mono text-xs font-semibold text-[#6B7280] bg-gray-100 px-2.5 py-0.5 rounded-md">
            {course.code}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-[#111111] group-hover:text-[#0fb2dc] transition-colors mb-2 line-clamp-1">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-[#4B5563] line-clamp-2 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Offerings list / semester overview */}
        <div className="text-xs text-[#6B7280] mb-5 flex flex-wrap gap-1.5">
          {course.offerings.map((off) => (
            <span
              key={off.id}
              className="inline-block bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[11px]"
            >
              {off.semester} ({off.section})
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#E5E7EB]">
        {/* Ratings and response stats */}
        <div className="flex items-center justify-between mb-4">
          {stats.totalResponses > 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-[#EAF9FE] text-[#111111] px-2.5 py-1 rounded-lg border border-[#20C4EE]/30 font-semibold text-sm">
                <Star className="w-4 h-4 fill-[#20C4EE] text-[#20C4EE]" />
                <span>{stats.overallRating.toFixed(1)}</span>
                <span className="text-[11px] font-normal text-[#6B7280]">/ 5</span>
              </div>
              <span className="text-[10px] text-[#6B7280] italic">sample</span>
            </div>
          ) : (
            <Badge variant="amber" size="sm">
              No feedback yet
            </Badge>
          )}

          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Users className="w-3.5 h-3.5 text-[#20C4EE]" />
            <span>
              <strong>{stats.totalResponses}</strong> {stats.totalResponses === 1 ? 'response' : 'responses'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/insights/${course.id}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              icon={<BarChart3 className="w-3.5 h-3.5 text-[#0fb2dc]" />}
              className="w-full justify-center text-xs"
            >
              View Insights
            </Button>
          </Link>
          <Link to={`/feedback/${course.id}`} className="w-full">
            <Button
              variant="primary"
              size="sm"
              icon={<MessageSquarePlus className="w-3.5 h-3.5" />}
              className="w-full justify-center text-xs"
            >
              Give Feedback
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
