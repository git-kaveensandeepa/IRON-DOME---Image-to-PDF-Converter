'use client';

import React from 'react';
import { Shield, Lock, Globe, Heart } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/use-online-status';

export const Footer: React.FC = () => {
  const isOnline = useOnlineStatus();

  const regions = [
    'United States',
    'India',
    'Germany',
    'Australia',
    'United Kingdom',
    'France',
    'Japan',
    'South Korea',
    'Denmark',
    'Finland',
    'Hong Kong',
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-500 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1: Brand Wordmark & Security */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                IRON DOME
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              The privacy-first Image to PDF utility. 100% client-side WebAssembly, Canvas, and pdf-lib engine ensuring zero server uploads, total confidentiality, and instant offline reliability.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero telemetry · Zero data retention · Free forever</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#converter" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Image Converter
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Features & Sizing
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Comparison
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Common Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Global Accessibility & Supported Formats */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-slate-900 uppercase dark:text-slate-200">
              Global Access
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Optimized for international performance across {regions.length}+ regions including:
            </p>
            <div className="flex flex-wrap gap-1 text-[11px] text-slate-600 dark:text-slate-300">
              {regions.map((region, idx) => (
                <span key={region}>
                  {region}
                  {idx < regions.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-[11px] sm:flex-row dark:border-slate-800/80">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} IRON DOME · Handcrafted by Kaveen Sandeepa. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="/sitemap.txt" className="hover:text-blue-600 dark:hover:text-blue-400">
              sitemap.txt
            </a>
            <span aria-hidden="true">·</span>
            <a href="/ads.txt" className="hover:text-blue-600 dark:hover:text-blue-400">
              ads.txt
            </a>
            <span aria-hidden="true">·</span>
            <a href="/humans.txt" className="hover:text-blue-600 dark:hover:text-blue-400">
              humans.txt
            </a>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 font-medium" suppressHydrationWarning>
              <span
                className={`h-2 w-2 rounded-full ${
                  isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                }`}
              />
              {isOnline ? 'System Online (In-Browser)' : 'Offline Mode Active'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
