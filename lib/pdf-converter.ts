import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type {
  ConversionOptions,
  ConversionResult,
  ImageFileItem,
  ProgressState,
} from '@/types/converter';

// Page size constants in PDF points (72 points per inch)
const PAGE_SIZES: Record<string, [number, number]> = {
  a4: [595.28, 841.89],
  a3: [841.89, 1190.55],
  letter: [612.0, 792.0],
  legal: [612.0, 1008.0],
};

function mmToPoints(mm: number): number {
  return (mm / 25.4) * 72;
}

function getMarginPoints(options: ConversionOptions): number {
  switch (options.margin) {
    case 'none':
      return 0;
    case 'small':
      return mmToPoints(10);
    case 'medium':
      return mmToPoints(20);
    case 'large':
      return mmToPoints(30);
    case 'custom':
      return mmToPoints(options.customMarginMm || 15);
    default:
      return mmToPoints(10);
  }
}

// Convert quality setting to numeric JPEG compression ratio
function getQualityRatio(quality: string): number {
  switch (quality) {
    case 'high':
      return 0.95;
    case 'balanced':
      return 0.82;
    case 'low':
      return 0.65;
    default:
      return 0.85;
  }
}

/**
 * Normalizes an image file by applying rotation and desired compression.
 * Converts WebP to JPEG or PNG for universal pdf-lib compatibility.
 */
async function processImageToBuffer(
  item: ImageFileItem,
  qualityRatio: number
): Promise<{ buffer: ArrayBuffer; isJpeg: boolean; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const isRotated90or270 = item.rotation === 90 || item.rotation === 270;
        const targetWidth = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
        const targetHeight = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

        // Fast path: If unrotated JPG/PNG and high quality, check if we can read raw bytes
        const isOriginalJpg =
          item.rotation === 0 &&
          (item.type === 'image/jpeg' || item.type === 'image/jpg') &&
          qualityRatio >= 0.95;

        const isOriginalPng =
          item.rotation === 0 &&
          item.type === 'image/png' &&
          qualityRatio >= 0.95;

        if (isOriginalJpg || isOriginalPng) {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              buffer: reader.result as ArrayBuffer,
              isJpeg: isOriginalJpg,
              width: targetWidth,
              height: targetHeight,
            });
          };
          reader.onerror = () => reject(new Error(`Failed to read file ${item.name}`));
          reader.readAsArrayBuffer(item.file);
          return;
        }

        // Draw onto canvas with rotation transform
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) {
          throw new Error('Unable to create 2D canvas context.');
        }

        // Fill white background (crucial for transparent PNGs converted to JPEG)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Apply rotation
        ctx.save();
        ctx.translate(targetWidth / 2, targetHeight / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        ctx.restore();

        // Convert to JPEG with specified quality
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error(`Canvas encoding failed for ${item.name}`));
              return;
            }
            const buffer = await blob.arrayBuffer();
            resolve({
              buffer,
              isJpeg: true,
              width: targetWidth,
              height: targetHeight,
            });
          },
          'image/jpeg',
          qualityRatio
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error(`Could not load image: ${item.name}`));
    };

    img.src = item.previewUrl;
  });
}

/**
 * Main conversion function: Compiles multiple images into a PDF document.
 */
export async function convertImagesToPdf(
  items: ImageFileItem[],
  options: ConversionOptions,
  onProgress?: (progress: ProgressState) => void
): Promise<ConversionResult> {
  if (items.length === 0) {
    throw new Error('No images selected for conversion.');
  }

  const total = items.length;
  onProgress?.({
    isConverting: true,
    current: 0,
    total,
    statusText: 'Initializing PDF document...',
    percentage: 5,
  });

  const pdfDoc = await PDFDocument.create();

  // Set document metadata
  if (options.docTitle?.trim()) {
    pdfDoc.setTitle(options.docTitle.trim());
  } else {
    pdfDoc.setTitle('IRON DOME Export');
  }

  if (options.author?.trim()) {
    pdfDoc.setAuthor(options.author.trim());
  } else {
    pdfDoc.setAuthor('IRON DOME User');
  }

  if (options.subject?.trim()) {
    pdfDoc.setSubject(options.subject.trim());
  }

  pdfDoc.setProducer('IRON DOME PDF Studio');
  pdfDoc.setCreator('IRON DOME');
  pdfDoc.setCreationDate(new Date());

  const helveticaFont = options.addPageNumbers
    ? await pdfDoc.embedFont(StandardFonts.Helvetica)
    : null;

  const margin = getMarginPoints(options);
  const qualityRatio = getQualityRatio(options.quality);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const currentStep = i + 1;
    const progressPercent = Math.round(10 + (currentStep / total) * 75);

    onProgress?.({
      isConverting: true,
      current: currentStep,
      total,
      statusText: `Processing image ${currentStep} of ${total}: ${item.name}`,
      percentage: progressPercent,
    });

    // Normalize image buffer and orientation
    const { buffer, isJpeg, width: imgW, height: imgH } = await processImageToBuffer(
      item,
      qualityRatio
    );

    // Embed image into pdf-lib
    const embeddedImage = isJpeg
      ? await pdfDoc.embedJpg(buffer)
      : await pdfDoc.embedPng(buffer);

    // Calculate Page Dimensions & Orientation
    let pageWidth: number;
    let pageHeight: number;

    if (options.pageSize === 'fit') {
      // Dynamic page size matching image dimensions with margin padding
      pageWidth = imgW + margin * 2;
      pageHeight = imgH + margin * 2;
    } else {
      const standardSize = PAGE_SIZES[options.pageSize] || PAGE_SIZES.a4;
      let [stdW, stdH] = standardSize;

      // Determine orientation
      let isLandscape = false;
      if (options.orientation === 'landscape') {
        isLandscape = true;
      } else if (options.orientation === 'portrait') {
        isLandscape = false;
      } else {
        // Auto: detect based on image aspect ratio
        isLandscape = imgW > imgH;
      }

      if (isLandscape) {
        pageWidth = Math.max(stdW, stdH);
        pageHeight = Math.min(stdW, stdH);
      } else {
        pageWidth = Math.min(stdW, stdH);
        pageHeight = Math.max(stdW, stdH);
      }
    }

    // Add page
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Available printable area inside margins
    const printableWidth = Math.max(pageWidth - margin * 2, 20);
    const printableHeight = Math.max(pageHeight - margin * 2, 20);

    let drawWidth = printableWidth;
    let drawHeight = printableHeight;
    let drawX = margin;
    let drawY = margin;

    if (options.pageSize === 'fit') {
      drawWidth = imgW;
      drawHeight = imgH;
      drawX = margin;
      drawY = margin;
    } else if (options.fitMode === 'contain') {
      // Scale maintaining aspect ratio so entire image fits
      const widthRatio = printableWidth / imgW;
      const heightRatio = printableHeight / imgH;
      const scale = Math.min(widthRatio, heightRatio);

      drawWidth = imgW * scale;
      drawHeight = imgH * scale;

      // Center within printable area
      drawX = margin + (printableWidth - drawWidth) / 2;
      drawY = margin + (printableHeight - drawHeight) / 2;
    } else if (options.fitMode === 'fill') {
      // Fill the entire printable area
      drawWidth = printableWidth;
      drawHeight = printableHeight;
      drawX = margin;
      drawY = margin;
    } else if (options.fitMode === 'original') {
      // 1:1 points (1 pt ≈ 1 px, clamped if larger than printable area)
      const scale = Math.min(1, printableWidth / imgW, printableHeight / imgH);
      drawWidth = imgW * scale;
      drawHeight = imgH * scale;
      drawX = margin + (printableWidth - drawWidth) / 2;
      drawY = margin + (printableHeight - drawHeight) / 2;
    }

    // Draw embedded image
    page.drawImage(embeddedImage, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight,
    });

    // Draw page numbers if enabled
    if (options.addPageNumbers && helveticaFont && pageHeight > 60) {
      const pageText = `Page ${currentStep} of ${total}`;
      const fontSize = 9;
      const textWidth = helveticaFont.widthOfTextAtSize(pageText, fontSize);
      const textX = (pageWidth - textWidth) / 2;
      const textY = Math.max(8, margin / 2);

      page.drawText(pageText, {
        x: textX,
        y: textY,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0.4, 0.45, 0.5),
      });
    }
  }

  onProgress?.({
    isConverting: true,
    current: total,
    total,
    statusText: 'Finalizing PDF binary file...',
    percentage: 92,
  });

  // Save PDF bytes
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);


  // Filename sanitize
  let cleanName = options.filename?.trim() || 'IronDome_Document';
  if (!cleanName.toLowerCase().endsWith('.pdf')) {
    cleanName += '.pdf';
  }

  onProgress?.({
    isConverting: false,
    current: total,
    total,
    statusText: 'Conversion complete!',
    percentage: 100,
  });

  return {
    blob,
    url,
    filename: cleanName,
    fileSize: blob.size,
    pageCount: total,
    timestamp: Date.now(),
  };
}
