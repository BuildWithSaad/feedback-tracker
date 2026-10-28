import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Heart, Sparkles, BookOpen, BarChart2 } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus-ring rounded-xl">
              <img
                src="/logo.png"
                alt="Feedback Tracker Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#4B5563] max-w-sm leading-relaxed">
              <strong>Feedback Tracker</strong> empowers students to share structured course feedback and explore aggregate classroom insights to make higher education better for everyone.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#0A6C84] bg-[#EAF9FE] px-3 py-1.5 rounded-lg border border-[#20C4EE]/20 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#20C4EE]" />
              <span>Built with anonymised threshold protection</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm text-[#111111] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#4B5563]">
              <li>
                <Link to="/" className="hover:text-[#20C4EE] transition-colors flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#20C4EE]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#20C4EE] transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#20C4EE]" />
                  <span>Student Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#20C4EE] transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#20C4EE]" />
                  <span>Explore Courses</span>
                </Link>
              </li>
              <li>
                <Link to="/insights/cs-101" className="hover:text-[#20C4EE] transition-colors flex items-center gap-2">
                  <BarChart2 className="w-3.5 h-3.5 text-[#20C4EE]" />
                  <span>Course Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#20C4EE] transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#20C4EE]" />
                  <span>Privacy & How It Works</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Demonstration Notice */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-sm text-[#111111] uppercase tracking-wider">
              Sample Data Notice
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              All ratings, feedback themes, course offerings, and survey responses displayed across this prototype are simulated sample data for demonstration purposes.
            </p>
            <div className="pt-2 text-xs text-[#6B7280]">
              <span className="font-semibold text-[#111111]">Privacy Threshold:</span> Minimum 10 responses required before group summaries are unmasked.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>© 2026 Feedback Tracker. Your voice. Better learning.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[#111111] underline">
              Privacy Principles
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted for education <Heart className="w-3 h-3 text-[#20C4EE] fill-[#20C4EE]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
