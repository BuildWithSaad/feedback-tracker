import { z } from 'zod'

export const feedbackFormSchema = z.object({
  courseId: z.string().min(1, 'Please select a valid course.'),
  semester: z.string().min(1, 'Please select a semester offering.'),
  section: z.string().min(1, 'Please select a course section.'),
  teachingQuality: z
    .number({
      message: 'Please select a rating for teaching quality.',
    })
    .min(1, 'Please select a rating for teaching quality.')
    .max(5),
  conceptClarity: z
    .number({
      message: 'Please select a rating for concept clarity.',
    })
    .min(1, 'Please select a rating for concept clarity.')
    .max(5),
  assignmentQuality: z
    .number({
      message: 'Please select a rating for assignment quality.',
    })
    .min(1, 'Please select a rating for assignment quality.')
    .max(5),
  practicalSessions: z
    .number({
      message: 'Please select a rating for practical sessions.',
    })
    .min(1, 'Please select a rating for practical sessions.')
    .max(5),
  overallSatisfaction: z
    .number({
      message: 'Please select a rating for overall satisfaction.',
    })
    .min(1, 'Please select a rating for overall satisfaction.')
    .max(5),
  comments: z
    .string()
    .max(500, 'Comments cannot exceed 500 characters.')
    .optional()
    .or(z.literal('')),
})

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>
