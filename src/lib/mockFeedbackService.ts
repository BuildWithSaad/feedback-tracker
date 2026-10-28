import type { Course, FeedbackSubmission } from '../types'
import { SAMPLE_COURSES } from '../data/sampleData'

const STORAGE_KEY_COURSES = 'feedback_tracker_courses'
const STORAGE_KEY_SUBMISSIONS = 'feedback_tracker_submissions'

class MockFeedbackService {
  private courses: Course[] = []
  private submissions: FeedbackSubmission[] = []

  constructor() {
    this.init()
  }

  private init() {
    try {
      const storedCourses = localStorage.getItem(STORAGE_KEY_COURSES)
      if (storedCourses) {
        this.courses = JSON.parse(storedCourses)
      } else {
        this.courses = JSON.parse(JSON.stringify(SAMPLE_COURSES))
      }

      const storedSubmissions = localStorage.getItem(STORAGE_KEY_SUBMISSIONS)
      if (storedSubmissions) {
        this.submissions = JSON.parse(storedSubmissions)
      }
    } catch {
      this.courses = JSON.parse(JSON.stringify(SAMPLE_COURSES))
      this.submissions = []
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(this.courses))
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(this.submissions))
    } catch (e) {
      console.warn('Unable to persist to localStorage:', e)
    }
  }

  public getCourses(): Course[] {
    return this.courses
  }

  public getCourseById(courseId: string): Course | undefined {
    return this.courses.find(
      (c) => c.id.toLowerCase() === courseId.toLowerCase() || c.code.toLowerCase().replace(/\s+/g, '-') === courseId.toLowerCase()
    )
  }

  /**
   * Simulates asynchronous feedback submission with controllable failure path
   */
  public async submitFeedback(
    data: Omit<FeedbackSubmission, 'id' | 'submittedAt'>,
    simulateError: boolean = false
  ): Promise<FeedbackSubmission> {
    // Artificial latency to demonstrate loading state
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (simulateError) {
      throw new Error('Your feedback could not be submitted. Simulated server communication error.')
    }

    const newSubmission: FeedbackSubmission = {
      ...data,
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      submittedAt: new Date().toISOString(),
    }

    this.submissions.push(newSubmission)

    // Dynamically update course offerings so insights update in real-time
    const targetCourse = this.courses.find((c) => c.id === data.courseId)
    if (targetCourse) {
      let targetOffering = targetCourse.offerings.find(
        (o) => o.semester === data.semester && o.section === data.section
      )

      if (!targetOffering && targetCourse.offerings.length > 0) {
        // Fallback to first offering if exact match not found
        targetOffering = targetCourse.offerings[0]
      }

      if (targetOffering) {
        const prevCount = targetOffering.responseCount
        const newCount = prevCount + 1
        targetOffering.responseCount = newCount

        // Update category ratings
        const ratings = data.ratings
        targetOffering.categoryRatings = {
          teachingQuality: Number(
            ((targetOffering.categoryRatings.teachingQuality * prevCount + ratings.teachingQuality) / newCount).toFixed(1)
          ),
          conceptClarity: Number(
            ((targetOffering.categoryRatings.conceptClarity * prevCount + ratings.conceptClarity) / newCount).toFixed(1)
          ),
          assignmentQuality: Number(
            ((targetOffering.categoryRatings.assignmentQuality * prevCount + ratings.assignmentQuality) / newCount).toFixed(1)
          ),
          practicalSessions: Number(
            ((targetOffering.categoryRatings.practicalSessions * prevCount + ratings.practicalSessions) / newCount).toFixed(1)
          ),
          overallSatisfaction: Number(
            ((targetOffering.categoryRatings.overallSatisfaction * prevCount + ratings.overallSatisfaction) / newCount).toFixed(1)
          ),
        }

        // Overall rating average
        const submissionAverage =
          (ratings.teachingQuality +
            ratings.conceptClarity +
            ratings.assignmentQuality +
            ratings.practicalSessions +
            ratings.overallSatisfaction) /
          5

        targetOffering.overallRating = Number(
          ((targetOffering.overallRating * prevCount + submissionAverage) / newCount).toFixed(1)
        )

        // Increment distribution bucket for satisfaction
        const satRating = ratings.overallSatisfaction as 1 | 2 | 3 | 4 | 5
        if (targetOffering.ratingDistribution[satRating] !== undefined) {
          targetOffering.ratingDistribution[satRating] += 1
        }
      }
    }

    this.persist()
    return newSubmission
  }

  public getSubmissions(): FeedbackSubmission[] {
    return this.submissions
  }

  public resetToDefaults() {
    this.courses = JSON.parse(JSON.stringify(SAMPLE_COURSES))
    this.submissions = []
    try {
      localStorage.removeItem(STORAGE_KEY_COURSES)
      localStorage.removeItem(STORAGE_KEY_SUBMISSIONS)
    } catch {}
  }
}

export const mockFeedbackService = new MockFeedbackService()
