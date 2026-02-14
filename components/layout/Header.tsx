'use client';

import { Calculator } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { GPAMode } from '@/lib/hooks/useGPACalculator';
import Link from 'next/link';

interface HeaderProps {
  mode: GPAMode;
  onModeChange: (mode: GPAMode) => void;
}

export function Header({ mode, onModeChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <div className="flex flex-col truncate">
            <h1 className="text-sm sm:text-lg font-semibold tracking-tight truncate">
              <span className="sm:hidden">BIT GPA</span>
              <span className="hidden sm:inline">UOM BIT GPA Calculator</span>
            </h1>
            <p className="hidden sm:block text-[10px] sm:text-xs text-muted-foreground truncate">
              Calculate your GPA easily
            </p>
          </div>
        </Link>
        
        {/* Mode Toggle */}
        <Tabs value={mode} onValueChange={(value) => onModeChange(value as GPAMode)}>
          <TabsList>
            <TabsTrigger value="syllabus">Syllabus Mode</TabsTrigger>
            <TabsTrigger value="manual">Manual Mode</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
