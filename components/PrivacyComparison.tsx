'use client';

import React from 'react';
import { Check, X, Shield, Server, Lock } from 'lucide-react';

export const PrivacyComparison: React.FC = () => {
  const comparisons = [
    {
      feature: 'Image Processing Location',
      ironDome: 'Your Device Browser (RAM)',
      traditional: 'Uploaded to Remote Web Servers',
      isIronDomeBetter: true,
    },
    {
      feature: 'Network Data Transmission',
      ironDome: '0 KB transmitted over wire',
      traditional: 'Full file payload transmitted',
      isIronDomeBetter: true,
    },
    {
      feature: 'Server-Side Retention Risk',
      ironDome: 'Impossible (no server storage)',
      traditional: 'Retained 1–24 hours on disk',
      isIronDomeBetter: true,
    },
    {
      feature: 'Works 100% Offline (PWA)',
      ironDome: 'Yes, full conversion engine offline',
      traditional: 'No, fails without active internet',
      isIronDomeBetter: true,
    },
    {
      feature: 'File Size & Page Limits',
      ironDome: 'Limited only by device memory',
      traditional: 'Strict paywalls & queue caps',
      isIronDomeBetter: true,
    },
    {
      feature: 'Account / Sign-in Required',
      ironDome: 'Never required',
      traditional: 'Often required for batch jobs',
      isIronDomeBetter: true,
    },
  ];

  return (
    <section id="privacy" className="border-t border-slate-200/80 bg-white py-16 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
            Privacy Defense Matrix
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white" style={{ textWrap: 'balance' }}>
            Why In-Browser Processing Protects Your Data
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            Most web converters upload your tax documents, contracts, and private photos to third-party cloud instances. IRON DOME processes everything inside your local browser sandbox.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-xs dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Security Dimension</th>
                  <th className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-4 w-4" />
                      IRON DOME (Local-First)
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Server className="h-4 w-4" />
                      Traditional Cloud Converters
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {comparisons.map((row) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30"
                  >
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 font-medium text-blue-700 dark:text-blue-300">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{row.ironDome}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
