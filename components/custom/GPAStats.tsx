'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GPASummary } from '@/lib/types';

interface GPAStatsProps {
  summary: GPASummary;
}

export function GPAStats({ summary }: GPAStatsProps) {
  const { gpa, totalCredits, totalCourses, isDeansList } = summary;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* GPA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                GPA
              </CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              key={gpa}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-4xl font-bold tracking-tight">{gpa.toFixed(2)}</span>
              {isDeansList && (
                <Badge variant="default" className="ml-2">
                  <Award className="mr-1 h-3 w-3" />
                  Dean's List
                </Badge>
              )}
            </motion.div>
            {isDeansList && (
              <p className="mt-2 text-xs text-muted-foreground">
                Congratulations! You are on the Dean's List.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Credits Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Credits
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight">{totalCredits}</div>
            <p className="mt-2 text-xs text-muted-foreground">Credits completed</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Total Courses Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tracking-tight">{totalCourses}</div>
            <p className="mt-2 text-xs text-muted-foreground">Courses added</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
