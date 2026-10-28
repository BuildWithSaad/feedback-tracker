import React from 'react'

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-xl w-1/3"></div>
      <div className="h-4 bg-gray-100 rounded-lg w-2/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-2xl border border-gray-200/60 p-4"></div>
        ))}
      </div>
      <div className="h-64 bg-gray-100 rounded-2xl border border-gray-200/60 mt-6"></div>
    </div>
  )
}
