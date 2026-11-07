'use client';

import React, { useState } from 'react';
import {
  Download,
  FileCheck,
  Archive,
  Eye,
  RotateCcw,
  X,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import type { ConversionResult, ImageFileItem } from '@/types/converter';
import { createDownloadableZip } from '@/lib/zip-export';

interface ResultModalProps {
  result: ConversionResult;
  items: ImageFileItem[];
  onClose: () => void;
  onReset: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  items,
  onClose,
  onReset,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleDownloadPdf = () => {
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      const zipBlob = await createDownloadableZip(items, result);
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = zipUrl;
      const baseName = result.filename.replace(/\.pdf$/i, '');
      a.download = `${baseName}_IRON_DOME_BUNDLE.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);
    } catch (err) {
      console.error('Failed to create ZIP package:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                PDF Ready for Download
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                100% processed in your browser without cloud uploads
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Summary Metric Card */}
          <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Output File Name
              </span>
              <p className="truncate font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
                {result.filename}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Pages Generated
              </span>
              <p className="font-mono text-xs font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {result.pageCount} {result.pageCount === 1 ? 'Page' : 'Pages'}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                PDF File Size
              </span>
              <p className="font-mono text-xs font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                {formatFileSize(result.fileSize)}
              </p>
            </div>
          </div>

          {/* Action Download Buttons */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-lg active:scale-[0.99]"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Document</span>
            </button>

            <button
              type="button"
              disabled={isZipping}
              onClick={handleDownloadZip}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title="Download entire package (PDF + processed images + summary report)"
            >
              <Archive className="h-4 w-4 text-amber-500" />
              <span>{isZipping ? 'Packing ZIP...' : 'Download ZIP Bundle'}</span>
            </button>
          </div>

          {/* Interactive In-Browser PDF Preview Toggle */}
          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showPreview ? 'Hide PDF Preview' : 'Show PDF Preview'}</span>
              </button>

              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <span>Open in new tab</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {showPreview && (
              <div className="mt-3 h-80 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                <iframe
                  src={result.url}
                  title="PDF Preview"
                  className="h-full w-full border-0"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-3.5 dark:border-slate-800 dark:bg-slate-950/30">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Convert Another Batch</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
