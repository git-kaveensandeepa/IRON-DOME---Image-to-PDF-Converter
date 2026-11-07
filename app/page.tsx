'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCw,
  Trash2,
  ArrowUpDown,
  SortAsc,
  Plus,
  FileCheck2,
  AlertCircle,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Dropzone } from '@/components/Dropzone';
import { ImageItemCard } from '@/components/ImageItemCard';
import { SettingsPanel } from '@/components/SettingsPanel';
import { ConversionProgress } from '@/components/ConversionProgress';
import { ResultModal } from '@/components/ResultModal';
import { ImageViewerModal } from '@/components/ImageViewerModal';
import { AdSlot } from '@/components/AdSlot';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { PrivacyComparison } from '@/components/PrivacyComparison';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { convertImagesToPdf } from '@/lib/pdf-converter';
import type {
  ImageFileItem,
  ConversionOptions,
  ConversionResult,
  ProgressState,
} from '@/types/converter';

export default function HomePage() {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [zoomedItem, setZoomedItem] = useState<ImageFileItem | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const [progress, setProgress] = useState<ProgressState>({
    isConverting: false,
    current: 0,
    total: 0,
    statusText: '',
    percentage: 0,
  });

  const [options, setOptions] = useState<ConversionOptions>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'small',
    customMarginMm: 10,
    fitMode: 'contain',
    quality: 'high',
    docTitle: 'IRON DOME Export',
    author: '',
    subject: '',
    addPageNumbers: false,
    filename: 'IronDome_Images.pdf',
  });

  const converterRef = useRef<HTMLDivElement>(null);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add images to state
  const handleImagesAdded = useCallback((newItems: ImageFileItem[]) => {
    setItems((prev) => [...prev, ...newItems]);
    setConversionError(null);
  }, []);

  // Rotate individual image clockwise
  const handleRotateCw = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rotation: (item.rotation + 90) % 360 }
          : item
      )
    );
    if (zoomedItem && zoomedItem.id === id) {
      setZoomedItem((prev) =>
        prev ? { ...prev, rotation: (prev.rotation + 90) % 360 } : null
      );
    }
  };

  // Rotate individual image counter-clockwise
  const handleRotateCcw = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rotation: (item.rotation + 270) % 360 }
          : item
      )
    );
    if (zoomedItem && zoomedItem.id === id) {
      setZoomedItem((prev) =>
        prev ? { ...prev, rotation: (prev.rotation + 270) % 360 } : null
      );
    }
  };

  // Rotate ALL images clockwise
  const handleRotateAllCw = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        rotation: (item.rotation + 90) % 360,
      }))
    );
  };

  // Move image earlier in order
  const handleMoveLeft = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  // Move image later in order
  const handleMoveRight = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  // Remove individual image
  const handleRemove = (id: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  // Clear all images
  const handleClearAll = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
    setConversionError(null);
  };

  // Sort alphabetically
  const handleSortAlpha = () => {
    setItems((prev) =>
      [...prev].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    );
  };

  // Sort by file size
  const handleSortSize = () => {
    setItems((prev) => [...prev].sort((a, b) => b.size - a.size));
  };

  // Reverse list order
  const handleReverseOrder = () => {
    setItems((prev) => [...prev].reverse());
  };

  // Run conversion
  const handleConvert = async () => {
    if (items.length === 0) return;
    setConversionError(null);

    try {
      const conversionResult = await convertImagesToPdf(
        items,
        options,
        (prog) => setProgress(prog)
      );
      setResult(conversionResult);
    } catch (err: unknown) {
      console.error('Conversion failed:', err);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setConversionError(`PDF creation failed: ${msg}`);
      setProgress((prev) => ({ ...prev, isConverting: false }));
    }
  };

  const handleReset = () => {
    setResult(null);
    handleClearAll();
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* 1. Header with Top Bar Contract */}
      <Header onScrollToConverter={scrollToConverter} />

      {/* 2. Hero Section */}
      <Hero onStartClick={scrollToConverter} />

      {/* 3. Top Advertisement Slot */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot slotType="horizontal" />
      </div>

      {/* 4. Core Converter Workspace */}
      <main
        id="converter"
        ref={converterRef}
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Workspace Title & Stats */}
        <div className="mb-6 flex flex-col justify-between gap-2 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-center dark:border-slate-800/80">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Image to PDF Studio
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag, reorder, rotate, and format your images into an encrypted-quality PDF document.
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="font-mono tabular-nums">
                {items.length} {items.length === 1 ? 'image' : 'images'} loaded
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {(
                  items.reduce((acc, curr) => acc + curr.size, 0) /
                  (1024 * 1024)
                ).toFixed(2)}{' '}
                MB total
              </span>
            </div>
          )}
        </div>

        {/* Global Error Banner */}
        {conversionError && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{conversionError}</span>
            </div>
            <button
              type="button"
              onClick={() => setConversionError(null)}
              className="text-xs font-semibold underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* If NO images loaded: show full dropzone */}
        {items.length === 0 ? (
          <div className="mx-auto max-w-3xl">
            <Dropzone onImagesAdded={handleImagesAdded} hasImages={false} />
          </div>
        ) : (
          /* When images ARE loaded: Show toolbar + 2-Column Split Workspace */
          <div className="space-y-6">
            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800/80 dark:bg-slate-900">
              {/* Left toolset: Order & rotation tools */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRotateAllCw}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  title="Rotate all images 90° clockwise"
                >
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Rotate All 90°</span>
                </button>

                <button
                  type="button"
                  onClick={handleSortAlpha}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  title="Sort alphabetically by file name"
                >
                  <SortAsc className="h-3.5 w-3.5" />
                  <span>Sort A-Z</span>
                </button>

                <button
                  type="button"
                  onClick={handleSortSize}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  title="Sort from largest to smallest"
                >
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <span>Sort by Size</span>
                </button>

                <button
                  type="button"
                  onClick={handleReverseOrder}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  title="Reverse current sequence"
                >
                  <span>Reverse</span>
                </button>
              </div>

              {/* Right toolset: Clear All */}
              <button
                type="button"
                onClick={handleClearAll}
                className="flex items-center gap-1.5 rounded-lg border border-red-200/80 bg-red-50/60 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Split layout: Image Cards on left (65%), Settings on right (35%) */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
              {/* Left Column: Compact dropzone + Image Cards Grid */}
              <div className="space-y-4 lg:col-span-8">
                {/* Compact Dropzone / Add More */}
                <Dropzone onImagesAdded={handleImagesAdded} hasImages={true} />

                {/* Grid of Image Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.18 }}
                      >
                        <ImageItemCard
                          item={item}
                          index={index}
                          total={items.length}
                          onRotateCw={handleRotateCw}
                          onRotateCcw={handleRotateCcw}
                          onMoveLeft={handleMoveLeft}
                          onMoveRight={handleMoveRight}
                          onRemove={handleRemove}
                          onZoom={(selected) => setZoomedItem(selected)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Sticky Settings Panel */}
              <div className="lg:sticky lg:top-24 lg:col-span-4">
                <SettingsPanel
                  options={options}
                  onChange={setOptions}
                  imageCount={items.length}
                  onConvert={handleConvert}
                  isConverting={progress.isConverting}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Middle Advertisement Slot */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot slotType="horizontal" />
      </div>

      {/* 6. Step-by-Step Guide Section */}
      <HowItWorks />

      {/* 7. Comprehensive Feature Matrix */}
      <FeaturesGrid />

      {/* 8. Privacy Comparison (Local In-Browser vs Remote Cloud) */}
      <PrivacyComparison />

      {/* 9. FAQ Accordion Section */}
      <FAQSection />

      {/* 10. Pre-Footer Advertisement */}
      <div className="mx-auto w-full max-w-6xl px-4">
        <AdSlot slotType="horizontal" />
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {/* Live Conversion Progress Overlay */}
      {progress.isConverting && <ConversionProgress progress={progress} />}

      {/* Success Result Modal with PDF download & ZIP bundle */}
      {result && (
        <ResultModal
          result={result}
          items={items}
          onClose={() => setResult(null)}
          onReset={handleReset}
        />
      )}

      {/* High-res Image Zoom Modal */}
      {zoomedItem && (
        <ImageViewerModal
          item={zoomedItem}
          onClose={() => setZoomedItem(null)}
          onRotateCw={handleRotateCw}
          onRotateCcw={handleRotateCcw}
        />
      )}
    </div>
  );
}
