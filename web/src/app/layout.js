"use client";

// src/app/layout.js
import ThemeProvider from '@/themes/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import "./globals.css";

export default function RootLayout({ children }) {
  // Suppress preload warnings in development only
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalWarn = console.warn;
      console.warn = (...args) => {
        if (args[0]?.includes?.('preloaded using link preload') || 
            args[0]?.includes?.('was preloaded using link preload')) {
          return;
        }
        originalWarn(...args);
      };
      return () => {
        console.warn = originalWarn;
      };
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}