"use client";

// src/app/layout.js
import ThemeProvider from '@/themes/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}