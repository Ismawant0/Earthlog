import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Garudaloka — Platform Pengetahuan Teknik & Industri Modern",
    template: "%s | Garudaloka"
  },
  description: "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya. Platform edukasi engineering & industri pertama di Indonesia.",
  keywords: ["engineering", "oil and gas", "manufacturing", "maintenance", "safety", "process engineering", "mechanical engineering", "teknik kimia", "teknik mesin", "engineering Indonesia", "teknik industri"],
  authors: [{ name: "Ismawanto" }],
  creator: "Ismawanto",
  publisher: "Garudaloka",
  metadataBase: new URL("https://garudaloka.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Garudaloka — Platform Pengetahuan Teknik & Industri Modern",
    description: "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya.",
    url: "https://garudaloka.com",
    siteName: "Garudaloka",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "Garudaloka Engineering Platform",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garudaloka — Platform Pengetahuan Teknik & Industri Modern",
    description: "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya.",
    creator: "@garudaloka",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "NTD0iDC2t-J7vtWF4t9A2Ss48ZUSTBpNMnGrRzhMtos",
  },
  other: {
    'theme-color': '#0f172a',
    'og:locale:alternate': 'en_US',
    'article:publisher': 'Garudaloka',
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Garudaloka",
    "url": "https://garudaloka.com",
    "logo": "https://garudaloka.com/icon.png",
    "description": "Platform Pengetahuan Teknik & Industri Modern di Indonesia",
    "sameAs": [
      "https://github.com/Ismawant0"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Garudaloka",
    "url": "https://garudaloka.com",
    "description": "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://garudaloka.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html
      lang="id"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <Script 
          src="/scripts/theme.js" 
          strategy="beforeInteractive" 
        />
        {children}
      </body>
    </html>
  );
}

