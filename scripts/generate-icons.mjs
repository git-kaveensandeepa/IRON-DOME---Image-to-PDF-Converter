import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG Logo & Icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="100%" stop-color="#141c2e" />
    </linearGradient>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background rounded squircle -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect width="508" height="508" x="2" y="2" rx="110" fill="none" stroke="#2563eb" stroke-width="2" stroke-opacity="0.3" />

  <!-- Outer Defensive Shield Ring -->
  <path d="M 256 64 L 388 120 C 388 260 256 392 256 424 C 256 392 124 260 124 120 Z" 
        fill="url(#plateGrad)" stroke="#38bdf8" stroke-width="4" stroke-linejoin="round" />

  <!-- Iron Dome Canopy Arch Lines -->
  <path d="M 160 270 C 160 180 256 140 256 140 C 256 140 352 180 352 270" 
        fill="none" stroke="url(#amberGrad)" stroke-width="6" stroke-linecap="round" />
  <path d="M 184 270 C 184 205 256 175 256 175 C 256 175 328 205 328 270" 
        fill="none" stroke="#60a5fa" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6" />

  <!-- Center PDF Document Icon Shielded -->
  <g transform="translate(206, 210) scale(1)">
    <rect x="0" y="0" width="100" height="130" rx="10" fill="#1e293b" stroke="#94a3b8" stroke-width="4" />
    <!-- Folded corner -->
    <path d="M 70 0 L 100 30 L 70 30 Z" fill="#475569" stroke="#94a3b8" stroke-width="3" />
    <!-- PDF Text badge -->
    <rect x="16" y="44" width="68" height="26" rx="4" fill="#ef4444" />
    <text x="50" y="62" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">PDF</text>
    <!-- Document lines -->
    <line x1="20" y1="88" x2="80" y2="88" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
    <line x1="20" y1="104" x2="60" y2="104" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Defensive Radar/Dome Pulse Nodes -->
  <circle cx="256" cy="140" r="8" fill="#fbbf24" filter="url(#glow)" />
  <circle cx="160" cy="270" r="5" fill="#38bdf8" />
  <circle cx="352" cy="270" r="5" fill="#38bdf8" />
  <circle cx="256" cy="424" r="6" fill="#60a5fa" />
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon, 'utf8');

// Function to generate raw uncompressed PNG buffer using pure Node
function createPNG(width, height, getPixel) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  // Scanlines with filter byte 0
  const rawData = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const idatData = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', idatData);
  const iend = makeChunk('IEND', Buffer.alloc(0));
  const ihdrChunk = makeChunk('IHDR', ihdr);

  return Buffer.concat([signature, ihdrChunk, idat, iend]);
}

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Pixel shader for Iron Dome shield badge
function ironDomeShader(x, y, w, h) {
  const nx = (x / w) * 2 - 1; // -1 to 1
  const ny = (y / h) * 2 - 1; // -1 to 1
  const dist = Math.sqrt(nx * nx + ny * ny);

  // Background rounded rect
  const cornerR = 0.8;
  const inSquircle = Math.pow(Math.abs(nx), 3.5) + Math.pow(Math.abs(ny), 3.5) < 0.95;

  if (!inSquircle) {
    return [0, 0, 0, 0]; // Transparent
  }

  // Base background gradient: #090d16 to #141c2e
  const bgT = (ny + 1) / 2;
  let r = Math.round(9 + (20 - 9) * bgT);
  let g = Math.round(13 + (28 - 13) * bgT);
  let b = Math.round(22 + (46 - 22) * bgT);
  let a = 255;

  // Shield boundary calculation
  // Top: y = -0.65 to 0.1, x between -0.6 and 0.6
  // Bottom taper: down to y = 0.7
  const isInsideShield = ny > -0.65 && ny < 0.7 && Math.abs(nx) < (ny < 0.1 ? 0.55 : 0.55 * (1 - (ny - 0.1) / 0.65));

  if (isInsideShield) {
    // Shield fill: deep sapphire blue with metallic highlight
    r = Math.round(24 + 20 * (1 - dist));
    g = Math.round(45 + 50 * (1 - dist));
    b = Math.round(90 + 90 * (1 - dist));

    // Dome arch pulse (circular arc at top center)
    const domeDist = Math.sqrt(nx * nx + Math.pow(ny - 0.1, 2));
    if (Math.abs(domeDist - 0.38) < 0.04 && ny < 0.1) {
      // Amber arch
      r = 245;
      g = 158;
      b = 11;
    }

    // PDF sheet in center
    if (Math.abs(nx) < 0.22 && ny > -0.15 && ny < 0.45) {
      // Document body
      r = 235;
      g = 240;
      b = 245;

      // Red PDF header band
      if (ny > -0.05 && ny < 0.1) {
        r = 239;
        g = 68;
        b = 68;
      }
      // Text lines
      if (ny > 0.18 && ny < 0.24 && Math.abs(nx) < 0.15) {
        r = 100;
        g = 116;
        b = 139;
      }
      if (ny > 0.28 && ny < 0.34 && Math.abs(nx) < 0.12) {
        r = 100;
        g = 116;
        b = 139;
      }
    }
  }

  // Dome beacon dot
  const beaconDist = Math.sqrt(nx * nx + Math.pow(ny + 0.38, 2));
  if (beaconDist < 0.06) {
    r = 251;
    g = 191;
    b = 36;
  }

  return [r, g, b, a];
}

console.log('Generating PWA and web icons...');

const png192 = createPNG(192, 192, ironDomeShader);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);

const png512 = createPNG(512, 512, ironDomeShader);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);

const appleIcon = createPNG(180, 180, ironDomeShader);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Favicon 32x32 PNG format (browsers support PNG favicons or ICO)
const fav32 = createPNG(32, 32, ironDomeShader);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), fav32);

console.log('Icons generated successfully in public/');
