import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { PageContainer } from './components/layout/PageContainer'

// Page Components
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { ExploreCoursesPage } from './pages/ExploreCoursesPage'
import { FeedbackPage } from './pages/FeedbackPage'
import { CourseInsightsPage } from './pages/CourseInsightsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
        <PageContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<ExploreCoursesPage />} />
            <Route path="/feedback/:courseId" element={<FeedbackPage />} />
            <Route path="/insights/:courseId" element={<CourseInsightsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageContainer>
      </div>

      <Footer />
    </div>
  )
}

export default App
