import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Users,
  Database,
  AlertTriangle,
  CheckCircle,
  Sliders,
  Sparkles,
} from 'lucide-react'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'

export const PrivacyPage: React.FC = () => {
  // Interactive demonstrator state
  const [demoResponses, setDemoResponses] = useState(7)
  const threshold = 10
  const isSuppressed = demoResponses < threshold

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Privacy & Architecture' }]} />

      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF9FE] border border-[#20C4EE]/30 text-xs font-semibold text-[#0A6C84]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#20C4EE]" />
          <span>Trust & Anonymity</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111111]">
          Privacy and How It Works
        </h1>
        <p className="text-base text-[#4B5563] max-w-2xl leading-relaxed">
          Feedback Tracker was conceived with a privacy-first mindset. Learn how student feedback is aggregated, how minimum response thresholds protect small groups, and what this prototype demonstrates.
        </p>
      </div>

      {/* Interactive Demonstration Widget: See the Threshold in Action */}
      <Card className="border-[#20C4EE]/40 bg-linear-to-br from-[#EAF9FE]/60 via-white to-white p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0A6C84] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#20C4EE]" />
              Interactive Anonymity Simulator
            </span>
            <h3 className="font-heading text-lg font-bold text-[#111111] mt-0.5">
              Experience the 10-Response Privacy Rule
            </h3>
          </div>
          <span className="text-xs text-[#6B7280]">
            Drag slider to test suppression
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-semibold text-[#111111]">
            <span>Simulated Cohort Response Count:</span>
            <span className="font-mono text-base bg-white px-3 py-1 rounded-lg border border-[#E5E7EB]">
              {demoResponses} {demoResponses === 1 ? 'student' : 'students'}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="25"
            value={demoResponses}
            onChange={(e) => setDemoResponses(Number(e.target.value))}
            className="w-full accent-[#20C4EE] cursor-pointer"
            aria-label="Simulated cohort response slider"
          />

          <div className="flex justify-between text-xs text-[#6B7280]">
            <span>0 (Empty)</span>
            <span className="font-semibold text-[#20C4EE]">10 (Threshold)</span>
            <span>25+ (Unlocked)</span>
          </div>
        </div>

        {/* Dynamic Simulator Output */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isSuppressed
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-[#ECFDF5] border-[#10B981]/30 text-[#15803D]'
          }`}
        >
          <div className="flex items-start gap-3">
            {isSuppressed ? (
              <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h4 className="font-heading font-semibold text-sm">
                {isSuppressed
                  ? `Privacy Shield ACTIVE (${demoResponses} < ${threshold} responses)`
                  : `Course Summaries UNLOCKED (${demoResponses} ≥ ${threshold} responses)`}
              </h4>
              <p className="text-xs leading-relaxed opacity-90">
                {isSuppressed
                  ? 'All average ratings, charts, and feedback themes are suppressed. In small classes, individual student responses could otherwise be deduced by faculty or peers.'
                  : 'Sufficient sample size reached. Ratings and thematic summaries are mathematically aggregated and safely rendered without revealing any individual submission.'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* 6 Core Informational Sections */}
      <div className="space-y-6">
        {/* Section 1 */}
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              1. What Students Submit
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Students provide evaluations on a standardised 5-point scale across five core dimensions: teaching quality, concept clarity, assignment relevance, practical lab sessions, and overall satisfaction. An optional text area allows constructive comments for qualitative context.
          </p>
        </Card>

        {/* Section 2 */}
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              2. Why Ratings and Comments Are Collected
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Constructive course feedback serves two essential purposes: it gives teaching faculty evidence-based insights to calibrate pacing, revise problem sets, and improve instructional clarity; and it helps students make informed decisions during registration.
          </p>
        </Card>

        {/* Section 3 */}
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              3. What Aggregate Results Mean
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Public course dashboards display only mathematical aggregates: weighted mean ratings, rating frequency histograms, and common qualitative themes. Raw individual responses and timestamps are never exposed in student-facing views.
          </p>
        </Card>

        {/* Section 4 */}
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              4. Why Small Groups May Not Display Results
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            If a course section or seminar has fewer than 10 responses, displaying an average or a specific distribution could enable re-identification (for example, if only 3 students submit and one gives a low score). The 10-response rule prevents statistical inference attacks.
          </p>
        </Card>

        {/* Section 5 */}
        <Card className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF9FE] text-[#20C4EE] flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              5. Why Comments Must Avoid Identifying Details
            </h2>
          </div>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Students are instructed never to mention personal student names, specific grades received, disciplinary issues, or idiosyncratic project titles that could compromise anonymity. Qualitative feedback should focus purely on pedagogy, resources, and learning outcomes.
          </p>
        </Card>

        {/* Section 6 */}
        <Card className="space-y-3 bg-gray-50/70 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-200 text-[#111111] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-gray-700" />
            </div>
            <h2 className="font-heading text-lg font-bold text-[#111111]">
              6. What This Demonstration Prototype Does and Does Not Store
            </h2>
          </div>
          <div className="text-sm text-[#4B5563] space-y-2 leading-relaxed">
            <p>
              <strong>Important Scope Distinction:</strong> This application is a fully functional <em>frontend prototype</em>. Current submissions are held in-memory and local browser storage to demonstrate the student user journey.
            </p>
            <p>
              In an enterprise production deployment, real data privacy requires server-side zero-knowledge proofs, authenticated student token issuance via university SSO (without storing the link between user ID and submission), and backend enforcement of differential privacy guarantees.
            </p>
          </div>
        </Card>
      </div>

      {/* Call to action */}
      <div className="text-center pt-6 space-y-4">
        <h3 className="font-heading text-xl font-bold text-[#111111]">
          Ready to contribute your course feedback?
        </h3>
        <Link to="/courses">
          <Button variant="primary" size="lg" icon={<Users className="w-4 h-4" />}>
            Explore Courses & Submit Feedback
          </Button>
        </Link>
      </div>
    </div>
  )
}
