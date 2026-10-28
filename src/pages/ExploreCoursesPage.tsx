import React, { useState, useMemo } from 'react'
import { CourseSearch } from '../components/courses/CourseSearch'
import { CourseFilters } from '../components/courses/CourseFilters'
import { CourseGrid } from '../components/courses/CourseGrid'
import { EmptyState } from '../components/common/EmptyState'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { filterAndSortCourses } from '../lib/calculations'
import { mockFeedbackService } from '../lib/mockFeedbackService'
import type { SortOption } from '../types'
import { BookOpen } from 'lucide-react'

export const ExploreCoursesPage: React.FC = () => {
  const courses = mockFeedbackService.getCourses()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedSemester, setSelectedSemester] = useState('all')
  const [selectedSort, setSelectedSort] = useState<SortOption>('responses-desc')

  // Extract unique departments & semesters from courses
  const departments = useMemo(() => {
    return Array.from(new Set(courses.map((c) => c.department))).sort()
  }, [courses])

  const semesters = useMemo(() => {
    return Array.from(
      new Set(courses.flatMap((c) => c.offerings.map((o) => o.semester)))
    ).sort()
  }, [courses])

  const filteredCourses = useMemo(() => {
    return filterAndSortCourses(
      courses,
      searchQuery,
      selectedDepartment,
      selectedSemester,
      selectedSort
    )
  }, [courses, searchQuery, selectedDepartment, selectedSemester, selectedSort])

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDepartment !== 'all' ||
    selectedSemester !== 'all' ||
    selectedSort !== 'responses-desc'

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedDepartment('all')
    setSelectedSemester('all')
    setSelectedSort('responses-desc')
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ label: 'Courses' }]} />

      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF9FE] border border-[#20C4EE]/30 text-xs font-semibold text-[#0A6C84]">
          <BookOpen className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Course Catalog</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111111]">
          Explore Course Insights
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] max-w-2xl leading-relaxed">
          Discover what student feedback reveals about different courses. Filter by semester or department to view aggregated ratings and qualitative themes.
        </p>
      </div>

      {/* Search and Filters Controls */}
      <div className="space-y-4">
        <CourseSearch value={searchQuery} onChange={setSearchQuery} />
        <CourseFilters
          departments={departments}
          semesters={semesters}
          selectedDepartment={selectedDepartment}
          selectedSemester={selectedSemester}
          selectedSort={selectedSort}
          onSelectDepartment={setSelectedDepartment}
          onSelectSemester={setSelectedSemester}
          onSelectSort={setSelectedSort}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          totalResults={filteredCourses.length}
        />
      </div>

      {/* Course Grid or Empty State */}
      {filteredCourses.length > 0 ? (
        <CourseGrid courses={filteredCourses} />
      ) : (
        <EmptyState
          title="No courses match your search."
          description={`We couldn't find any courses matching your criteria. Try adjusting your search query, or clear your department and semester filters.`}
          actionLabel="Reset all filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  )
}
