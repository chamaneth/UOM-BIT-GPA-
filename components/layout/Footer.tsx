'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { 
  ChevronDown, 
  // Eye 
} from 'lucide-react';

export function Footer() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('version 2');
  // const [viewerCount, setViewerCount] = useState<string | number>('0');
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  // useEffect(() => {
  //   const counterKey = 'gpa-calculator-bit-uom';
  //   const url = `https://api.countapi.xyz/hit/${counterKey}/views`;
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   (async () => {
  //     try {
  //       const res = await fetch(url, { signal });
  //       if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
  //       const data = await res.json();
  //       if (data && typeof data.value !== 'undefined') {
  //         setViewerCount(data.value);
  //       } else {
  //         setViewerCount('N/A');
  //       }
  //     } catch (err) {
  //       // Avoid noisy console errors in production; show debug info only during development
  //       if (process.env.NODE_ENV === 'development') {
  //         console.debug('Error fetching visitor count:', err);
  //       }
  //       setViewerCount('N/A');
  //     }
  //   })();

  //   // Abort fetch on unmount
  //   return () => controller.abort();
  // }, []);

  return (
    <footer className="mt-12 border-t bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/40">
      <div className="container mx-auto px-4 md:px-6 py-6 text-sm text-slate-500">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className='pb-4 md:hidden'>
            <Link
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
              href="/pomodoro"
              target="_blank"
              rel="noreferrer"
            >
              Pomodoro Timer
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              Developed by{' '}
              <Link
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white underline underline-offset-4"
                href="https://github.com/yasiruviyara"
                target="_blank"
                rel="noreferrer"
              >
                Yasiru Viyara
              </Link>{' '}
              &{' '}
              <Link
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white underline underline-offset-4"
                href="https://github.com/chamaneth"
                target="_blank"
                rel="noreferrer"
              >
                Chamathka Nethmini
              </Link>
            </div>
            <div className='mt-2'>
              © 2026. Academic curriculum data provided by University of Moratuwa.{' '}
              <Link
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white underline underline-offset-4"
                href="https://bit.uom.lk"
                target="_blank"
                rel="noreferrer"
              >
                CODL
              </Link>
            </div>
          </div>

          {/* Right Side: Version Dropdown */}
          <div className="flex md:flex-col items-end justify-end md:justify-between gap-4" ref={menuRef}>
            <Link
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer hidden md:block"
              href="/pomodoro"
              target="_blank"
              rel="noreferrer"
            >
              Pomodoro Timer
            </Link>

            <div className="relative flex gap-2 items-center">
              {/* <div>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span id="viewerCount" className="font-medium">{viewerCount}</span>
                </div>
              </div> */}
              <Button
                name="version"
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center rounded-full border px-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                <span className="mr-1">{selected}</span>
                <ChevronDown className={open ? 'rotate-180' : ''} />
              </Button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-popover text-popover-foreground shadow-lg ring-1 ring-black/5">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/v1"
                        className="block px-4 py-2 text-sm hover:bg-muted/20"
                        onClick={() => {
                          setSelected('version 1');
                          setOpen(false);
                        }}
                      >
                        version 1
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm hover:bg-muted/20"
                        onClick={(e) => {
                          e.preventDefault();
                          // stay on current site; select version 2
                          setSelected('version 2');
                          setOpen(false);
                        }}
                      >
                        version 2
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}