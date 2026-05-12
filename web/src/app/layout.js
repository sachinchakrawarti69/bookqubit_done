// src/app/layout.js

import ThemeProvider from "@/themes/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import RTLProvider from "@/contexts/RTLContext";
import { FontProvider } from "@/contexts/FontContext";

import "./globals.css";

// Move warning suppression into separate client component if needed
// Root layout should remain a SERVER component in Next.js

export const metadata = {
  title: "BookQubit",
  description: "BookQubit Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#0ea5e9" />

        {/* Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body className="antialiased">
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