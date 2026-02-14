import type { CourseWithGrade, GPAResult, GradeLetter, GradePoint } from '@/lib/types';

/**
 * Grade letter to grade point mapping
 */
export const GRADE_MAPPING: Record<GradeLetter, GradePoint> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0,
  'I': 0.0, // Incomplete
};

/**
 * Convert grade letter to grade point
 */
export function gradeLetterToPoint(gradeLetter: GradeLetter): GradePoint {
  return GRADE_MAPPING[gradeLetter];
}

/**
 * Calculate GPA from courses with grades
 * @param courses - Array of courses with grade points
 * @returns GPA result object
 */
export function calculateGPA(courses: CourseWithGrade[]): GPAResult {
  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach((course) => {
    if (course.grade !== undefined && course.grade !== null) {
      totalGradePoints += course.grade * course.credits;
      totalCredits += course.credits;
    }
  });

  const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  const isDeansList = gpa > 3.80;

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    totalGradePoints,
    isDeansList,
  };
}

/**
 * Check if student qualifies for Dean's List
 * @param gpa - Calculated GPA value
 * @returns boolean
 */
export function isDeansList(gpa: number): boolean {
  return gpa > 3.80;
}

/**
 * Get all available grade options
 */
export function getGradeOptions(): Array<{ label: GradeLetter; value: GradePoint }> {
  return [
    { label: 'A+', value: 4.0 },
    { label: 'A', value: 4.0 },
    { label: 'A-', value: 3.7 },
    { label: 'B+', value: 3.3 },
    { label: 'B', value: 3.0 },
    { label: 'B-', value: 2.7 },
    { label: 'C+', value: 2.3 },
    { label: 'C', value: 2.0 },
    { label: 'C-', value: 1.7 },
    { label: 'D+', value: 1.3 },
    { label: 'D', value: 1.0 },
    { label: 'F', value: 0.0 },
    { label: 'I', value: 0.0 },
  ];
}
