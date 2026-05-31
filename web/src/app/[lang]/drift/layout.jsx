// src/app/drift/layout.jsx

import DriftLayoutClient from "./layout-client";

export const metadata = {
  title: "Drift | BookQubit",
  description:
    "Drift is the social discovery platform by BookQubit where readers, authors, and creators connect through books, comics, ideas, and trends.",
  openGraph: {
    title: "Drift | BookQubit",
    description: "Join Drift — the social side of BookQubit.",
    siteName: "Drift",
    type: "website",
    url: "https://bookqubit.com/drift",
    images: [
      {
        url: "https://bookqubit.com/drift-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Drift by BookQubit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift | BookQubit",
    description: "The social reading and discovery platform by BookQubit.",
    images: ["https://bookqubit.com/drift-twitter-card.jpg"],
  },
  keywords: [
    "social reading",
    "book discovery",
    "reading community",
    "book lovers",
    "Drift",
    "BookQubit",
  ],
  authors: [{ name: "BookQubit" }],
  creator: "BookQubit",
  publisher: "BookQubit",
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
  },
};

export default function DriftLayout({ children }) {
  return <DriftLayoutClient>{children}</DriftLayoutClient>;
}