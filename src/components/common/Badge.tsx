import React from 'react'
import { clsx } from 'clsx'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'cyan' | 'gray' | 'green' | 'amber' | 'dark'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  icon,
  className,
}) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap'

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  }

  const variantClasses = {
    cyan: 'bg-[#EAF9FE] text-[#0A6C84] border border-[#20C4EE]/30',
    gray: 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]',
    green: 'bg-[#ECFDF5] text-[#15803D] border border-[#10B981]/30',
    amber: 'bg-[#FFFBEB] text-[#B45309] border border-[#F59E0B]/30',
    dark: 'bg-[#111111] text-white border border-[#333333]',
  }

  return (
    <span className={clsx(baseClasses, sizeClasses[size], variantClasses[variant], className)}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
