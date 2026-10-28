import React from 'react'
import { AlertCircle } from 'lucide-react'

export interface FormFieldErrorProps {
  message?: string
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({ message }) => {
  if (!message) return null

  return (
    <div
      role="alert"
      className="flex items-center gap-1.5 text-xs font-medium text-[#DC2626] animate-in fade-in duration-150"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
