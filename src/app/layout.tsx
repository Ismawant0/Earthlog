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
    default: "PGDOWN — Elite Technology Publication",
    template: "%s | PGDOWN"
  },
  description: "Elite technology publication covering Artificial Intelligence, Operating Systems, Linux, Windows, Open Source, Software Engineering, Cyber Security, Cloud, and Developer Tools.",
  keywords: ["technology news", "artificial intelligence", "linux", "windows", "open source", "software engineering", "cyber security", "cloud computing", "programming", "developer tools"],
  authors: [{ name: "PGDOWN Editorial Team" }],
  creator: "PGDOWN Team",
  publisher: "PGDOWN",
  applicationName: "PGDOWN",
  metadataBase: new URL("https://pgdown.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PGDOWN — Elite Technology Publication",
    description: "Premium editorial media covering Artificial Intelligence, Linux, Windows, Open Source, Software, Cyber Security, and Cloud Computing.",
    url: "https://pgdown.vercel.app",
    siteName: "PGDOWN",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PGDOWN Technology Publication",
      }
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PGDOWN — Elite Technology Publication",
    description: "Elite technology publication covering AI, Linux, Windows, Open Source, Software Engineering, Cyber Security, Cloud, and Developer Tools.",
    creator: "@pgdown",
    site: "@pgdown",
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
    'article:publisher': 'PGDOWN',
  },
};

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PGDOWN",
    "url": "https://pgdown.vercel.app",
    "logo": "https://pgdown.vercel.app/favicon.ico",
    "description": "Elite technology publication and curated technical knowledge media.",
    "sameAs": [
      "https://github.com/Ismawant0"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PGDOWN",
    "url": "https://pgdown.vercel.app",
    "description": "Elite technology publication covering Artificial Intelligence, Linux, Windows, Open Source, Cyber Security, Programming, and Cloud Computing.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://pgdown.vercel.app/search?q={search_term_string}"
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
        <Script
          id="sw-cleanup"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

