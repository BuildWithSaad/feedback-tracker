import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackFormSchema, type FeedbackFormData } from '../lib/validation'
import { mockFeedbackService } from '../lib/mockFeedbackService'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { RatingControl } from '../components/feedback/RatingControl'
import { CommentField } from '../components/feedback/CommentField'
import { PrivacyNotice } from '../components/common/PrivacyNotice'
import { FeedbackSuccess } from '../components/feedback/FeedbackSuccess'
import { ErrorState } from '../components/common/ErrorState'
import { Button } from '../components/common/Button'
import { Card } from '../components/common/Card'
import { Badge } from '../components/common/Badge'
import { BookOpen, AlertCircle, ArrowLeft, Bug } from 'lucide-react'

export const FeedbackPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()

  const course = courseId ? mockFeedbackService.getCourseById(courseId) : undefined

  // Submission status states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  
  // Developer test toggle for simulating a failure path
  const [simulateErrorToggle, setSimulateErrorToggle] = useState(false)

  // Default semester & section from offerings
  const defaultSemester = course?.offerings[0]?.semester || 'Spring 2026'
  const defaultSection = course?.offerings[0]?.section || 'Section A'

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      courseId: course?.id || '',
      semester: defaultSemester,
      section: defaultSection,
      teachingQuality: undefined,
      conceptClarity: undefined,
      assignmentQuality: undefined,
      practicalSessions: undefined,
      overallSatisfaction: undefined,
      comments: '',
    },
  })

  // If course not found
  if (!course) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading text-2xl font-bold text-[#111111]">
            Course Not Found
          </h2>
          <p className="text-sm text-[#4B5563]">
            We couldn't locate a course matching ID <code>"{courseId}"</code>. It may have been archived or moved.
          </p>
        </div>
        <Link to="/courses">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Course Explorer
          </Button>
        </Link>
      </div>
    )
  }

  // Handle Form Submission
  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      await mockFeedbackService.submitFeedback(
        {
          courseId: course.id,
          semester: data.semester,
          section: data.section,
          ratings: {
            teachingQuality: data.teachingQuality,
            conceptClarity: data.conceptClarity,
            assignmentQuality: data.assignmentQuality,
            practicalSessions: data.practicalSessions,
            overallSatisfaction: data.overallSatisfaction,
          },
          comments: data.comments?.trim() || undefined,
        },
        simulateErrorToggle // Pass the test error simulation flag
      )

      setIsSuccess(true)
    } catch (err: any) {
      setSubmissionError(
        err.message || 'Your feedback could not be submitted. Please check your connection and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // If successfully submitted, render success state
  if (isSuccess) {
    return <FeedbackSuccess course={course} />
  }

  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Courses', to: '/courses' },
          { label: course.code, to: `/insights/${course.id}` },
          { label: 'Submit Feedback' },
        ]}
      />

      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm">
            {course.department}
          </Badge>
          <span className="font-mono text-xs font-semibold text-[#6B7280]">
            {course.code}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111111]">
          Share Your Feedback
        </h1>
        <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
          Your honest experience for <strong>{course.title}</strong> helps instructors understand what is working and what could be improved.
        </p>
      </div>

      {/* Recoverable Submission Error Alert */}
      {submissionError && (
        <ErrorState
          title="Submission Failed"
          message={submissionError}
          onRetry={handleSubmit(onSubmit)}
          retryLabel="Retry Submission"
        />
      )}

      {/* Main Feedback Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* SECTION A: Course & Offering Info */}
        <Card className="space-y-4 bg-gray-50/50">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
            <BookOpen className="w-4 h-4 text-[#20C4EE]" />
            <h3 className="font-heading font-semibold text-sm text-[#111111]">
              Course & Offering Context
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Semester selector */}
            <div>
              <label
                htmlFor="semester-select"
                className="block text-xs font-semibold text-[#111111] mb-1.5"
              >
                Semester Offering <span className="text-[#DC2626]">*</span>
              </label>
              <Controller
                name="semester"
                control={control}
                render={({ field }) => (
                  <select
                    id="semester-select"
                    {...field}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111111] focus-ring"
                  >
                    {course.offerings.map((off) => (
                      <option key={off.id} value={off.semester}>
                        {off.semester}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.semester && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.semester.message}</p>
              )}
            </div>

            {/* Section selector */}
            <div>
              <label
                htmlFor="section-select"
                className="block text-xs font-semibold text-[#111111] mb-1.5"
              >
                Course Section <span className="text-[#DC2626]">*</span>
              </label>
              <Controller
                name="section"
                control={control}
                render={({ field }) => (
                  <select
                    id="section-select"
                    {...field}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#111111] focus-ring"
                  >
                    {course.offerings.map((off) => (
                      <option key={off.id} value={off.section}>
                        {off.section} ({off.instructor})
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.section && (
                <p className="text-xs text-[#DC2626] mt-1">{errors.section.message}</p>
              )}
            </div>
          </div>
        </Card>

        {/* SECTION B: 5 Required Rating Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg text-[#111111]">
              Course Experience Evaluation
            </h2>
            <span className="text-xs text-[#6B7280]">All 5 categories required</span>
          </div>

          {/* 1. Teaching Quality */}
          <Controller
            name="teachingQuality"
            control={control}
            render={({ field }) => (
              <RatingControl
                id="rating-teaching-quality"
                label="1. Teaching Quality"
                description="Instructor preparedness, mastery of topic, and responsiveness to student questions."
                value={field.value}
                onChange={field.onChange}
                error={errors.teachingQuality?.message}
                required
              />
            )}
          />

          {/* 2. Concept Clarity */}
          <Controller
            name="conceptClarity"
            control={control}
            render={({ field }) => (
              <RatingControl
                id="rating-concept-clarity"
                label="2. Concept Clarity"
                description="Clarity of lecture explanations, syllabus structure, and logical flow of coursework."
                value={field.value}
                onChange={field.onChange}
                error={errors.conceptClarity?.message}
                required
              />
            )}
          />

          {/* 3. Assignment Quality */}
          <Controller
            name="assignmentQuality"
            control={control}
            render={({ field }) => (
              <RatingControl
                id="rating-assignment-quality"
                label="3. Assignment Quality"
                description="Relevance of homework, problem sets, projects, and fairness of evaluation rubrics."
                value={field.value}
                onChange={field.onChange}
                error={errors.assignmentQuality?.message}
                required
              />
            )}
          />

          {/* 4. Practical Sessions */}
          <Controller
            name="practicalSessions"
            control={control}
            render={({ field }) => (
              <RatingControl
                id="rating-practical-sessions"
                label="4. Practical Sessions & Labs"
                description="Hands-on coding, laboratory exercises, and teaching assistant support."
                value={field.value}
                onChange={field.onChange}
                error={errors.practicalSessions?.message}
                required
              />
            )}
          />

          {/* 5. Overall Satisfaction */}
          <Controller
            name="overallSatisfaction"
            control={control}
            render={({ field }) => (
              <RatingControl
                id="rating-overall-satisfaction"
                label="5. Overall Satisfaction"
                description="Your holistic evaluation of the course value and learning outcomes."
                value={field.value}
                onChange={field.onChange}
                error={errors.overallSatisfaction?.message}
                required
              />
            )}
          />
        </div>

        {/* SECTION C: Optional Comments */}
        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <CommentField
              id="feedback-comments"
              value={field.value || ''}
              onChange={field.onChange}
              error={errors.comments?.message}
              maxLength={500}
            />
          )}
        />

        {/* SECTION D: Privacy Notice Card */}
        <PrivacyNotice />

        {/* Developer Testing Bar for Error Simulation */}
        <div className="bg-gray-50 border border-dashed border-gray-300 p-3.5 rounded-xl flex items-center justify-between text-xs text-[#4B5563]">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-gray-500" />
            <span>
              <strong>Developer Mode:</strong> Simulate submission failure to test error state handling
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={simulateErrorToggle}
              onChange={(e) => setSimulateErrorToggle(e.target.checked)}
              className="rounded text-[#20C4EE] focus:ring-[#20C4EE]"
            />
            <span>Simulate Error</span>
          </label>
        </div>

        {/* SECTION E: Form Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5E7EB]">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Cancel & Return
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSubmitting ? 'Submitting Evaluation...' : 'Submit Feedback'}
          </Button>
        </div>
      </form>
    </div>
  )
}
