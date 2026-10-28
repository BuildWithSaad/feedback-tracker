import React from 'react'
import { Search, X } from 'lucide-react'

export interface CourseSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const CourseSearch: React.FC<CourseSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search by course name, code (e.g. CS 101), or department...',
}) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4 text-[#20C4EE]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#20C4EE] focus:ring-2 focus:ring-[#20C4EE]/20 transition-all shadow-2xs"
        aria-label="Search courses"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#111111] focus:outline-none"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
