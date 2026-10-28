import type { Course } from '../types'

export const SAMPLE_COURSES: Course[] = [
  {
    id: 'cs-101',
    code: 'CS 101',
    title: 'Data Structures & Algorithms',
    department: 'Computer Science',
    credits: 4,
    description: 'Fundamental abstractions, asymptotic analysis, linear data structures, balanced trees, heaps, graphs, and classic algorithmic techniques.',
    offerings: [
      {
        id: 'cs-101-f25-a',
        semester: 'Fall 2025',
        section: 'Section A',
        instructor: 'Dr. Sarah Jenkins',
        responseCount: 48,
        overallRating: 4.7,
        categoryRatings: {
          teachingQuality: 4.8,
          conceptClarity: 4.7,
          assignmentQuality: 4.6,
          practicalSessions: 4.8,
          overallSatisfaction: 4.7,
        },
        ratingDistribution: {
          5: 35,
          4: 10,
          3: 2,
          2: 1,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Live coding demonstrations during lectures clarify tricky pointer logic.',
            'Weekly interactive problem-solving labs with dedicated teaching assistants.',
            'Detailed automated test benches for programming assignments.',
          ],
          improvements: [
            'Graph traversal problem sets felt somewhat condensed into the final two weeks.',
            'Would benefit from additional mid-semester benchmark practice quizzes.',
          ],
        },
      },
      {
        id: 'cs-101-f25-b',
        semester: 'Fall 2025',
        section: 'Section B',
        instructor: 'Prof. Marcus Vance',
        responseCount: 36,
        overallRating: 4.5,
        categoryRatings: {
          teachingQuality: 4.4,
          conceptClarity: 4.5,
          assignmentQuality: 4.6,
          practicalSessions: 4.3,
          overallSatisfaction: 4.5,
        },
        ratingDistribution: {
          5: 22,
          4: 11,
          3: 2,
          2: 1,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Thorough explanations of recurrence relations and recursion trees.',
            'Constructive code reviews during office hours.',
          ],
          improvements: [
            'Lab sessions could provide more scaffolded hints for beginners.',
          ],
        },
      },
      {
        id: 'cs-101-s26-a',
        semester: 'Spring 2026',
        section: 'Section A',
        instructor: 'Dr. Sarah Jenkins',
        responseCount: 24,
        overallRating: 4.6,
        categoryRatings: {
          teachingQuality: 4.7,
          conceptClarity: 4.6,
          assignmentQuality: 4.5,
          practicalSessions: 4.7,
          overallSatisfaction: 4.6,
        },
        ratingDistribution: {
          5: 16,
          4: 6,
          3: 2,
          2: 0,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Interactive algorithm visualizer tooling created for classroom use.',
            'Balanced workload across theoretical proofs and practical implementation.',
          ],
          improvements: [
            'More notice prior to complex dynamic programming assignment deadlines.',
          ],
        },
      },
    ],
  },
  {
    id: 'cs-204',
    code: 'CS 204',
    title: 'Database Management Systems',
    department: 'Computer Science',
    credits: 3,
    description: 'Relational data modeling, normalisation theory, complex SQL indexing, transaction ACID semantics, and database engine architectures.',
    offerings: [
      {
        id: 'cs-204-f25-a',
        semester: 'Fall 2025',
        section: 'Section A',
        instructor: 'Dr. Elena Rostova',
        responseCount: 32,
        overallRating: 4.4,
        categoryRatings: {
          teachingQuality: 4.5,
          conceptClarity: 4.4,
          assignmentQuality: 4.3,
          practicalSessions: 4.6,
          overallSatisfaction: 4.4,
        },
        ratingDistribution: {
          5: 18,
          4: 10,
          3: 3,
          2: 1,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Hands-on PostgreSQL query plan and indexing optimization workshops.',
            'Clear real-world schema design case studies from industry applications.',
          ],
          improvements: [
            'Concurrency control and lock escalation modules could use extra walkthroughs.',
          ],
        },
      },
      {
        id: 'cs-204-s26-a',
        semester: 'Spring 2026',
        section: 'Section A',
        instructor: 'Dr. Elena Rostova',
        responseCount: 20,
        overallRating: 4.5,
        categoryRatings: {
          teachingQuality: 4.6,
          conceptClarity: 4.5,
          assignmentQuality: 4.4,
          practicalSessions: 4.7,
          overallSatisfaction: 4.5,
        },
        ratingDistribution: {
          5: 12,
          4: 6,
          3: 2,
          2: 0,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Excellent guidance on building high-performance relational schemas.',
            'Collaborative final project with realistic enterprise data sets.',
          ],
          improvements: [
            'Earlier release of grading criteria for the milestone milestones.',
          ],
        },
      },
    ],
  },
  {
    id: 'cs-301',
    code: 'CS 301',
    title: 'Operating Systems',
    department: 'Computer Science',
    credits: 4,
    description: 'Kernel architectures, multi-threading, concurrency primitives, virtual memory management, file systems, and hardware virtualization.',
    offerings: [
      {
        id: 'cs-301-f25-a',
        semester: 'Fall 2025',
        section: 'Section A',
        instructor: 'Prof. David Chen',
        responseCount: 26,
        overallRating: 4.1,
        categoryRatings: {
          teachingQuality: 4.2,
          conceptClarity: 4.0,
          assignmentQuality: 4.3,
          practicalSessions: 4.1,
          overallSatisfaction: 4.1,
        },
        ratingDistribution: {
          5: 10,
          4: 10,
          3: 4,
          2: 2,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Rigorous deep-dive into POSIX systems programming and kernel mechanics.',
            'Inspiring lectures connecting OS theory to modern cloud hypervisors.',
          ],
          improvements: [
            'Steep learning curve in C concurrency projects without introductory refresher.',
            'Lab autograder turn-around times could be streamlined.',
          ],
        },
      },
      {
        id: 'cs-301-f25-b',
        semester: 'Fall 2025',
        section: 'Section B',
        instructor: 'Dr. Tariq Al-Mansoor',
        responseCount: 12,
        overallRating: 3.9,
        categoryRatings: {
          teachingQuality: 3.9,
          conceptClarity: 3.8,
          assignmentQuality: 4.0,
          practicalSessions: 3.9,
          overallSatisfaction: 3.9,
        },
        ratingDistribution: {
          5: 3,
          4: 5,
          3: 3,
          2: 1,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Thorough coverage of memory paging and translation lookaside buffers.',
          ],
          improvements: [
            'More structured discussion time for debugging deadlock assignments.',
          ],
        },
      },
    ],
  },
  {
    id: 'cs-305',
    code: 'CS 305',
    title: 'Computer Networks',
    department: 'Computer Science',
    credits: 3,
    description: 'Internet protocol stack, transport-layer congestion algorithms (TCP BBR/Cubic), packet routing, software-defined networks, and transport security.',
    offerings: [
      {
        id: 'cs-305-s26-a',
        semester: 'Spring 2026',
        section: 'Section A',
        instructor: 'Dr. Maya Patel',
        responseCount: 19,
        overallRating: 4.3,
        categoryRatings: {
          teachingQuality: 4.4,
          conceptClarity: 4.3,
          assignmentQuality: 4.2,
          practicalSessions: 4.5,
          overallSatisfaction: 4.3,
        },
        ratingDistribution: {
          5: 9,
          4: 7,
          3: 2,
          2: 1,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Wireshark packet capture labs provide tangible networking intuition.',
            'Crystal clear explanation of TLS handshakes and DNS security extensions.',
          ],
          improvements: [
            'Subnetting assignments could include more automated self-check drills.',
          ],
        },
      },
    ],
  },
  {
    id: 'ds-210',
    code: 'DS 210',
    title: 'Machine Learning Foundations',
    department: 'Data Science',
    credits: 4,
    description: 'Supervised and unsupervised learning, empirical loss minimization, neural network foundations, regularization, and model validation techniques.',
    offerings: [
      {
        id: 'ds-210-f25-a',
        semester: 'Fall 2025',
        section: 'Section A',
        instructor: 'Dr. Aris Thorne',
        responseCount: 28,
        overallRating: 4.8,
        categoryRatings: {
          teachingQuality: 4.9,
          conceptClarity: 4.8,
          assignmentQuality: 4.7,
          practicalSessions: 4.8,
          overallSatisfaction: 4.8,
        },
        ratingDistribution: {
          5: 23,
          4: 4,
          3: 1,
          2: 0,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Exceptional intuitive mathematical breakdowns of gradient descent.',
            'PyTorch notebooks with real-world computer vision and NLP benchmarks.',
          ],
          improvements: [
            'Additional compute resources for training capstone project models.',
          ],
        },
      },
      {
        // INTENTIONALLY ONLY 6 RESPONSES (< 10) TO DEMONSTRATE PRIVACY THRESHOLD SUPPRESSION!
        id: 'ds-210-s26-b',
        semester: 'Spring 2026',
        section: 'Section B',
        instructor: 'Prof. Chloe Martin',
        responseCount: 6, // Below threshold of 10
        overallRating: 4.2,
        categoryRatings: {
          teachingQuality: 4.3,
          conceptClarity: 4.2,
          assignmentQuality: 4.1,
          practicalSessions: 4.2,
          overallSatisfaction: 4.2,
        },
        ratingDistribution: {
          5: 3,
          4: 2,
          3: 1,
          2: 0,
          1: 0,
        },
        feedbackThemes: {
          strengths: ['Small group discussions on model bias.'],
          improvements: ['More time on matrix calculus foundations.'],
        },
      },
    ],
  },
  {
    id: 'se-402',
    code: 'SE 402',
    title: 'Cloud Computing Architecture',
    department: 'Software Engineering',
    credits: 3,
    description: 'Cloud native systems, distributed consensus, microservices communication, container orchestration with Kubernetes, and serverless architectures.',
    offerings: [
      {
        // INTENTIONALLY ZERO RESPONSES TO DEMONSTRATE EMPTY STATE / BE FIRST TO SUBMIT
        id: 'se-402-s26-a',
        semester: 'Spring 2026',
        section: 'Section A',
        instructor: 'Prof. Liam O’Connor',
        responseCount: 0,
        overallRating: 0,
        categoryRatings: {
          teachingQuality: 0,
          conceptClarity: 0,
          assignmentQuality: 0,
          practicalSessions: 0,
          overallSatisfaction: 0,
        },
        ratingDistribution: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
        feedbackThemes: {
          strengths: [],
          improvements: [],
        },
      },
    ],
  },
  {
    id: 'math-201',
    code: 'MATH 201',
    title: 'Discrete Mathematics',
    department: 'Mathematics',
    credits: 3,
    description: 'Propositional logic, set theory, combinatorics, proof by induction, relations, graph theory, and applications to computer algorithms.',
    offerings: [
      {
        id: 'math-201-f25-a',
        semester: 'Fall 2025',
        section: 'Section A',
        instructor: 'Dr. Rebecca Hughes',
        responseCount: 42,
        overallRating: 4.2,
        categoryRatings: {
          teachingQuality: 4.3,
          conceptClarity: 4.1,
          assignmentQuality: 4.2,
          practicalSessions: 3.9,
          overallSatisfaction: 4.2,
        },
        ratingDistribution: {
          5: 18,
          4: 16,
          3: 6,
          2: 2,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Careful step-by-step mathematical induction derivations on the board.',
            'Office hours were welcoming and cleared up ambiguity on proof writing.',
          ],
          improvements: [
            'Combinatorics module felt rushed before the midterm exam.',
          ],
        },
      },
      {
        id: 'math-201-s26-a',
        semester: 'Spring 2026',
        section: 'Section A',
        instructor: 'Dr. Rebecca Hughes',
        responseCount: 15,
        overallRating: 4.3,
        categoryRatings: {
          teachingQuality: 4.4,
          conceptClarity: 4.3,
          assignmentQuality: 4.2,
          practicalSessions: 4.0,
          overallSatisfaction: 4.3,
        },
        ratingDistribution: {
          5: 7,
          4: 6,
          3: 2,
          2: 0,
          1: 0,
        },
        feedbackThemes: {
          strengths: [
            'Interactive logic puzzles at the beginning of each module.',
          ],
          improvements: [
            'More practice problems with full solution keys for review.',
          ],
        },
      },
    ],
  },
]
