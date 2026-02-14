'use client';

import { useState, useCallback, useMemo } from 'react';
import type { CourseWithGrade, GPASummary, GradePoint, GradeLetter } from '@/lib/types';
import { calculateGPA, gradeLetterToPoint } from '@/lib/utils/gpa-calculator';

interface UseGPAReturn {
  courses: CourseWithGrade[];
  gpaSummary: GPASummary;
  addCourse: (course: Omit<CourseWithGrade, 'id'>) => void;
  removeCourse: (id: string) => void;
  updateCourseGrade: (id: string, gradeLetter: GradeLetter) => void;
  updateCourse: (id: string, updates: Partial<CourseWithGrade>) => void;
  resetCourses: () => void;
}

/**
 * Custom hook for managing GPA calculations
 */
export function useGPA(initialCourses: CourseWithGrade[] = []): UseGPAReturn {
  const [courses, setCourses] = useState<CourseWithGrade[]>(initialCourses);

  // Calculate GPA summary
  const gpaSummary = useMemo<GPASummary>(() => {
    const result = calculateGPA(courses);
    return {
      gpa: result.gpa,
      totalCredits: result.totalCredits,
      totalCourses: courses.length,
      isDeansList: result.isDeansList,
    };
  }, [courses]);

  // Add a new course
  const addCourse = useCallback((course: Omit<CourseWithGrade, 'id'>) => {
    const newCourse: CourseWithGrade = {
      ...course,
      id: `${course.code}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCourses((prev) => [...prev, newCourse]);
  }, []);

  // Remove a course
  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  }, []);

  // Update course grade
  const updateCourseGrade = useCallback((id: string, gradeLetter: GradeLetter) => {
    const gradePoint = gradeLetterToPoint(gradeLetter);
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? { ...course, grade: gradePoint, gradeLetter }
          : course
      )
    );
  }, []);

  // Update course details
  const updateCourse = useCallback((id: string, updates: Partial<CourseWithGrade>) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...updates } : course
      )
    );
  }, []);

  // Reset all courses
  const resetCourses = useCallback(() => {
    setCourses([]);
  }, []);

  return {
    courses,
    gpaSummary,
    addCourse,
    removeCourse,
    updateCourseGrade,
    updateCourse,
    resetCourses,
  };
}
