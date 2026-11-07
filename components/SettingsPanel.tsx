'use client';

import React from 'react';
import {
  FileText,
  Layout,
  Maximize,
  SlidersHorizontal,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import type {
  ConversionOptions,
  PageSizeOption,
  OrientationOption,
  MarginOption,
  FitModeOption,
  QualityOption,
} from '@/types/converter';

interface SettingsPanelProps {
  options: ConversionOptions;
  onChange: (options: ConversionOptions) => void;
  imageCount: number;
  onConvert: () => void;
  isConverting: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  options,
  onChange,
  imageCount,
  onConvert,
  isConverting,
}) => {
  const updateOption = <K extends keyof ConversionOptions>(
    key: K,
    value: ConversionOptions[K]
  ) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            PDF Conversion Settings
          </h2>
        </div>
        <span className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {imageCount} {imageCount === 1 ? 'page' : 'pages'}
        </span>
      </div>

      {/* 1. Page Size Selection */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Page Format
        </label>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
          {(
            [
              { id: 'a4', label: 'A4', sub: '210×297mm' },
              { id: 'letter', label: 'US Letter', sub: '8.5×11in' },
              { id: 'fit', label: 'Fit to Image', sub: 'Adaptive' },
              { id: 'a3', label: 'A3', sub: '297×420mm' },
              { id: 'legal', label: 'US Legal', sub: '8.5×14in' },
            ] as const
          ).map((item) => {
            const isSelected = options.pageSize === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateOption('pageSize', item.id as PageSizeOption)}
                className={`flex flex-col items-center justify-center rounded-lg border px-2 py-2 text-center transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-xs font-semibold">{item.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Orientation (Disabled if 'fit' is chosen, since fit matches image aspect) */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Orientation
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'auto', label: 'Auto Detect', desc: 'Per image aspect' },
              { id: 'portrait', label: 'Portrait', desc: 'Vertical' },
              { id: 'landscape', label: 'Landscape', desc: 'Horizontal' },
            ] as const
          ).map((item) => {
            const isSelected = options.orientation === item.id;
            const isDisabled = options.pageSize === 'fit';
            return (
              <button
                key={item.id}
                type="button"
                disabled={isDisabled}
                onClick={() => updateOption('orientation', item.id as OrientationOption)}
                className={`flex flex-col items-center justify-center rounded-lg border px-2.5 py-1.5 text-center transition-all ${
                  isDisabled
                    ? 'cursor-not-allowed opacity-40'
                    : isSelected
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                }`}
              >
                <span className="text-xs font-semibold">{item.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Page Margins */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Page Margins
          </label>
          {options.margin === 'custom' && (
            <span className="font-mono text-xs text-blue-600 dark:text-blue-400">
              {options.customMarginMm} mm
            </span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {(
            [
              { id: 'none', label: 'None (0mm)' },
              { id: 'small', label: 'Small (10mm)' },
              { id: 'medium', label: 'Medium (20mm)' },
              { id: 'large', label: 'Large (30mm)' },
            ] as const
          ).map((item) => {
            const isSelected = options.margin === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => updateOption('margin', item.id as MarginOption)}
                className={`rounded-lg border px-2 py-1.5 text-center text-xs font-medium transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 dark:border-blue-500 dark:bg-blue-950/40 dark:text-blue-100'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Image Fit & Quality Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Fit Mode */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Image Scaling
          </label>
          <select
            value={options.fitMode}
            disabled={options.pageSize === 'fit'}
            onChange={(e) => updateOption('fitMode', e.target.value as FitModeOption)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 transition-colors focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="contain">Contain (preserve aspect ratio)</option>
            <option value="fill">Fill (stretch to full margins)</option>
            <option value="original">Original (1:1 pixel scale)</option>
          </select>
        </div>

        {/* Compression / Quality */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Output Quality
          </label>
          <select
            value={options.quality}
            onChange={(e) => updateOption('quality', e.target.value as QualityOption)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 transition-colors focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="high">High Quality (Lossless/Crisp 95%)</option>
            <option value="balanced">Balanced (Optimal 82%)</option>
            <option value="low">Low File Size (Fast / Email 65%)</option>
          </select>
        </div>
      </div>

      {/* 5. Document Metadata & Page Numbers */}
      <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800/80 dark:bg-slate-950/40">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Document Properties
          </span>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={options.addPageNumbers}
              onChange={(e) => updateOption('addPageNumbers', e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Add page numbers (&quot;Page X of Y&quot;)
            </span>

          </label>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Output Filename
            </label>
            <input
              type="text"
              value={options.filename}
              onChange={(e) => updateOption('filename', e.target.value)}
              placeholder="IronDome_Document.pdf"
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Document Title
            </label>
            <input
              type="text"
              value={options.docTitle}
              onChange={(e) => updateOption('docTitle', e.target.value)}
              placeholder="e.g. Scanned Receipts"
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Convert Primary Button */}
      <button
        type="button"
        disabled={imageCount === 0 || isConverting}
        onClick={onConvert}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99]"
      >
        <FileText className="h-4 w-4" />
        <span>
          {isConverting
            ? 'Generating PDF...'
            : `Convert ${imageCount} ${imageCount === 1 ? 'Image' : 'Images'} to PDF`}
        </span>
      </button>
    </div>
  );
};
