export interface CategoryRatings {
  teachingQuality: number
  conceptClarity: number
  assignmentQuality: number
  practicalSessions: number
  overallSatisfaction: number
}

export interface RatingDistribution {
  1: number
  2: number
  3: number
  4: number
  5: number
}

export interface FeedbackThemes {
  strengths: string[]
  improvements: string[]
}

export interface CourseOffering {
  id: string
  semester: string // e.g., "Fall 2025", "Spring 2026"
  section: string // e.g., "Section A", "Section B"
  instructor: string
  responseCount: number
  categoryRatings: CategoryRatings
  overallRating: number
  ratingDistribution: RatingDistribution
  feedbackThemes: FeedbackThemes
}

export interface Course {
  id: string
  code: string // e.g., "CS 101"
  title: string // e.g., "Data Structures & Algorithms"
  department: string // e.g., "Computer Science"
  description: string
  credits: number
  offerings: CourseOffering[]
}

export interface AggregateInsights {
  courseId: string
  courseCode: string
  courseTitle: string
  department: string
  selectedSemester: string
  selectedSection: string
  totalResponses: number
  isSuppressed: boolean // True when totalResponses < 10 (privacy threshold)
  overallRating: number
  categoryRatings: CategoryRatings
  ratingDistribution: RatingDistribution
  feedbackThemes: FeedbackThemes
  availableSemesters: string[]
  availableSections: string[]
}

export interface FeedbackSubmission {
  id: string
  courseId: string
  semester: string
  section: string
  ratings: {
    teachingQuality: number
    conceptClarity: number
    assignmentQuality: number
    practicalSessions: number
    overallSatisfaction: number
  }
  comments?: string
  submittedAt: string
}

export type SortOption = 'rating-desc' | 'responses-desc' | 'code-asc' | 'title-asc'
