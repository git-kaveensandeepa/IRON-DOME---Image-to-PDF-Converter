'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Moon, Sun, Download, Smartphone } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { usePWAInstall } from '@/hooks/use-pwa-install';

interface HeaderProps {
  onScrollToConverter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToConverter }) => {
  const { isDark, toggleTheme, mounted } = useTheme();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90 dark:text-white"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-sm shadow-blue-500/20">
              <Shield className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                IRON DOME
              </span>
              <span className="text-[10px] font-medium tracking-wider text-blue-600 uppercase dark:text-blue-400">
                Image to PDF
              </span>
            </div>
          </Link>


          {/* Zone 2: Navigation Links (single-line, clean text links) */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
            <a
              href="#converter"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Converter
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#privacy"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Privacy & Defense
            </a>
            <a
              href="#faq"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* PWA Install Button (Chromium / Desktop) */}
            {isInstallable && !isInstalled && (
              <button
                type="button"
                onClick={install}
                className="hidden items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                title="Install IRON DOME App"
              >
                <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Install App</span>
              </button>
            )}

            {/* iOS Safari PWA Prompt */}
            {isIOS && !isInstalled && (
              <button
                type="button"
                onClick={() => setShowIOSModal(true)}
                className="hidden items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 sm:inline-flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Smartphone className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Add to Home</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              suppressHydrationWarning
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >

              {mounted && isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={
                onScrollToConverter ||
                (() => {
                  document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
                })
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Convert Images
            </button>
          </div>
        </div>
      </header>

      {/* iOS Install Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Install IRON DOME on iPhone / iPad
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Enjoy 100% offline, lightning-fast Image to PDF conversion directly from your Home Screen:
            </p>
            <ol className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  1
                </span>
                <span>Tap the <strong>Share</strong> button in Safari&apos;s bottom toolbar.</span>

              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  2
                </span>
                <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  3
                </span>
                <span>Tap <strong>Add</strong> in the top right corner.</span>
              </li>
            </ol>
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
