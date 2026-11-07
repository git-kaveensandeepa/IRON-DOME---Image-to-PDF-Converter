# IRON DOME — Secure Image to PDF Converter

**IRON DOME** is a modern, high-speed, 100% client-side Image to PDF converter web application built with Next.js 15, React 19, TypeScript, Tailwind CSS, and `pdf-lib`.

---

## Key Features

- **100% Client-Side Privacy**: Zero server uploads. All image parsing, rotation, resizing, and PDF document generation occurs entirely inside the client's browser memory via Canvas and WebAssembly.
- **Universal Format Support**: High-fidelity support for **JPG**, **JPEG**, **PNG**, and **WEBP** images.
- **Interactive Image Manipulation**:
  - Drag-and-drop uploading and clipboard paste (`Ctrl+V` / `Cmd+V`).
  - Reorder pages with position buttons, alphabetical sorting (`A-Z`), size sorting, or sequence reversal.
  - Rotate individual images by 90° clockwise or counter-clockwise, or batch-rotate all items.
  - Zoom and preview high-resolution images in a dedicated modal.
- **Configurable PDF Layouts**:
  - Page Formats: **ISO A4**, **ISO A3**, **US Letter**, **US Legal**, or **Fit to Image** (adaptive page geometry matching original image dimensions).
  - Orientation: **Auto-detect**, **Portrait**, or **Landscape**.
  - Margins: **None (0mm)**, **Small (10mm)**, **Medium (20mm)**, **Large (30mm)**, or custom values.
  - Scaling: **Contain** (aspect-ratio preserved), **Fill** (stretch to printable bounds), or **Original** (1:1 pixel scale).
  - Output Compression: **High Quality (Lossless/95%)**, **Balanced (82%)**, or **Low File Size (65%)**.
  - Optional Header/Footer page numbering ("Page X of Y") and custom document metadata.
- **Flexible Export**:
  - Direct instant PDF download.
  - Complete downloadable ZIP bundle containing the generated PDF, normalized source images, and an audit manifest.
  - In-browser interactive PDF preview frame.
- **PWA & Offline Capability**:
  - Full Progressive Web App manifest and service worker compatibility.
  - In-app installation prompts for Desktop, Android, and iOS Safari.
  - Operates completely offline without an active internet connection.
- **Dark & Light Mode**:
  - Instant theme toggle with localStorage persistence and zero screen flash.
- **Production SEO & AdSense Ready**:
  - Structured data (`WebApplication` and `FAQPage` via JSON-LD).
  - XML sitemap (`/sitemap.xml`) and search directives (`/robots.txt`).
  - Semantic AdSense ad containers ready for production publisher script deployment.

---

## Technical Stack

- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19, Tailwind CSS v4, Lucide React, Motion
- **PDF Engine**: `pdf-lib` (pure JavaScript, zero external binaries)
- **Archive Engine**: `jszip`
- **Language**: TypeScript (strict mode enabled)

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm start
```

---

## Cloudflare Deployment

This project uses `@opennextjs/cloudflare` and `wrangler.jsonc` to deploy Next.js onto Cloudflare Workers.

### Recommended Cloudflare Dashboard Build Settings:
- **Framework Preset**: Next.js (or None)
- **Build Command**: `npx opennextjs-cloudflare build` (or `bun run build:worker`)
- **Deploy Command**: `npx wrangler deploy`

> Note: `wrangler.jsonc` has an automated build trigger (`"build": { "command": "npx opennextjs-cloudflare build" }`), ensuring the `.open-next` worker and assets bundle are always built before deploying even if the deploy command is invoked alone.

---

## Privacy Guarantee

IRON DOME guarantees that zero image bytes are transmitted across the network. All image conversions run strictly in the user's browser runtime memory.

