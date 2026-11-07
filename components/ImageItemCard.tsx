/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import {
  RotateCw,
  RotateCcw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileImage,
} from 'lucide-react';
import type { ImageFileItem } from '@/types/converter';

interface ImageItemCardProps {
  item: ImageFileItem;
  index: number;
  total: number;
  onRotateCw: (id: string) => void;
  onRotateCcw: (id: string) => void;
  onMoveLeft: (index: number) => void;
  onMoveRight: (index: number) => void;
  onRemove: (id: string) => void;
  onZoom: (item: ImageFileItem) => void;
}

export const ImageItemCard: React.FC<ImageItemCardProps> = ({
  item,
  index,
  total,
  onRotateCw,
  onRotateCcw,
  onMoveLeft,
  onMoveRight,
  onRemove,
  onZoom,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isRotated = item.rotation !== 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      {/* Top Bar on Card: Page Number & Reorder Handles */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-3 py-1.5 text-xs dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-200/80 text-[10px] text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            {index + 1}
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-400">{total}</span>
        </div>

        {/* Move Left / Right buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onMoveLeft(index)}
            disabled={index === 0}
            aria-label="Move image earlier"
            title="Move left"
            className="flex h-6 w-6 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMoveRight(index)}
            disabled={index === total - 1}
            aria-label="Move image later"
            title="Move right"
            className="flex h-6 w-6 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Image Preview Canvas Area */}
      <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-slate-100 p-2 dark:bg-slate-950">
        {/* Transparent grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          }}
        />

        <img
          src={item.previewUrl}
          alt={item.name}
          className="relative max-h-full max-w-full object-contain transition-transform duration-200 select-none"
          style={{ transform: `rotate(${item.rotation}deg)` }}
        />

        {/* Rotation indicator badge */}
        {isRotated && (
          <div className="absolute top-2 right-2 rounded bg-slate-900/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-xs">
            {item.rotation}°
          </div>
        )}

        {/* Zoom trigger overlay button */}
        <button
          type="button"
          onClick={() => onZoom(item)}
          aria-label="Zoom full size preview"
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900/70 text-white opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100 hover:bg-slate-900"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Image Info & Details */}
      <div className="flex flex-col p-2.5">
        <p
          className="truncate text-xs font-medium text-slate-900 dark:text-slate-100"
          title={item.name}
        >
          {item.name}
        </p>

        {/* Dimensions & Size */}
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-mono tabular-nums">
            {item.rotation === 90 || item.rotation === 270
              ? `${item.height}×${item.width}`
              : `${item.width}×${item.height}`}
            {' '}px
          </span>
          <span className="font-mono tabular-nums">{formatFileSize(item.size)}</span>
        </div>

        {/* Action Controls Toolbar */}
        <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onRotateCcw(item.id)}
              title="Rotate counter-clockwise (-90°)"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onRotateCw(item.id)}
              title="Rotate clockwise (+90°)"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            title="Remove image"
            className="flex h-7 w-7 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
