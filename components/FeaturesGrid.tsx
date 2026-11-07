'use client';

import React from 'react';
import {
  ShieldAlert,
  FileCheck2,
  Maximize2,
  RotateCw,
  Gauge,
  WifiOff,
  Files,
  Cpu,
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      title: '100% Client-Side Privacy',
      desc: 'All conversion calculations happen within your browser memory. Your images are never transmitted over the internet, stored on a remote server, or logged.',
      icon: ShieldAlert,
    },
    {
      title: 'Universal Format Support',
      desc: 'Combine JPG, JPEG, PNG, and WebP images into a clean PDF file with zero server uploads or external plugins.',
      icon: Files,
    },
    {
      title: 'Precision Page Geometries',
      desc: 'Select standard ISO A4 and A3 formats, US Letter, US Legal, or choose "Fit to Image" to match the exact dimensions and aspect ratio of each photo.',
      icon: Maximize2,
    },
    {
      title: 'Independent Image Rotation',
      desc: 'Rotate individual images clockwise or counter-clockwise by 90-degree steps to rectify phone orientation flaws before compiling the document.',
      icon: RotateCw,
    },
    {
      title: 'Adaptive File Compression',
      desc: 'Choose between lossless output for maximum clarity, balanced compression for everyday sharing, or compact encoding for strict email attachments.',
      icon: Gauge,
    },
    {
      title: 'Installable PWA & Offline Defense',
      desc: 'Install IRON DOME on your desktop or mobile device. Run the full converter offline without needing an active internet connection.',
      icon: WifiOff,
    },
  ];

  return (
    <section id="features" className="border-t border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800/80 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
            Engine Capabilities
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white" style={{ textWrap: 'balance' }}>
            Built for Speed, Fidelity & Total Security
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            A standalone utility engineered to give you the formatting power of desktop publishing software with the simplicity of a web tool.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
