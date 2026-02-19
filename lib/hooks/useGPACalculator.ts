'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CourseWithGrade, GradeLetter } from '@/lib/types';
import { calculateGPA, gradeLetterToPoint } from '@/lib/utils/gpa-calculator';
import { CURRICULUM, getCourses, getAllCoursesForYear } from '@/lib/constants/curriculum';

export type GPAMode = 'syllabus' | 'manual';

const STORAGE_KEY = 'uom-bit-gpa:state:v1';

interface SyllabusResults {
  [year: string]: {
    [semester: string]: {
      [courseCode: string]: GradeLetter;
    };
  } | {
    [courseCode: string]: GradeLetter; // Year 3
  };
}

interface ManualResults {
  [courseId: string]: {
    code: string;
    name: string;
    credits: number;
    grade: GradeLetter;
  };
}

interface GPACalculatorResults {
  syllabus: SyllabusResults;
  manual: ManualResults;
}

export interface SGPAResult {
  semester: string;
  gpa: number;
  credits: number;
}

export interface CGPAResult {
  cgpa: number;
  totalCredits: number;
  sgpaResults: SGPAResult[];
  standing: string;
}

interface PersistedState {
  mode: GPAMode;
  results: GPACalculatorResults;
}

interface UseGPACalculatorReturn {
  mode: GPAMode;
  setMode: (mode: GPAMode) => void;
  results: GPACalculatorResults;
  
  // Syllabus mode methods
  setSyllabusGrade: (year: number, semester: number | null, courseCode: string, grade: GradeLetter) => void;
  getSyllabusGrade: (year: number, semester: number | null, courseCode: string) => GradeLetter | undefined;
  
  // Manual mode methods
  addManualCourse: (course: { code: string; name: string; credits: number; grade: GradeLetter }) => void;
  updateManualCourse: (courseId: string, updates: Partial<ManualResults[string]>) => void;
  removeManualCourse: (courseId: string) => void;
  
  // Calculation methods
  calculateSGPA: (year: number, semester: number) => number | null;
  calculateCGPA: () => CGPAResult;
  
  // Reset
  resetResults: () => void;
}

/**
 * Custom hook for dual-mode GPA calculation
 * Supports both Syllabus Mode (pre-defined courses) and Manual Mode (custom courses)
 */
export function useGPACalculator(): UseGPACalculatorReturn {
  const readPersisted = useCallback((): PersistedState | null => {
    try {
      const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      const obj = parsed as Partial<PersistedState>;
      if (obj.mode !== 'syllabus' && obj.mode !== 'manual') return null;
      if (!obj.results || typeof obj.results !== 'object') return null;
      return {
        mode: obj.mode,
        results: obj.results as GPACalculatorResults,
      };
    } catch {
      return null;
    }
  }, []);

  const [mode, setMode] = useState<GPAMode>(() => readPersisted()?.mode ?? 'syllabus');
  const [results, setResults] = useState<GPACalculatorResults>(() => {
    const persisted = readPersisted();
    return (
      persisted?.results ?? {
        syllabus: {},
        manual: {},
      }
    );
  });

  useEffect(() => {
    try {
      const payload: PersistedState = { mode, results };
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota / private mode errors
    }
  }, [mode, results]);

  // Set grade for syllabus mode
  const setSyllabusGrade = useCallback(
    (year: number, semester: number | null, courseCode: string, grade: GradeLetter) => {
      setResults((prev) => {
        const newResults = { ...prev };
        
        if (year === 3) {
          // Year 3 has no semesters
          if (!newResults.syllabus['3']) {
            newResults.syllabus['3'] = {};
          }
          (newResults.syllabus['3'] as Record<string, GradeLetter>)[courseCode] = grade;
        } else {
          // Year 1 and 2 have semesters
          if (!newResults.syllabus[year.toString()]) {
            newResults.syllabus[year.toString()] = {};
          }
          const yearData = newResults.syllabus[year.toString()] as Record<string, Record<string, GradeLetter>>;
          if (semester !== null) {
            if (!yearData[semester.toString()]) {
              yearData[semester.toString()] = {};
            }
            yearData[semester.toString()][courseCode] = grade;
          }
        }
        
        return newResults;
      });
    },
    []
  );

  // Get grade for syllabus mode
  const getSyllabusGrade = useCallback(
    (year: number, semester: number | null, courseCode: string): GradeLetter | undefined => {
      if (year === 3) {
        const year3Data = results.syllabus['3'] as Record<string, GradeLetter> | undefined;
        return year3Data?.[courseCode];
      } else {
        const yearData = results.syllabus[year.toString()] as Record<string, Record<string, GradeLetter>> | undefined;
        if (semester !== null && yearData) {
          return yearData[semester.toString()]?.[courseCode];
        }
      }
      return undefined;
    },
    [results]
  );

  // Add manual course
  const addManualCourse = useCallback(
    (course: { code: string; name: string; credits: number; grade: GradeLetter }) => {
      const courseId = `${course.code}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setResults((prev) => ({
        ...prev,
        manual: {
          ...prev.manual,
          [courseId]: course,
        },
      }));
    },
    []
  );

  // Update manual course
  const updateManualCourse = useCallback((courseId: string, updates: Partial<ManualResults[string]>) => {
    setResults((prev) => ({
      ...prev,
      manual: {
        ...prev.manual,
        [courseId]: {
          ...prev.manual[courseId],
          ...updates,
        },
      },
    }));
  }, []);

  // Remove manual course
  const removeManualCourse = useCallback((courseId: string) => {
    setResults((prev) => {
      const { [courseId]: removed, ...rest } = prev.manual;
      return {
        ...prev,
        manual: rest,
      };
    });
  }, []);

  // Calculate SGPA for a specific semester
  const calculateSGPA = useCallback(
    (year: number, semester: number): number | null => {
      const courses = getCourses(year, semester);
      if (courses.length === 0) return null;

      const grades = courses
        .map((course) => {
          const gradeLetter = getSyllabusGrade(year, semester, course.code);
          if (!gradeLetter) return null;
          return {
            ...course,
            id: `${year}-${semester}-${course.code}`,
            grade: gradeLetterToPoint(gradeLetter),
            gradeLetter,
          } as CourseWithGrade;
        })
        .filter((course): course is CourseWithGrade => course !== null);

      if (grades.length === 0) return null;

      const result = calculateGPA(grades);
      return result.gpa;
    },
    [getSyllabusGrade]
  );

  // Calculate CGPA (overall)
  const calculateCGPA = useCallback((): CGPAResult => {
    const allCoursesWithGrades: CourseWithGrade[] = [];
    const sgpaResults: SGPAResult[] = [];

    // Process syllabus mode courses
    Object.entries(results.syllabus).forEach(([yearStr, yearData]) => {
      const year = parseInt(yearStr, 10);
      
      if (year === 3) {
        // Year 3: no semesters
        const year3Data = yearData as Record<string, GradeLetter>;
        const courses = getAllCoursesForYear(3);
        
        courses.forEach((course) => {
          const gradeLetter = year3Data[course.code];
          if (gradeLetter) {
            allCoursesWithGrades.push({
              ...course,
              id: course.code,
              grade: gradeLetterToPoint(gradeLetter),
              gradeLetter,
            });
          }
        });
      } else {
        // Year 1 and 2: process by semester
        const yearDataTyped = yearData as Record<string, Record<string, GradeLetter>>;
        
        Object.entries(yearDataTyped).forEach(([semStr, semesterGrades]) => {
          const semester = parseInt(semStr, 10);
          const courses = getCourses(year, semester);
          
          const semesterCourses: CourseWithGrade[] = [];
          courses.forEach((course) => {
            const gradeLetter = semesterGrades[course.code];
            if (gradeLetter) {
              const courseWithGrade: CourseWithGrade = {
                ...course,
                id: `${year}-${semester}-${course.code}`,
                grade: gradeLetterToPoint(gradeLetter),
                gradeLetter,
              };
              semesterCourses.push(courseWithGrade);
              allCoursesWithGrades.push(courseWithGrade);
            }
          });

          // Calculate SGPA for this semester
          if (semesterCourses.length > 0) {
            const sgpa = calculateGPA(semesterCourses);
            sgpaResults.push({
              semester: `Year ${year} - Semester ${semester}`,
              gpa: sgpa.gpa,
              credits: sgpa.totalCredits,
            });
          }
        });
      }
    });

    // Process manual mode courses
    Object.values(results.manual).forEach((course) => {
      allCoursesWithGrades.push({
        code: course.code,
        name: course.name,
        credits: course.credits,
        id: course.code,
        grade: gradeLetterToPoint(course.grade),
        gradeLetter: course.grade,
      });
    });

    // Calculate overall CGPA
    const cgpaResult = calculateGPA(allCoursesWithGrades);
    
    // Determine standing
    let standing = 'Pass';
    if (cgpaResult.gpa >= 3.7) {
      standing = 'First Class';
    } else if (cgpaResult.gpa >= 3.3) {
      standing = 'Second Class (Upper Division)';
    } else if (cgpaResult.gpa >= 3.0) {
      standing = 'Second Class (Lower Division)';
    } else if (cgpaResult.gpa >= 2.0) {
      standing = 'General Pass';
    }

    return {
      cgpa: cgpaResult.gpa,
      totalCredits: cgpaResult.totalCredits,
      sgpaResults,
      standing,
    };
  }, [results]);

  // Reset all results
  const resetResults = useCallback(() => {
    setResults({
      syllabus: {},
      manual: {},
    });
    setMode('syllabus');
    try {
      globalThis.localStorage?.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    mode,
    setMode,
    results,
    setSyllabusGrade,
    getSyllabusGrade,
    addManualCourse,
    updateManualCourse,
    removeManualCourse,
    calculateSGPA,
    calculateCGPA,
    resetResults,
  };
}
