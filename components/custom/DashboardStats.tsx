'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CGPAResult } from '@/lib/hooks/useGPACalculator';

interface DashboardStatsProps {
  cgpaResult: CGPAResult;
  isDeansList: boolean;
}

export function DashboardStats({ cgpaResult, isDeansList }: DashboardStatsProps) {
  const { cgpa, totalCredits, standing, sgpaResults } = cgpaResult;

  return (
    <div className="space-y-4">
      {/* Main CGPA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-2 bg-linear-to-br from-primary/5 via-background to-muted/20 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">CGPA</CardTitle>
                <CardDescription>Overall Grade Point Average</CardDescription>
              </div>
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              key={cgpa}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-baseline gap-3"
            >
              <span className="text-5xl font-bold tracking-tight">{cgpa.toFixed(2)}</span>
              {isDeansList && (
                <Badge variant="default" className="text-sm">
                  <Award className="mr-1 h-4 w-4" />
                  Dean&apos;s List
                </Badge>
              )}
            </motion.div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="secondary" className="text-sm font-semibold">
                {standing}
              </Badge>
            </div>
            {isDeansList && (
              <p className="mt-3 text-sm text-muted-foreground">
                🎉 Congratulations! You qualify for the Dean&apos;s List (GPA &gt; 3.80)
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border bg-linear-to-br from-background to-muted/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Credits
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{totalCredits}</div>
              <p className="mt-2 text-xs text-muted-foreground">Credits completed</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border bg-linear-to-br from-background to-muted/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Courses Completed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">
                {sgpaResults.length > 0
                  ? sgpaResults.reduce((sum, sgpa) => sum + Math.ceil(sgpa.credits / 3), 0)
                  : 0}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Courses with grades</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* SGPA Results */}
      {sgpaResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Semester GPAs (SGPA)</CardTitle>
              <CardDescription>Individual semester performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sgpaResults.map((sgpa, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                  >
                    <span className="text-sm font-medium">{sgpa.semester}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {sgpa.credits} credits
                      </span>
                      <Badge variant="outline" className="font-semibold">
                        {sgpa.gpa.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
