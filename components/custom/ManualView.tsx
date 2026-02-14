'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getGradeOptions } from '@/lib/utils/gpa-calculator';
import type { GradeLetter } from '@/lib/types';

interface ManualCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: GradeLetter;
}

interface ManualViewProps {
  courses: Record<string, { code: string; name: string; credits: number; grade: GradeLetter }>;
  onAddCourse: (course: { code: string; name: string; credits: number; grade: GradeLetter }) => void;
  onUpdateCourse: (courseId: string, updates: Partial<ManualCourse>) => void;
  onRemoveCourse: (courseId: string) => void;
}

export function ManualView({
  courses,
  onAddCourse,
  onUpdateCourse,
  onRemoveCourse,
}: ManualViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: 0,
    grade: '' as GradeLetter | '',
  });

  const gradeOptions = getGradeOptions();
  const courseList = Object.entries(courses);

  const handleAdd = () => {
    if (newCourse.code && newCourse.name && newCourse.credits > 0 && newCourse.grade) {
      onAddCourse({
        code: newCourse.code,
        name: newCourse.name,
        credits: newCourse.credits,
        grade: newCourse.grade,
      });
      setNewCourse({ code: '', name: '', credits: 0, grade: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Course Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant={showAddForm ? 'outline' : 'default'}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? 'Cancel' : 'Add Course'}
        </Button>
      </div>

      {/* Add Course Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-2 bg-muted/30">
              <CardHeader>
                <CardTitle>Add New Course</CardTitle>
                <CardDescription>Enter course details and grade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input
                      id="code"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      placeholder="ITE 1913"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="0"
                      max="10"
                      value={newCourse.credits || ''}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, credits: Number(e.target.value) || 0 })
                      }
                      placeholder="2"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input
                      id="name"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      placeholder="Communication Skills Development"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select
                      value={newCourse.grade}
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, grade: value as GradeLetter })
                      }
                    >
                      <SelectTrigger id="grade">
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
                  <div className="md:col-span-2">
                    <Button onClick={handleAdd} className="w-full" disabled={!newCourse.code || !newCourse.name || newCourse.credits === 0 || !newCourse.grade}>
                      Add Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Courses List */}
      {courseList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No courses added yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Click &quot;Add Course&quot; to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {courseList.map(([courseId, course]) => (
              <motion.div
                key={courseId}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                      <div className="md:col-span-2">
                        <Label className="text-xs text-muted-foreground">Code</Label>
                        <Input
                          value={course.code}
                          onChange={(e) =>
                            onUpdateCourse(courseId, { code: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <Input
                          value={course.name}
                          onChange={(e) =>
                            onUpdateCourse(courseId, { name: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs text-muted-foreground">Credits</Label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          value={course.credits}
                          onChange={(e) =>
                            onUpdateCourse(courseId, { credits: Number(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs text-muted-foreground">Grade</Label>
                        <Select
                          value={course.grade}
                          onValueChange={(value) =>
                            onUpdateCourse(courseId, { grade: value as GradeLetter })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
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
                      <div className="md:col-span-1 flex items-end md:items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveCourse(courseId)}
                          className="h-9 w-9 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
