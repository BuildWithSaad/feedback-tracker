import React from 'react'
import { Inbox } from 'lucide-react'
import { Button } from './Button'

export interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No courses match your search.',
  description = 'Try adjusting your search criteria, clearing active filters, or exploring other departments.',
  actionLabel = 'Reset filters',
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white rounded-2xl border border-dashed border-[#E5E7EB] my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#EAF9FE] flex items-center justify-center text-[#20C4EE] mb-4">
        {icon || <Inbox className="w-7 h-7" />}
      </div>
      <h3 className="font-heading text-lg md:text-xl font-semibold text-[#111111] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#6B7280] max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
