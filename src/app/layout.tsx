import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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

const jsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Earthlog",
      "url": "https://earthlog.org",
      "logo": "https://earthlog.org/favicon.ico",
      "description": "A global environmental movement to document small actions for the planet.",
      "sameAs": ["https://github.com/Ismawant0/PGDown"],
    },
    {
      "@type": "WebSite",
      "name": "Earthlog",
      "url": "https://earthlog.org",
      "description": "Inspiring millions of people to perform and document small positive actions for the planet.",
    },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Earthlog — Every small action leaves a mark.",
    template: "%s | Earthlog",
  },
  description:
    "Earthlog is a global environmental movement. Its purpose is to inspire millions of people to perform and document small positive actions for the planet.",
  keywords: [
    "environmental movement",
    "climate action",
    "sustainability",
    "carbon sink",
    "conservation",
    "save water",
    "plant trees",
    "trash cleanup",
    "biodiversity",
  ],
  authors: [{ name: "Earthlog Contributors" }],
  creator: "Earthlog Community",
  publisher: "Earthlog",
  applicationName: "Earthlog",
  metadataBase: new URL("https://earthlog.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Earthlog — Every small action leaves a mark.",
    description:
      "A global environmental movement inspiring millions of people to perform and document small positive actions for the planet.",
    url: "https://earthlog.org",
    siteName: "Earthlog",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Earthlog Environmental Movement",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earthlog — Every small action leaves a mark.",
    description:
      "A global environmental movement inspiring millions of people to perform and document small positive actions for the planet.",
    creator: "@earthlog",
    site: "@earthlog",
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
  other: {
    "theme-color": "#FAFAF7",
    "og:locale:alternate": "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
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
            `,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}