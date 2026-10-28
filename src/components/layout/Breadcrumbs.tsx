import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs md:text-sm text-[#6B7280]">
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#111111] transition-colors focus-ring rounded"
          >
            <Home className="w-3.5 h-3.5 text-[#20C4EE]" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
              {isLast || !item.to ? (
                <span className="font-semibold text-[#111111] truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-[#111111] transition-colors focus-ring rounded truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
