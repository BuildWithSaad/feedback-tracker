import type { Course, AggregateInsights, CategoryRatings, RatingDistribution } from '../types'

export const MIN_RESPONSES_THRESHOLD = 10

/**
 * Computes overall course statistics across all offerings for high-level cards
 */
export function getCourseOverviewStats(course: Course) {
  const totalResponses = course.offerings.reduce((sum, off) => sum + off.responseCount, 0)
  
  if (totalResponses === 0) {
    return {
      totalResponses: 0,
      overallRating: 0,
      isSuppressed: false,
      offeringCount: course.offerings.length,
    }
  }

  // Calculate weighted overall rating
  const weightedSum = course.offerings.reduce(
    (sum, off) => sum + off.overallRating * off.responseCount,
    0
  )
  const overallRating = Number((weightedSum / totalResponses).toFixed(1))

  return {
    totalResponses,
    overallRating,
    isSuppressed: totalResponses < MIN_RESPONSES_THRESHOLD,
    offeringCount: course.offerings.length,
  }
}

/**
 * Calculates aggregate insights for a course based on semester and section filters.
 * Applies the critical differential privacy threshold:
 * If responses are strictly between 1 and 9 (< 10), data is suppressed to protect anonymity.
 */
export function calculateAggregateInsights(
  course: Course,
  semesterFilter: string = 'all',
  sectionFilter: string = 'all'
): AggregateInsights {
  const availableSemesters = Array.from(new Set(course.offerings.map((o) => o.semester)))
  const availableSections = Array.from(new Set(course.offerings.map((o) => o.section)))

  // Filter offerings
  const filteredOfferings = course.offerings.filter((offering) => {
    const matchSemester = semesterFilter === 'all' || offering.semester === semesterFilter
    const matchSection = sectionFilter === 'all' || offering.section === sectionFilter
    return matchSemester && matchSection
  })

  const totalResponses = filteredOfferings.reduce((sum, off) => sum + off.responseCount, 0)
  const isSuppressed = totalResponses > 0 && totalResponses < MIN_RESPONSES_THRESHOLD

  // If zero responses or suppressed, return clean zeroed / masked representation
  if (totalResponses === 0 || isSuppressed) {
    const emptyRatings: CategoryRatings = {
      teachingQuality: 0,
      conceptClarity: 0,
      assignmentQuality: 0,
      practicalSessions: 0,
      overallSatisfaction: 0,
    }

    const emptyDistribution: RatingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    }

    return {
      courseId: course.id,
      courseCode: course.code,
      courseTitle: course.title,
      department: course.department,
      selectedSemester: semesterFilter,
      selectedSection: sectionFilter,
      totalResponses,
      isSuppressed,
      overallRating: 0,
      categoryRatings: emptyRatings,
      ratingDistribution: emptyDistribution,
      feedbackThemes: { strengths: [], improvements: [] },
      availableSemesters,
      availableSections,
    }
  }

  // Calculate weighted category ratings
  const weightedOverall = filteredOfferings.reduce(
    (sum, off) => sum + off.overallRating * off.responseCount,
    0
  )
  const overallRating = Number((weightedOverall / totalResponses).toFixed(1))

  const aggregateCategoryRatings: CategoryRatings = {
    teachingQuality: Number(
      (
        filteredOfferings.reduce(
          (sum, off) => sum + off.categoryRatings.teachingQuality * off.responseCount,
          0
        ) / totalResponses
      ).toFixed(1)
    ),
    conceptClarity: Number(
      (
        filteredOfferings.reduce(
          (sum, off) => sum + off.categoryRatings.conceptClarity * off.responseCount,
          0
        ) / totalResponses
      ).toFixed(1)
    ),
    assignmentQuality: Number(
      (
        filteredOfferings.reduce(
          (sum, off) => sum + off.categoryRatings.assignmentQuality * off.responseCount,
          0
        ) / totalResponses
      ).toFixed(1)
    ),
    practicalSessions: Number(
      (
        filteredOfferings.reduce(
          (sum, off) => sum + off.categoryRatings.practicalSessions * off.responseCount,
          0
        ) / totalResponses
      ).toFixed(1)
    ),
    overallSatisfaction: Number(
      (
        filteredOfferings.reduce(
          (sum, off) => sum + off.categoryRatings.overallSatisfaction * off.responseCount,
          0
        ) / totalResponses
      ).toFixed(1)
    ),
  }

  // Sum rating distributions
  const aggregateDistribution: RatingDistribution = {
    1: filteredOfferings.reduce((sum, off) => sum + off.ratingDistribution[1], 0),
    2: filteredOfferings.reduce((sum, off) => sum + off.ratingDistribution[2], 0),
    3: filteredOfferings.reduce((sum, off) => sum + off.ratingDistribution[3], 0),
    4: filteredOfferings.reduce((sum, off) => sum + off.ratingDistribution[4], 0),
    5: filteredOfferings.reduce((sum, off) => sum + off.ratingDistribution[5], 0),
  }

  // Extract unique themes
  const uniqueStrengths = Array.from(
    new Set(filteredOfferings.flatMap((off) => off.feedbackThemes.strengths))
  )
  const uniqueImprovements = Array.from(
    new Set(filteredOfferings.flatMap((off) => off.feedbackThemes.improvements))
  )

  return {
    courseId: course.id,
    courseCode: course.code,
    courseTitle: course.title,
    department: course.department,
    selectedSemester: semesterFilter,
    selectedSection: sectionFilter,
    totalResponses,
    isSuppressed: false,
    overallRating,
    categoryRatings: aggregateCategoryRatings,
    ratingDistribution: aggregateDistribution,
    feedbackThemes: {
      strengths: uniqueStrengths,
      improvements: uniqueImprovements,
    },
    availableSemesters,
    availableSections,
  }
}

/**
 * Filter and sort course collection
 */
export function filterAndSortCourses(
  courses: Course[],
  searchQuery: string,
  departmentFilter: string,
  semesterFilter: string,
  sortBy: string
): Course[] {
  const query = searchQuery.trim().toLowerCase()

  return courses
    .filter((course) => {
      // Search filter: course code, title, or department
      const matchesSearch =
        !query ||
        course.code.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.department.toLowerCase().includes(query)

      // Department filter
      const matchesDept =
        departmentFilter === 'all' || course.department === departmentFilter

      // Semester filter
      const matchesSemester =
        semesterFilter === 'all' ||
        course.offerings.some((offering) => offering.semester === semesterFilter)

      return matchesSearch && matchesDept && matchesSemester
    })
    .sort((a, b) => {
      const statsA = getCourseOverviewStats(a)
      const statsB = getCourseOverviewStats(b)

      switch (sortBy) {
        case 'rating-desc':
          return statsB.overallRating - statsA.overallRating
        case 'responses-desc':
          return statsB.totalResponses - statsA.totalResponses
        case 'code-asc':
          return a.code.localeCompare(b.code)
        case 'title-asc':
          return a.title.localeCompare(b.title)
        default:
          return statsB.totalResponses - statsA.totalResponses
      }
    })
}
