'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SyllabusView } from '@/components/custom/SyllabusView';
import { ManualView } from '@/components/custom/ManualView';
import { DashboardStats } from '@/components/custom/DashboardStats';
import { useGPACalculator } from '@/lib/hooks/useGPACalculator';

export default function Home() {
  const {
    mode,
    setMode,
    results,
    setSyllabusGrade,
    getSyllabusGrade,
    addManualCourse,
    updateManualCourse,
    removeManualCourse,
    resetResults,
    calculateCGPA,
  } = useGPACalculator();

  // Calculate CGPA
  const cgpaResult = useMemo(() => calculateCGPA(), [calculateCGPA]);
  const isDeansList = cgpaResult.cgpa > 3.80;

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/20">
      <Header mode={mode} onModeChange={setMode} />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  {mode === 'syllabus' ? 'Syllabus Mode' : 'Manual Mode'}
                </h2>
                <div className="mt-2 flex items-center gap-4">
                  <p className="text-muted-foreground flex-1">
                  {mode === 'syllabus'
                    ? 'Select grades for pre-defined UOM BIT courses'
                    : 'Add custom courses and calculate your GPA'}
                  </p>
                  <button
                    type="button"
                    onClick={() => resetResults()}
                    className="rounded-md border px-3 py-1 text-sm bg-background hover:bg-accent hover:text-accent-foreground"
                  >
                    Clear
                  </button>
                </div>
              </motion.div>

              {/* Content based on mode */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'syllabus' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'syllabus' ? -20 : 20 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'syllabus' ? (
                  <SyllabusView
                    getSyllabusGrade={getSyllabusGrade}
                    setSyllabusGrade={setSyllabusGrade}
                  />
                ) : (
                  <ManualView
                    courses={results.manual}
                    onAddCourse={addManualCourse}
                    onUpdateCourse={updateManualCourse}
                    onRemoveCourse={removeManualCourse}
                  />
                )}
              </motion.div>
            </div>

            {/* Dashboard Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-24"
              >
                <DashboardStats cgpaResult={cgpaResult} isDeansList={isDeansList} />
              </motion.div>
            </div>
          </div>

          {/* Grade Scale Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="rounded-lg border bg-muted/30 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold">Grade Scale</h3>
              <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                <div>A+ / A = 4.0</div>
                <div>A- = 3.7</div>
                <div>B+ = 3.3</div>
                <div>B = 3.0</div>
                <div>B- = 2.7</div>
                <div>C+ = 2.3</div>
                <div>C = 2.0</div>
                <div>C- = 1.7</div>
                <div>D+ = 1.3</div>
                <div>D = 1.0</div>
                <div>F = 0.0</div>
                <div>I = 0.0 (Incomplete)</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
