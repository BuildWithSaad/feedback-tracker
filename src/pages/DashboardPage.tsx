import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquarePlus,
  BarChart3,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Search,
  RotateCcw,
} from 'lucide-react'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { CourseGrid } from '../components/courses/CourseGrid'
import { EmptyState } from '../components/common/EmptyState'
import { mockFeedbackService } from '../lib/mockFeedbackService'

export const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const courses = mockFeedbackService.getCourses()

  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return courses
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q)
    )
  }, [courses, searchQuery])

  // Institutional overall statistics for the student dashboard
  const totalCoursesCount = courses.length
  const totalOfferingsCount = courses.reduce((sum, c) => sum + c.offerings.length, 0)
  const totalResponsesCount = courses.reduce(
    (sum, c) => sum + c.offerings.reduce((s, o) => s + o.responseCount, 0),
    0
  )

  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF9FE] border border-[#20C4EE]/30 text-xs font-semibold text-[#0A6C84]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Student Portal</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111111]">
          Your Learning, Your Voice.
        </h1>
        <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
          Explore course insights or share your experience. Your anonymous feedback helps faculty calibrate coursework and assists fellow students.
        </p>
      </div>

      {/* Main Two Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Share Feedback */}
        <Card
          hoverEffect
          className="border-[#20C4EE]/30 bg-linear-to-br from-[#EAF9FE]/60 via-white to-white flex flex-col justify-between p-6 md:p-8"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#20C4EE] text-[#111111] flex items-center justify-center shadow-xs">
              <MessageSquarePlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#111111]">
                Share Course Feedback
              </h3>
              <p className="text-sm text-[#4B5563] mt-1 leading-relaxed">
                Evaluate your recent courses across teaching, clarity, workload, and practical labs. Submissions are fully anonymous.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link to="/courses">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Start Feedback
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 2: Course Insights */}
        <Card
          hoverEffect
          className="border-gray-200 bg-white flex flex-col justify-between p-6 md:p-8"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-[#111111] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#20C4EE]" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[#111111]">
                Course Insights & Analytics
              </h3>
              <p className="text-sm text-[#4B5563] mt-1 leading-relaxed">
                Review aggregated rating distributions, category breakdowns, and recurring themes before registering for future classes.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link to="/courses">
              <Button
                variant="secondary"
                size="md"
                icon={<BookOpen className="w-4 h-4 text-[#20C4EE]" />}
                className="w-full sm:w-auto"
              >
                Explore Courses
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Institutional Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50/70 p-4 md:p-6 rounded-2xl border border-[#E5E7EB]">
        <div>
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">
            Tracked Courses
          </span>
          <div className="font-heading text-2xl md:text-3xl font-bold text-[#111111] mt-0.5">
            {totalCoursesCount}
          </div>
        </div>
        <div>
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">
            Active Offerings
          </span>
          <div className="font-heading text-2xl md:text-3xl font-bold text-[#111111] mt-0.5">
            {totalOfferingsCount}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold">
            Evaluations Aggregated
          </span>
          <div className="font-heading text-2xl md:text-3xl font-bold text-[#0A6C84] mt-0.5">
            {totalResponsesCount}
          </div>
        </div>
      </div>

      {/* Course Overview Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[#111111]">
              Available Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Select a course to submit feedback or view aggregated analytics.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs text-[#111111] focus-ring"
            />
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <CourseGrid courses={filteredCourses} />
        ) : (
          <EmptyState
            title="No matching courses found"
            description={`No courses matched "${searchQuery}". Clear your search query to see the catalog.`}
            actionLabel="Clear Search"
            onAction={() => setSearchQuery('')}
            icon={<RotateCcw className="w-7 h-7 text-[#20C4EE]" />}
          />
        )}
      </div>
    </div>
  )
}
