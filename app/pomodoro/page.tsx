'use client';

import { Header } from '@/components/layout/Header';
import { useGPACalculator } from '@/lib/hooks/useGPACalculator';
import React, { useEffect, useRef, useState } from 'react'

export default function PomodoroPage() {
    const {
        mode,
        setMode,
      } = useGPACalculator();

  // session lengths (minutes)
  const STUDY_MIN = 25;
  const BREAK_MIN = 5;

  // time left in seconds for the current session
  const [timeLeft, setTimeLeft] = useState<number>(STUDY_MIN * 60);
  const [isStudyTime, setIsStudyTime] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [totalStudySeconds, setTotalStudySeconds] = useState<number>(0);
  const [clock, setClock] = useState<string>('');

  // refs to hold mutable values for the interval closure
  const isStudyRef = useRef<boolean>(isStudyTime);
  const intervalRef = useRef<number | null>(null);

  // keep ref in sync with state
  useEffect(() => { isStudyRef.current = isStudyTime; }, [isStudyTime]);

  // clock (top-right) - Optimized for SSR/CSR consistency
  useEffect(() => {
    const updateTime = () => setClock(new Date().toLocaleTimeString());
    updateTime(); 
    const id = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(id);
  }, []);

  // main timer loop - Performance Optimized
  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            // session finished -> switch modes
            const nextIsStudy = !isStudyRef.current;
            if (isStudyRef.current) {
              setSessionCount(s => s + 1);
            }
            setIsStudyTime(nextIsStudy);
            return (nextIsStudy ? STUDY_MIN : BREAK_MIN) * 60;
          }

          // if in study mode, accumulate total study seconds
          if (isStudyRef.current) {
            setTotalStudySeconds(t => t + 1);
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    } else {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  // helpers
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function formatHMS(total: number) {
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function handleStart() {
    if (!running) setRunning(true);
  }

  function handleReset() {
    setRunning(false);
    setIsStudyTime(true);
    setTimeLeft(STUDY_MIN * 60);
    setSessionCount(0);
    setTotalStudySeconds(0);
  }

  return (
    <div className="bg-linear-to-br from-background via-background to-muted/20">
      <Header mode={mode} onModeChange={setMode} />

      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
        <section className="relative w-full mx-auto max-w-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] border border-border rounded-2xl shadow-2xl p-8 text-center text-foreground">
          <div className="absolute right-6 top-6 text-sm text-muted-foreground">{clock}</div>

          <div className="text-4xl mb-1">⏱️</div>
          <h1 id="pomTitle" className="text-lg font-semibold mb-2 text-foreground">Pomodoro Study Timer</h1>

          <div className="text-6xl font-extrabold my-4 text-foreground">{String(minutes).padStart(2,'0')}:{String(seconds).padStart(2,'0')}</div>
          <p className="text-sm text-muted-foreground mb-4">{isStudyTime ? 'Study Time' : 'Break Time'}</p>

          <div className="flex gap-3 justify-center mb-4" role="group" aria-label="Timer controls">
            <button
              onClick={handleStart}
              disabled={running}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg font-bold text-sm border bg-background shadow-xs hover:bg-muted transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="text-sm text-muted-foreground">
            <div className="mb-1">Pomodoros completed: <span className="font-medium text-foreground">{sessionCount}</span></div>
            <div>Total Study Time: <span className="font-medium text-foreground">{formatHMS(totalStudySeconds)}</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}