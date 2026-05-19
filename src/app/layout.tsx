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
  title: "Garudaloka — Platform Pengetahuan Teknik & Industri Modern",
  description: "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya. Platform edukasi engineering & industri pertama di Indonesia.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Garudaloka — Platform Pengetahuan Teknik & Industri Modern",
    description: "Menyederhanakan ilmu teknik menjadi pembelajaran visual yang lebih jelas, modern, dan terpercaya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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

