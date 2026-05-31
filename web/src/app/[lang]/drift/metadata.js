// src/app/drift/metadata.js

export const driftMetadata = {
  title: "Drift | BookQubit - Social Discovery Platform for Readers",
  description: "Join Drift, the social side of BookQubit where readers, authors, and creators connect through books, comics, ideas, and trends. Discover, share, and engage with book lovers worldwide.",
  openGraph: {
    title: "Drift | BookQubit",
    description: "The social reading and discovery platform by BookQubit",
    siteName: "Drift",
    type: "website",
    url: "https://bookqubit.com/drift",
    locale: "en_US",
    images: [
      {
        url: "https://bookqubit.com/images/drift-og.jpg",
        width: 1200,
        height: 630,
        alt: "Drift - Social Discovery Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookqubit",
    creator: "@bookqubit",
    title: "Drift | BookQubit",
    description: "Join the social reading community on Drift",
    images: ["https://bookqubit.com/images/drift-twitter.jpg"],
  },
  keywords: [
    "social reading",
    "book discovery",
    "reading community",
    "book lovers",
    "book club",
    "reading social network",
    "Drift",
    "BookQubit",
    "book recommendations",
    "reading trends",
  ],
  authors: [{ name: "BookQubit", url: "https://bookqubit.com/about" }],
  creator: "BookQubit",
  publisher: "BookQubit",
  category: "Social Reading Platform",
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
  alternates: {
    canonical: "https://bookqubit.com/drift",
    languages: {
      en: "https://bookqubit.com/drift",
      hi: "https://bookqubit.com/hi/drift",
      ur: "https://bookqubit.com/ur/drift",
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};