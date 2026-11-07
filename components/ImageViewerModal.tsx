/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { X, RotateCw, RotateCcw } from 'lucide-react';
import type { ImageFileItem } from '@/types/converter';

interface ImageViewerModalProps {
  item: ImageFileItem | null;
  onClose: () => void;
  onRotateCw: (id: string) => void;
  onRotateCcw: (id: string) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  item,
  onClose,
  onRotateCw,
  onRotateCcw,
}) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
          <div className="truncate pr-4 text-xs font-semibold text-slate-200">
            {item.name}{' '}
            <span className="font-mono text-slate-400">
              ({item.width} × {item.height} px)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRotateCcw(item.id)}
              title="Rotate Counter-Clockwise"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onRotateCw(item.id)}
              title="Rotate Clockwise"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="flex max-h-[75vh] items-center justify-center overflow-auto p-4">
          <img
            src={item.previewUrl}
            alt={item.name}
            className="max-h-[70vh] max-w-full rounded object-contain transition-transform duration-200"
            style={{ transform: `rotate(${item.rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};
