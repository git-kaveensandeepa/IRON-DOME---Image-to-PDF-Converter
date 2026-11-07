'use client';

import React from 'react';
import { ShieldCheck, Zap, Lock, Sliders, ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-linear-to-b from-slate-100/70 via-white to-slate-50/40 py-12 sm:py-16 dark:border-slate-800/60 dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950">
      {/* Subtle background precision grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status and Security Guarantees */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <Lock className="h-3.5 w-3.5" />
            100% Local In-Browser Processing
          </span>
          <span aria-hidden="true">·</span>
          <span>Zero Server Uploads</span>
          <span aria-hidden="true">·</span>
          <span>JPG, PNG, WEBP</span>
          <span aria-hidden="true">·</span>
          <span>Unlimited Free</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white" style={{ textWrap: 'balance' }}>
          Convert Images to PDF with Maximum Defense & Privacy
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300" style={{ textWrap: 'balance' }}>
          Turn your photos and scans into clean, publication-ready PDF documents without ever uploading them to an external server. Your sensitive files stay securely on your device.
        </p>

        {/* Feature Highlights Grid */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white/80 p-3 text-center shadow-xs backdrop-blur-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Strict Privacy</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Never leaves browser</span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white/80 p-3 text-center shadow-xs backdrop-blur-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <Zap className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Instant Speed</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero network latency</span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white/80 p-3 text-center shadow-xs backdrop-blur-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <Sliders className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Full Control</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">A4, A3, Letter, Fit</span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white/80 p-3 text-center shadow-xs backdrop-blur-xs dark:border-slate-800/80 dark:bg-slate-900/60">
            <Lock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="mt-1 text-xs font-semibold text-slate-900 dark:text-white">Offline Ready</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">PWA installable</span>
          </div>
        </div>

        {/* Direct CTA */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onStartClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98]"
          >
            <span>Start Converting Images</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
