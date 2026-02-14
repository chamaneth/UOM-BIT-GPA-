'use client';

import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CourseWithGrade, GradeLetter } from '@/lib/types';
import { getGradeOptions } from '@/lib/utils/gpa-calculator';

interface CourseRowProps {
  course: CourseWithGrade;
  onUpdate: (id: string, updates: Partial<CourseWithGrade>) => void;
  onGradeChange: (id: string, gradeLetter: GradeLetter) => void;
  onDelete: (id: string) => void;
}

export function CourseRow({ course, onUpdate, onGradeChange, onDelete }: CourseRowProps) {
  const gradeOptions = getGradeOptions();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 gap-4 rounded-lg border bg-background/50 p-4 backdrop-blur-sm md:grid-cols-12 md:items-center"
    >
      {/* Course Code */}
      <div className="md:col-span-2">
        <Label htmlFor={`code-${course.id}`} className="text-xs text-muted-foreground">
          Code
        </Label>
        <Input
          id={`code-${course.id}`}
          value={course.code}
          onChange={(e) => onUpdate(course.id, { code: e.target.value })}
          placeholder="ITE 1913"
          className="mt-1"
        />
      </div>

      {/* Course Name */}
      <div className="md:col-span-5">
        <Label htmlFor={`name-${course.id}`} className="text-xs text-muted-foreground">
          Course Name
        </Label>
        <Input
          id={`name-${course.id}`}
          value={course.name}
          onChange={(e) => onUpdate(course.id, { name: e.target.value })}
          placeholder="Communication Skills Development"
          className="mt-1"
        />
      </div>

      {/* Credits */}
      <div className="md:col-span-2">
        <Label htmlFor={`credits-${course.id}`} className="text-xs text-muted-foreground">
          Credits
        </Label>
        <Input
          id={`credits-${course.id}`}
          type="number"
          min="0"
          max="10"
          value={course.credits}
          onChange={(e) => onUpdate(course.id, { credits: Number(e.target.value) || 0 })}
          placeholder="2"
          className="mt-1"
        />
      </div>

      {/* Grade */}
      <div className="md:col-span-2">
        <Label htmlFor={`grade-${course.id}`} className="text-xs text-muted-foreground">
          Grade
        </Label>
        <Select
          value={course.gradeLetter || ''}
          onValueChange={(value) => onGradeChange(course.id, value as GradeLetter)}
        >
          <SelectTrigger id={`grade-${course.id}`} className="mt-1">
            <SelectValue placeholder="Select" />
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

      {/* Delete Button */}
      <div className="md:col-span-1 flex items-end md:items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(course.id)}
          className="h-9 w-9 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
