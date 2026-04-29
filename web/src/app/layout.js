"use client";

// src/app/layout.js
import ThemeProvider from '@/themes/ThemeProvider';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}