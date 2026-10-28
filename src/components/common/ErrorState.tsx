import React from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from './Button'

export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Your feedback could not be submitted. Please try again.',
  onRetry,
  retryLabel = 'Try again',
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50/60 rounded-2xl border border-red-200 my-6">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#DC2626] mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-[#111111] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[#4B5563] max-w-md mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
