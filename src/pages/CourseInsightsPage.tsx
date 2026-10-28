import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Star,
  Users,
  GraduationCap,
  Sparkles,
  Filter,
  MessageSquarePlus,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Layers,
  Info,
} from 'lucide-react'
import { mockFeedbackService } from '../lib/mockFeedbackService'
import { calculateAggregateInsights } from '../lib/calculations'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { RatingSummaryCard } from '../components/analytics/RatingSummaryCard'
import { CategoryRatingsChart } from '../components/analytics/CategoryRatingsChart'
import { RatingDistributionChart } from '../components/analytics/RatingDistributionChart'
import { FeedbackThemes } from '../components/analytics/FeedbackThemes'
import { PrivacyThresholdNotice } from '../components/analytics/PrivacyThresholdNotice'
import { EmptyState } from '../components/common/EmptyState'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export const CourseInsightsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? mockFeedbackService.getCourseById(courseId) : undefined

  // Filter states
  const [selectedSemester, setSelectedSemester] = useState<string>('all')
  const [selectedSection, setSelectedSection] = useState<string>('all')

  // Calculate insights unconditionally to follow rules of hooks
  const insights = useMemo(() => {
    if (!course) return null
    return calculateAggregateInsights(course, selectedSemester, selectedSection)
  }, [course, selectedSemester, selectedSection])

  // If course does not exist
  if (!course || !insights) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-bold text-[#111111]">
            Course Not Found
          </h2>
          <p className="text-sm text-[#4B5563]">
            No insights are available for <code>"{courseId}"</code>.
          </p>
        </div>
        <Link to="/courses">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Course Explorer
          </Button>
        </Link>
      </div>
    )
  }

  const handleResetFilters = () => {
    setSelectedSemester('all')
    setSelectedSection('all')
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Courses', to: '/courses' },
          { label: `${course.code}: ${course.title}` },
        ]}
      />

      {/* Course Header Area */}
      <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 md:p-8 space-y-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" size="sm">
                {course.department}
              </Badge>
              <span className="font-mono text-xs font-semibold text-[#6B7280] bg-gray-100 px-2.5 py-0.5 rounded-md">
                {course.code}
              </span>
              <span className="text-xs text-[#6B7280]">
                {course.credits} Academic Credits
              </span>
              <Badge variant="gray" size="sm">
                Sample Dataset
              </Badge>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111]">
              {course.title}
            </h1>

            <p className="text-sm text-[#4B5563] max-w-3xl leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Direct Feedback Button */}
          <div className="shrink-0">
            <Link to={`/feedback/${course.id}`}>
              <Button
                variant="primary"
                size="md"
                icon={<MessageSquarePlus className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Submit Feedback
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar for Semesters & Sections */}
        <div className="pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] uppercase tracking-wider">
              <Filter className="w-4 h-4 text-[#20C4EE]" />
              <span>Offering Filter:</span>
            </div>

            {/* Semester Dropdown */}
            <div className="flex items-center gap-1 bg-gray-50 border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bg-transparent text-[#111111] font-medium focus:outline-none cursor-pointer pr-2"
                aria-label="Filter by semester"
              >
                <option value="all">All Semesters</option>
                {insights.availableSemesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Dropdown */}
            <div className="flex items-center gap-1 bg-gray-50 border border-[#E5E7EB] rounded-xl px-2.5 py-1.5 text-xs">
              <Layers className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="bg-transparent text-[#111111] font-medium focus:outline-none cursor-pointer pr-2"
                aria-label="Filter by course section"
              >
                <option value="all">All Sections</option>
                {insights.availableSections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {(selectedSemester !== 'all' || selectedSection !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-[#DC2626] hover:underline font-medium ml-2"
              >
                Clear Offering Filters
              </button>
            )}
          </div>

          {/* Quick status badge */}
          <div className="text-xs text-[#6B7280]">
            Displaying: <strong>{selectedSemester === 'all' ? 'All Semesters' : selectedSemester}</strong> •{' '}
            <strong>{selectedSection === 'all' ? 'All Sections' : selectedSection}</strong>
          </div>
        </div>
      </div>

      {/* CONDITIONAL RENDERING BASED ON RESPONSES & PRIVACY THRESHOLD */}
      {insights.totalResponses === 0 ? (
        // STATE 1: Zero responses
        <EmptyState
          title="No evaluations submitted yet for this offering"
          description="Be the first student to share your experience and kickstart aggregate insights for this course."
          actionLabel="Give First Feedback"
          onAction={() => window.location.assign(`/feedback/${course.id}`)}
          icon={<MessageSquarePlus className="w-7 h-7 text-[#20C4EE]" />}
        />
      ) : insights.isSuppressed ? (
        // STATE 2: Threshold active (< 10 responses)
        <PrivacyThresholdNotice
          currentResponses={insights.totalResponses}
          threshold={10}
          courseId={course.id}
          onResetFilters={
            selectedSemester !== 'all' || selectedSection !== 'all'
              ? handleResetFilters
              : undefined
          }
        />
      ) : (
        // STATE 3: Unmasked aggregate metrics (> = 10 responses)
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* SECTION B: 4 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <RatingSummaryCard
              label="Overall Rating"
              value={insights.overallRating}
              subtext={`Weighted across ${insights.totalResponses} evaluations`}
              icon={<Star className="w-4 h-4 text-[#20C4EE]" />}
              isRating
              highlight
            />

            <RatingSummaryCard
              label="Total Responses"
              value={insights.totalResponses}
              subtext="Meets minimum 10-student anonymity threshold"
              icon={<Users className="w-4 h-4 text-[#20C4EE]" />}
              isRating={false}
            />

            <RatingSummaryCard
              label="Teaching Quality"
              value={insights.categoryRatings.teachingQuality}
              subtext="Preparedness and instructional delivery"
              icon={<GraduationCap className="w-4 h-4 text-[#20C4EE]" />}
              isRating
            />

            <RatingSummaryCard
              label="Concept Clarity"
              value={insights.categoryRatings.conceptClarity}
              subtext="Structure and clarity of core principles"
              icon={<Sparkles className="w-4 h-4 text-[#20C4EE]" />}
              isRating
            />
          </div>

          {/* SECTION C & D: Average Ratings Chart & Distribution Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryRatingsChart ratings={insights.categoryRatings} />
            <RatingDistributionChart
              distribution={insights.ratingDistribution}
              totalResponses={insights.totalResponses}
            />
          </div>

          {/* SECTION E: What Students Are Saying */}
          <FeedbackThemes themes={insights.feedbackThemes} />

          {/* Privacy Guarantee Footer Reminder */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#20C4EE] shrink-0" />
              <span>
                Aggregate metrics are computed locally for demonstration. Raw student feedback records are strictly preserved as anonymous.
              </span>
            </div>
            <Link to="/privacy" className="text-[#096B83] font-semibold hover:underline shrink-0 ml-4">
              Learn about our privacy rules →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
