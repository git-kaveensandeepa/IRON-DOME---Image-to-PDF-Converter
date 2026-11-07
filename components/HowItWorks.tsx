'use client';

import React from 'react';
import { Upload, Sliders, FileDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select or Paste Images',
      desc: 'Drag & drop multiple JPG, PNG, or WebP images, browse files from your device, or simply paste with Ctrl+V directly into the browser.',
      icon: Upload,
    },
    {
      num: '02',
      title: 'Rearrange & Customize',
      desc: 'Reorder pages, rotate individual photos, choose your paper format (A4, A3, Letter, or Fit to Image), set margins, and fine-tune output quality.',
      icon: Sliders,
    },
    {
      num: '03',
      title: 'Generate & Download',
      desc: 'Our client-side WebAssembly and Canvas engine compiles your PDF instantaneously. Download your single PDF document or export everything as a ZIP package.',
      icon: FileDown,
    },
  ];

  return (
    <section id="how-it-works" className="border-t border-slate-200/80 bg-white py-16 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
            Simple Workflow
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white" style={{ textWrap: 'balance' }}>
            How IRON DOME Converts Images to PDF
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            Three simple steps to generate publication-grade PDF documents without compromising your private photos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-slate-300 dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xl font-bold text-slate-300 dark:text-slate-700">
                    {step.num}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
