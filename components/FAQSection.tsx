'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'Are my images uploaded to any server?',
      a: 'No. IRON DOME processes 100% of your images locally in your browser using client-side JavaScript, HTML5 Canvas, and WebAssembly. Your photos and sensitive documents never leave your device or touch an external server.',
    },
    {
      q: 'Which image formats are supported?',
      a: 'IRON DOME supports JPG, JPEG, PNG, and WEBP formats with no artificial limits on image dimensions or quantity.',
    },
    {
      q: 'Can I reorder or rotate images before creating the PDF?',
      a: 'Yes! You can rotate individual images by 90-degree increments, reorder them via drag-and-drop or position buttons, and sort alphabetically or by size before generating your PDF.',
    },
    {
      q: 'Which PDF page sizes and orientations can I choose?',
      a: 'You can choose between ISO A4, ISO A3, US Letter, US Legal, or "Fit to Image" which dynamically formats each PDF page to match the exact dimensions of your original photo. Both Portrait and Landscape modes are supported.',
    },
    {
      q: 'Does IRON DOME work offline?',
      a: 'Yes. IRON DOME is engineered as a Progressive Web App (PWA). Once loaded in your browser or installed to your home screen or desktop, all image parsing and PDF generation features function completely offline.',
    },
    {
      q: 'Is there a limit on how many images I can convert at once?',
      a: 'There is no artificial server limit or paywall. The only constraint is your computer or mobile device available RAM memory. You can freely convert dozens or hundreds of images in a single batch.',
    },
  ];

  return (
    <section id="faq" className="border-t border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800/80 dark:bg-slate-900/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
            Answers & Clarifications
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white" style={{ textWrap: 'balance' }}>
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about secure client-side Image to PDF conversion.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-slate-200/90 bg-white transition-colors dark:border-slate-800/90 dark:bg-slate-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pt-3 pb-4 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
