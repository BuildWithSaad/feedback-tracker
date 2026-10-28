import React from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  BarChart3,
  MessageSquareHeart,
  TrendingUp,
  CheckCircle,
  HelpCircle,
} from 'lucide-react'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { CourseCard } from '../components/courses/CourseCard'
import { mockFeedbackService } from '../lib/mockFeedbackService'

export const LandingPage: React.FC = () => {
  const allCourses = mockFeedbackService.getCourses()
  const featuredCourses = allCourses.slice(0, 4)

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      {/* SECTION A: HERO */}
      <section className="pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF9FE] border border-[#20C4EE]/30 text-[#0A6C84] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#20C4EE]" />
              <span>STUDENT FEEDBACK PLATFORM</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111111] leading-[1.1] tracking-tight">
              Your voice. <br />
              <span className="text-[#0fb2dc]">Better learning.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] max-w-xl leading-relaxed">
              Share your course experience, discover student insights, and help make learning better for everyone.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link to="/courses">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<MessageSquareHeart className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Submit Feedback
                </Button>
              </Link>
              <Link to="/insights/cs-101">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<BarChart3 className="w-5 h-5 text-[#20C4EE]" />}
                  className="w-full sm:w-auto"
                >
                  Explore Insights
                </Button>
              </Link>
            </div>

            {/* Trust disclaimer micro-note */}
            <div className="pt-2 flex items-center gap-2 text-xs text-[#6B7280]">
              <ShieldCheck className="w-4 h-4 text-[#20C4EE] shrink-0" />
              <span>
                Anonymous aggregate feedback • Minimum 10 responses required to unlock public summaries.
              </span>
            </div>
          </div>

          {/* Right Column: Polished Product Interface Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative cyan ambient blur behind preview */}
              <div
                className="absolute -inset-2 bg-linear-to-r from-[#20C4EE]/20 to-[#EAF9FE] rounded-3xl blur-xl opacity-70 -z-10"
                aria-hidden="true"
              />

              {/* Interface Mock Card */}
              <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xl shadow-black/5 p-6 space-y-5">
                {/* Header of preview */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#20C4EE] bg-[#EAF9FE] px-2 py-0.5 rounded">
                        CS 101
                      </span>
                      <h4 className="font-heading font-semibold text-sm text-[#111111]">
                        Data Structures
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Fall 2025 • Section A</p>
                  </div>
                  <Badge variant="cyan" size="sm">
                    Verified Sample
                  </Badge>
                </div>

                {/* Overall Rating Hero Preview */}
                <div className="flex items-center justify-between bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                      Overall Rating
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-heading text-3xl font-bold text-[#111111]">4.7</span>
                      <span className="text-xs text-[#6B7280]">/ 5.0</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5 text-[#20C4EE]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#20C4EE]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#6B7280] flex items-center justify-end gap-1 mt-1">
                      <Users className="w-3 h-3 text-[#20C4EE]" /> 48 responses
                    </span>
                  </div>
                </div>

                {/* Category Mini Bar Preview */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-[#111111]">
                    Key Category Scores
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#4B5563] mb-1">
                        <span>Teaching Quality</span>
                        <span className="font-bold font-mono">4.8</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#20C4EE] rounded-full w-[96%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-[#4B5563] mb-1">
                        <span>Concept Clarity</span>
                        <span className="font-bold font-mono">4.7</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#20C4EE] rounded-full w-[94%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] text-[#4B5563] mb-1">
                        <span>Practical Sessions</span>
                        <span className="font-bold font-mono">4.8</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#20C4EE] rounded-full w-[96%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer preview note */}
                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#15803D]" /> Privacy threshold satisfied
                  </span>
                  <Link
                    to="/insights/cs-101"
                    className="text-[#096B83] font-semibold hover:underline"
                  >
                    View live data →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: HOW IT WORKS */}
      <section id="how-it-works" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
            How Feedback Tracker Works
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            A trustworthy, privacy-preserving cycle that turns student experiences into collective clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card hoverEffect className="space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF9FE] text-[#0fb2dc] flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#111111]">
              Share Your Experience
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Rate your courses across teaching, clarity, assignments, and practical labs, and optionally share suggestions without attaching your identity.
            </p>
          </Card>

          {/* Card 2 */}
          <Card hoverEffect className="space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF9FE] text-[#0fb2dc] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#111111]">
              Explore Student Insights
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Understand aggregate ratings through clear visualisations, rating distributions, and recurring themes across semesters and sections.
            </p>
          </Card>

          {/* Card 3 */}
          <Card hoverEffect className="space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF9FE] text-[#0fb2dc] flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#111111]">
              Improve Learning
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Discover areas of strength and opportunities for improvement to help faculty adapt their teaching and assist peers with course selection.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION C: FEATURED COURSES */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
              Featured Course Offerings
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Sample insights from recent academic semesters. All metrics are demonstrative sample data.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              View All Courses
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* SECTION D: TRUST SECTION */}
      <section className="bg-gray-50/80 rounded-3xl border border-[#E5E7EB] p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111111]">
              <ShieldCheck className="w-4 h-4 text-[#20C4EE]" />
              <span>Trust & Differential Privacy</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111]">
              Honest feedback starts with trust.
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Feedback Tracker is designed so individual submissions are never publicly visible. To safeguard anonymity, course summaries are strictly suppressed whenever a cohort has fewer than 10 responses.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#333333]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#15803D]" />
                <span>Zero identifiable tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#15803D]" />
                <span>Minimum 10-response rule</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#15803D]" />
                <span>Unbiased aggregate charts</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <Link to="/privacy">
              <Button
                variant="outline"
                size="md"
                icon={<HelpCircle className="w-4 h-4 text-[#20C4EE]" />}
                className="bg-white"
              >
                Read Privacy Architecture
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION E: FINAL CALL TO ACTION */}
      <section className="bg-linear-to-br from-[#111111] to-[#1A1A1A] text-white rounded-3xl p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-xl">
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#20C4EE]/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-xl mx-auto space-y-3 relative z-10">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#20C4EE]">
            Empower Higher Education
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Make your learning experience count.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Take two minutes to submit thoughtful feedback on your completed courses, or explore aggregate summaries to plan your upcoming semesters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10 pt-2">
          <Link to="/courses" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              icon={<MessageSquareHeart className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-md"
            >
              Submit Feedback
            </Button>
          </Link>
          <Link to="/courses" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              icon={<TrendingUp className="w-5 h-5 text-[#20C4EE]" />}
              className="w-full sm:w-auto bg-transparent text-white border-gray-700 hover:bg-white/10 hover:border-gray-500"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
