import JSZip from 'jszip';
import type { ImageFileItem, ConversionResult } from '@/types/converter';

/**
 * Creates a downloadable ZIP containing the converted PDF,
 * all processed source images, and an audit metadata report.
 */
export async function createDownloadableZip(
  items: ImageFileItem[],
  result: ConversionResult | null
): Promise<Blob> {
  const zip = new JSZip();

  // If a result exists, include the PDF
  if (result) {
    zip.file(result.filename, result.blob);
  }

  // Add all images inside an 'images' folder
  const imgFolder = zip.folder('images');
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const prefix = String(i + 1).padStart(2, '0');
    const safeName = `${prefix}_${item.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // Read file buffer
    const arrayBuffer = await item.file.arrayBuffer();
    imgFolder?.file(safeName, arrayBuffer);
  }

  // Summary manifest
  const summary = [
    '========================================',
    'IRON DOME - IMAGE TO PDF CONVERTER EXPORT',
    '========================================',
    `Export Date: ${new Date().toISOString()}`,
    `Total Images Processed: ${items.length}`,
    `Generated PDF: ${result ? result.filename : 'N/A'}`,
    `PDF Size: ${result ? (result.fileSize / 1024).toFixed(1) + ' KB' : 'N/A'}`,
    `Engine: 100% Client-Side In-Browser Execution`,
    `Privacy Guarantee: Zero network uploads, zero telemetry`,
    '',
    'File List:',
    ...items.map(
      (item, idx) =>
        `  ${idx + 1}. ${item.name} (${item.width}x${item.height}px, ${(item.size / 1024).toFixed(1)} KB, rotation: ${item.rotation}°)`
    ),
    '',
    '========================================',
  ].join('\n');

  zip.file('IRON_DOME_REPORT.txt', summary);

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
}
