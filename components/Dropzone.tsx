'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, Plus, AlertCircle, FileCheck } from 'lucide-react';
import type { ImageFileItem } from '@/types/converter';

interface DropzoneProps {
  onImagesAdded: (newItems: ImageFileItem[]) => void;
  hasImages: boolean;
}

const SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_MB = 60; // 60MB per file warning

// Read natural image dimensions helper
const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth || 800,
        height: img.naturalHeight || 600,
      });
    };
    img.onerror = () => {
      resolve({ width: 800, height: 600 });
    };
    img.src = url;
  });
};

export const Dropzone: React.FC<DropzoneProps> = ({ onImagesAdded, hasImages }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setErrorMessage(null);
    setIsProcessing(true);

    const validFiles: File[] = [];
    const rejectedFiles: string[] = [];

    Array.from(files).forEach((file) => {
      const type = file.type.toLowerCase();
      // Also allow check by extension if mime type is empty
      const ext = file.name.split('.').pop()?.toLowerCase();
      const isValidExt = ext && ['jpg', 'jpeg', 'png', 'webp'].includes(ext);

      if (SUPPORTED_TYPES.includes(type) || isValidExt) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          rejectedFiles.push(`${file.name} (exceeds ${MAX_FILE_SIZE_MB}MB)`);
        } else {
          validFiles.push(file);
        }
      } else {
        rejectedFiles.push(`${file.name} (unsupported format)`);
      }
    });

    if (rejectedFiles.length > 0) {
      setErrorMessage(
        `Skipped ${rejectedFiles.length} file(s): ${rejectedFiles.slice(0, 3).join(', ')}${
          rejectedFiles.length > 3 ? '...' : ''
        }`
      );
    }

    if (validFiles.length === 0) {
      setIsProcessing(false);
      return;
    }

    // Process valid files into ImageFileItems with dimensions and previews
    const newItems: ImageFileItem[] = [];

    for (const file of validFiles) {
      try {
        const previewUrl = URL.createObjectURL(file);
        const { width, height } = await getImageDimensions(previewUrl);

        newItems.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type || 'image/jpeg',
          previewUrl,
          width,
          height,
          rotation: 0,
        });
      } catch (err) {
        console.error('Error reading image dimensions:', err);
      }
    }

    if (newItems.length > 0) {
      onImagesAdded(newItems);
    }
    setIsProcessing(false);
  }, [onImagesAdded]);


  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so same files can be re-selected if removed
      e.target.value = '';
    }
  };

  // Clipboard Paste support anywhere on window
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            // Give pasted files a nice descriptive name
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const ext = file.type.split('/')[1] || 'png';
            const renamedFile = new File([file], `Pasted_Image_${timestamp}.${ext}`, {
              type: file.type,
            });
            pastedFiles.push(renamedFile);
          }
        }
      }

      if (pastedFiles.length > 0) {
        processFiles(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [processFiles]);

  if (hasImages) {
    // Compact "Add More" bar when images are already present
    return (
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group flex cursor-pointer items-center justify-between rounded-xl border border-dashed px-5 py-3 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50/60 dark:border-blue-400 dark:bg-blue-950/30'
              : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Add More Images or Paste (Ctrl+V)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Drop more JPG, PNG, or WebP files anywhere
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-blue-600 dark:group-hover:text-white"
          >
            Browse Files
          </button>
        </div>

        {errorMessage && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? 'scale-[1.01] border-blue-500 bg-blue-50/70 shadow-lg shadow-blue-500/10 dark:border-blue-400 dark:bg-blue-950/40'
            : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900/80'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner transition-transform group-hover:scale-105 dark:bg-blue-950/60 dark:text-blue-400">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          Drop your images here, or browse
        </h3>

        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Select multiple images or paste from clipboard (<kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-800">Ctrl</kbd>+<kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-slate-800">V</kbd>). All processing stays on your device.
        </p>

        {/* Supported Formats Tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            JPG
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            JPEG
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            PNG
          </span>
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300">
            WEBP
          </span>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            Select Images from Device
          </button>
        </div>

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-xs dark:bg-slate-950/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Analyzing images...</span>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
