import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, PlusCircle, Sparkles, BookOpen, BarChart2, Shield } from 'lucide-react'
import { Button } from '../common/Button'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()


  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Home', path: '/', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Explore Courses', path: '/courses', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Course Insights', path: '/insights/cs-101', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'Privacy & Trust', path: '/privacy', icon: <Shield className="w-4 h-4" /> },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path.startsWith('/insights/')) {
      return location.pathname.startsWith('/insights/')
    }
    return location.pathname === path
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo container */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-ring rounded-xl p-1 -ml-1"
            aria-label="Feedback Tracker Home"
          >
            {/* Logo image with original black background pill */}
            <img
              src="/logo.png"
              alt="Feedback Tracker Logo"
              className="h-10 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 focus-ring ${
                    active
                      ? 'text-[#111111] bg-[#EAF9FE] font-semibold text-[#096B83]'
                      : 'text-[#4B5563] hover:text-[#111111] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/courses">
              <Button
                variant="primary"
                size="md"
                icon={<PlusCircle className="w-4 h-4" />}
                className="shadow-sm"
              >
                Submit Feedback
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link to="/courses" className="mr-1">
              <Button variant="primary" size="sm" icon={<PlusCircle className="w-3.5 h-3.5" />}>
                Submit
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#333333] hover:bg-gray-100 focus-ring"
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-[#E5E7EB] shadow-xl p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#EAF9FE] text-[#096B83] font-semibold'
                      : 'text-[#333333] hover:bg-gray-50'
                  }`}
                >
                  <span className={active ? 'text-[#20C4EE]' : 'text-[#6B7280]'}>
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <Link to="/courses" onClick={() => setIsOpen(false)} className="w-full">
              <Button
                variant="primary"
                size="lg"
                icon={<PlusCircle className="w-5 h-5" />}
                className="w-full justify-center"
              >
                Submit Course Feedback
              </Button>
            </Link>
            <div className="text-center text-xs text-[#6B7280] pt-1">
              Protected by minimum 10-response anonymity shield
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
