'use client';

import React from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';
import type { ProgressState } from '@/types/converter';

interface ConversionProgressProps {
  progress: ProgressState;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Building Your Protected PDF
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Processing 100% locally in your browser
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
            <span className="truncate pr-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
              {progress.statusText}
            </span>
            <span className="font-mono tabular-nums text-blue-600 dark:text-blue-400 font-bold">
              {progress.percentage}%
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300 ease-out dark:bg-blue-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 dark:border-slate-800">
          <span>Zero bytes uploaded to internet</span>
          <span className="font-mono tabular-nums">
            {progress.current} / {progress.total} items
          </span>
        </div>
      </div>
    </div>
  );
};
