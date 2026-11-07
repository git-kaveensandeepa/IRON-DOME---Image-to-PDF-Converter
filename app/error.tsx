'use client';

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950 dark:text-white">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        Try Again
      </button>
    </div>
  );
}
