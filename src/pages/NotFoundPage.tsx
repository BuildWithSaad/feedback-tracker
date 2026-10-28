import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, Home, BookOpen } from 'lucide-react'
import { Button } from '../components/common/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto my-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center mx-auto shadow-xs">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#20C4EE] uppercase tracking-wider">
          404 Error
        </span>
        <h1 className="font-heading text-3xl font-bold text-[#111111]">
          Page Not Found
        </h1>
        <p className="text-sm text-[#4B5563] leading-relaxed">
          The page or course link you followed does not exist. It may have been relocated or entered incorrectly.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link to="/" className="w-full sm:w-auto">
          <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />} className="w-full sm:w-auto">
            Go to Home
          </Button>
        </Link>
        <Link to="/courses" className="w-full sm:w-auto">
          <Button variant="outline" size="md" icon={<BookOpen className="w-4 h-4" />} className="w-full sm:w-auto">
            Browse Courses
          </Button>
        </Link>
      </div>
    </div>
  )
}
