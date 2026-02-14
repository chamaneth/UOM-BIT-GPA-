// Grade point value type
export type GradePoint = 4.0 | 3.7 | 3.3 | 3.0 | 2.7 | 2.3 | 2.0 | 1.7 | 1.3 | 1.0 | 0.0;

// Grade letter type
export type GradeLetter = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F' | 'I';

// Course definition
export interface Course {
  code: string;
  name: string;
  credits: number;
}

// Course with selected grade
export interface CourseWithGrade extends Course {
  id: string;
  grade?: GradePoint;
  gradeLetter?: GradeLetter;
}

// GPA calculation result
export interface GPAResult {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
  isDeansList: boolean;
}

// GPA Summary for display
export interface GPASummary {
  gpa: number;
  totalCredits: number;
  totalCourses: number;
  isDeansList: boolean;
}

// Grade mapping
export interface GradeMapping {
  letter: GradeLetter;
  point: GradePoint;
}
