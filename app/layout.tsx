import type { Metadata, Viewport } from 'next';
import './globals.css';

const baseUrl = process.env.APP_URL || 'https://irondome-pdf.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'IRON DOME | Fast & Secure Image to PDF Converter',
  description:
    'Convert JPG, PNG, and WebP images to high-quality PDF files directly in your browser. 100% private, zero server uploads, lightning fast, and free.',
  keywords: [
    'image to pdf',
    'jpg to pdf',
    'png to pdf',
    'webp to pdf',
    'photo to pdf converter',
    'private pdf converter',
    'client side pdf generator',
    'iron dome converter',
  ],
  authors: [
    { name: 'Kaveen Sandeepa', url: baseUrl },
    { name: 'IRON DOME Security & Document Tools' },
  ],
  creator: 'Kaveen Sandeepa',
  publisher: 'Kaveen Sandeepa',
  generator: 'IRON DOME Local Engine',
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      'google-site-verification-irondome-9182371928',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/sitemap.xml`,
    },
  },
  other: {
    'google-site-verification':
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      'google-site-verification-irondome-9182371928',
    'ai-content-declaration': 'human-created',
    'author-signature': 'Kaveen Sandeepa',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'IRON DOME Document Security',
    title: 'IRON DOME | Fast & Secure Image to PDF Converter',
    description:
      'Convert JPG, PNG, and WebP images to high-quality PDF files directly in your browser. 100% private, zero server uploads, lightning fast, and free.',
    images: [
      {
        url: '/pwa-512x512.png',
        width: 512,
        height: 512,
        alt: 'IRON DOME Image to PDF Converter',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'IRON DOME | Fast & Secure Image to PDF Converter',
    description:
      'Convert JPG, PNG, and WebP images to high-quality PDF files directly in your browser. 100% private, zero server uploads, lightning fast, and free.',
    images: ['/pwa-512x512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'IRON DOME',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${baseUrl}/#webapp`,
      name: 'IRON DOME Image to PDF Converter',
      url: baseUrl,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.',
      description:
        'Convert JPG, PNG, and WebP images to high-quality PDF files directly in your browser. 100% private, zero server uploads, lightning fast, and free.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Person',
        name: 'Kaveen Sandeepa',
        email: 'mail.kaveensandeepa@gmail.com',
      },
      creator: {
        '@type': 'Person',
        name: 'Kaveen Sandeepa',
        email: 'mail.kaveensandeepa@gmail.com',
      },
      featureList: [
        'Browser-based local PDF generation',
        'Zero server uploads for maximum privacy',
        'Support for JPG, JPEG, PNG, and WebP formats',
        'Drag and drop reordering and image rotation',
        'Multiple paper sizes: A4, A3, Letter, Legal, Fit to Image',
        'Configurable margins, orientation, and image quality',
        'Instant download with custom naming',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${baseUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are my images uploaded to any server?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. IRON DOME processes 100% of your images locally in your browser using client-side JavaScript, HTML5 Canvas, and WebAssembly. Your photos and sensitive documents never leave your device or touch an external server.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which image formats are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'IRON DOME supports JPG, JPEG, PNG, and WEBP formats with no artificial limits on image dimensions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I reorder or rotate images before creating the PDF?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can rotate individual images by 90-degree increments, reorder them via drag-and-drop or position buttons, and sort alphabetically or by size before generating your PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which PDF page sizes and orientations can I choose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can choose between A4, A3, US Letter, US Legal, or "Fit to Image" which dynamically formats each PDF page to match the exact dimensions of your original photo. Both Portrait and Landscape modes are supported.',
          },
        },
      ],
    },
  ],
};

const googleVerificationCode =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  'google-site-verification-irondome-9182371928';

const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_ID || 'G-IRONDOME2026';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Site Verification Meta Tag */}
        <meta
          name="google-site-verification"
          content={googleVerificationCode}
        />
        <meta name="author" content="Kaveen Sandeepa" />
        <meta name="creator" content="Kaveen Sandeepa" />
        <meta name="publisher" content="Kaveen Sandeepa" />
        <meta name="ai-content-declaration" content="human-created" />
        <link rel="author" href="/humans.txt" />
        <link rel="sitemap" type="text/plain" href="/sitemap.txt" />

        {/* Google Analytics (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        />
        <script
          id="google-analytics-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9123847291837462"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('irondome_theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100"
        suppressHydrationWarning
      >

        {children}
      </body>
    </html>
  );
}
