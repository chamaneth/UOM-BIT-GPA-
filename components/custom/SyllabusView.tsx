'use client';

import { BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getYearData } from '@/lib/constants/curriculum';
import { getGradeOptions } from '@/lib/utils/gpa-calculator';
import type { GradeLetter } from '@/lib/types';
import type { useGPACalculator } from '@/lib/hooks/useGPACalculator';

interface SyllabusViewProps {
  getSyllabusGrade: (year: number, semester: number | null, courseCode: string) => GradeLetter | undefined;
  setSyllabusGrade: (year: number, semester: number | null, courseCode: string, grade: GradeLetter) => void;
}

export function SyllabusView({ getSyllabusGrade, setSyllabusGrade }: SyllabusViewProps) {
  const gradeOptions = getGradeOptions();
  const years = [1, 2, 3];

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {years.map((year) => {
          const yearData = getYearData(year);
          if (!yearData) return null;

          return (
            <AccordionItem key={year} value={`year-${year}`}>
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Year {year}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {year === 3 ? (
                    // Year 3: Single list (no semesters)
                    <Card>
                      <CardHeader>
                        <CardTitle>Year 3 Courses</CardTitle>
                        <CardDescription>Select grades for each course</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          {yearData.semesters[0]?.courses.map((course) => (
                            <div key={course.code} className="space-y-2">
                              <Label className="text-sm font-medium">
                                {course.code} - {course.name} ({course.credits} credits)
                              </Label>
                              <Select
                                value={getSyllabusGrade(year, null, course.code) || ''}
                                onValueChange={(value) =>
                                  setSyllabusGrade(year, null, course.code, value as GradeLetter)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Grade" />
                                </SelectTrigger>
                                <SelectContent>
                                  {gradeOptions.map((option) => (
                                    <SelectItem key={option.label} value={option.label}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // Year 1 and 2: Show semesters
                    yearData.semesters.map((semester) => (
                      <Card key={semester.semester}>
                        <CardHeader>
                          <CardTitle>Semester {semester.semester}</CardTitle>
                          <CardDescription>
                            {semester.courses.length} courses
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            {semester.courses.map((course) => (
                              <div key={course.code} className="space-y-2">
                                <Label className="text-sm font-medium">
                                  {course.code} - {course.name} ({course.credits} credits)
                                </Label>
                                <Select
                                  value={getSyllabusGrade(year, semester.semester, course.code) || ''}
                                  onValueChange={(value) =>
                                    setSyllabusGrade(year, semester.semester, course.code, value as GradeLetter)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Grade" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {gradeOptions.map((option) => (
                                      <SelectItem key={option.label} value={option.label}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
