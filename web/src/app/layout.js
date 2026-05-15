// src/app/layout.js

import Script from "next/script";

import ThemeProvider from "@/themes/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import RTLProvider from "@/contexts/RTLContext";
import { FontProvider } from "@/contexts/FontContext";

import "./globals.css";

export const metadata = {
  // Main Domain
  metadataBase: new URL("https://bookqubit.com"),

  title: {
    default:
      "BookQubit – Discover Books, Read Previews & Smart Summaries Online",
    template: "%s | BookQubit",
  },

  description:
    "Discover books you'll love with BookQubit. Read previews, explore detailed summaries, and find your next great read with confidence.",

  applicationName: "BookQubit",

  keywords: [
    "books",
    "book summaries",
    "book previews",
    "book discovery",
    "reading app",
    "BookQubit",
    "ebooks",
    "novels",
    "online books",
    "book reviews",
    "book recommendations",
  ],

  authors: [{ name: "BookQubit" }],
  creator: "BookQubit",
  publisher: "BookQubit",

  category: "books",

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

  // Canonical Domain
  alternates: {
    canonical: "https://bookqubit.com",
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico" },

      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },

      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },

      {
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },

      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    // Main Domain
    url: "https://bookqubit.com",

    siteName: "BookQubit",

    title:
      "BookQubit | Book Discovery, Previews, Details & Smart Summaries",

    description:
      "Discover your next favorite book with BookQubit. Explore detailed previews, in-depth book details, and concise summaries.",

    images: [
      {
        url: "https://bookqubit.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BookQubit - Smart Reading Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "BookQubit | Book Discovery, Previews, Details & Smart Summaries",

    description:
      "Discover books, previews, summaries, and detailed reading insights on BookQubit.",

    creator: "@bookqubit",

    images: ["https://bookqubit.com/twitter-card.jpg"],
  },

  verification: {
    google: "03_jf4AMkWf87c1mDvMXI_eaBAUTykHmYU5CzyAjEqE",

    yandex: "7c7b1645cdd813cc",

    other: {
      "msvalidate.01": "3ED2E923C3A826303244CCA16E813077",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Charset */}
        <meta charSet="utf-8" />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Theme Colors */}
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="theme-color"
          content="#1a1a1a"
          media="(prefers-color-scheme: dark)"
        />

        {/* Browser Config */}
        <meta name="msapplication-TileColor" content="#0ea5e9" />

        <meta
          name="msapplication-config"
          content="/browserconfig.xml"
        />

        {/* Referrer */}
        <meta
          name="referrer"
          content="no-referrer-when-downgrade"
        />

        {/* Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch */}
        <link
          rel="dns-prefetch"
          href="https://www.google-analytics.com"
        />

        {/* RSS Feed */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="BookQubit Feed"
          href="/feed.xml"
        />

        {/* Alternate Domains */}
        <link
          rel="alternate"
          href="https://bookqubit.shop"
          hrefLang="x-default"
        />

        <link
          rel="alternate"
          href="https://bookqubit.com"
          hrefLang="en"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "WebSite",

              name: "BookQubit",

              alternateName: [
                "BookQubit Books Platform",
                "BookQubit Shop",
              ],

              url: "https://bookqubit.com",

              sameAs: [
                "https://bookqubit.com",
                "https://bookqubit.shop",
              ],

              potentialAction: {
                "@type": "SearchAction",

                target:
                  "https://bookqubit.com/search?q={search_term_string}",

                "query-input":
                  "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1BW65S2PZ2"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag() {
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-1BW65S2PZ2', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `}
        </Script>

        <ThemeProvider>
          <LanguageProvider>
            <RTLProvider>
              <FontProvider>
                {children}
              </FontProvider>
            </RTLProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}