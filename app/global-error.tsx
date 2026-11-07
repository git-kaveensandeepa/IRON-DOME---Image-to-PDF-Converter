'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-center text-white">
        <div className="max-w-md">
          <h2 className="text-xl font-bold">Application Error</h2>
          <p className="mt-2 text-xs text-slate-400">
            An unexpected runtime error occurred.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
