export type PageSizeOption = 'a4' | 'a3' | 'letter' | 'legal' | 'fit';
export type OrientationOption = 'portrait' | 'landscape' | 'auto';
export type MarginOption = 'none' | 'small' | 'medium' | 'large' | 'custom';
export type FitModeOption = 'contain' | 'fill' | 'original';
export type QualityOption = 'high' | 'balanced' | 'low';

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
  width: number;
  height: number;
  rotation: number; // 0, 90, 180, 270
}

export interface ConversionOptions {
  pageSize: PageSizeOption;
  orientation: OrientationOption;
  margin: MarginOption;
  customMarginMm: number;
  fitMode: FitModeOption;
  quality: QualityOption;
  docTitle: string;
  author: string;
  subject: string;
  addPageNumbers: boolean;
  filename: string;
}

export interface ConversionResult {
  blob: Blob;
  url: string;
  filename: string;
  fileSize: number;
  pageCount: number;
  timestamp: number;
}

export interface ProgressState {
  isConverting: boolean;
  current: number;
  total: number;
  statusText: string;
  percentage: number;
}
