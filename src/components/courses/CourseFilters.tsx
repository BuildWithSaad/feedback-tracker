import React from 'react'
import { Filter, RotateCcw } from 'lucide-react'
import type { SortOption } from '../../types'
import { Button } from '../common/Button'

export interface CourseFiltersProps {
  departments: string[]
  semesters: string[]
  selectedDepartment: string
  selectedSemester: string
  selectedSort: SortOption
  onSelectDepartment: (dept: string) => void
  onSelectSemester: (sem: string) => void
  onSelectSort: (sort: SortOption) => void
  onReset: () => void
  hasActiveFilters: boolean
  totalResults: number
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  departments,
  semesters,
  selectedDepartment,
  selectedSemester,
  selectedSort,
  onSelectDepartment,
  onSelectSemester,
  onSelectSort,
  onReset,
  hasActiveFilters,
  totalResults,
}) => {
  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] uppercase tracking-wider mr-1">
            <Filter className="w-4 h-4 text-[#20C4EE]" />
            <span>Filters:</span>
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111111] focus-ring cursor-pointer"
              aria-label="Filter by department"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => onSelectSemester(e.target.value)}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111111] focus-ring cursor-pointer"
              aria-label="Filter by semester"
            >
              <option value="all">All Semesters</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111111] focus-ring cursor-pointer"
              aria-label="Sort courses by"
            >
              <option value="responses-desc">Sort: Most Responses</option>
              <option value="rating-desc">Sort: Highest Rated</option>
              <option value="code-asc">Sort: Course Code (A-Z)</option>
              <option value="title-asc">Sort: Course Name (A-Z)</option>
            </select>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5 text-[#DC2626]" />}
              onClick={onReset}
              className="text-[#DC2626] hover:bg-red-50 text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>

        {/* Right: Results Count */}
        <div className="text-xs text-[#6B7280] font-medium shrink-0">
          Showing <span className="font-semibold text-[#111111]">{totalResults}</span> {totalResults === 1 ? 'course' : 'courses'}
        </div>
      </div>
    </div>
  )
}
