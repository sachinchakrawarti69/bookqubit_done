// src/app/drift/redirect-handler.jsx
// Client component to handle redirects from language-specific Drift URLs

"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// List of all supported languages in your app
const SUPPORTED_LANGUAGES = [
  'en', 'hi', 'ur', 'ar', 'bn', 'es', 'fr', 'de', 'ja', 'zh',
  'pt', 'ru', 'it', 'ko', 'nl', 'tr', 'vi', 'th', 'pl', 'sv',
  'ta', 'te', 'ml', 'kn', 'mr'
];

// Create regex pattern for matching language-specific Drift URLs
const languagePattern = SUPPORTED_LANGUAGES.join('|');
const LANG_DRIFT_REGEX = new RegExp(`^/(${languagePattern})/drift`);

export function RedirectHandler({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const redirectAttempted = useRef(false);

  useEffect(() => {
    // Check if current path is a language-specific Drift URL
    const isLangDriftUrl = LANG_DRIFT_REGEX.test(pathname);
    
    if (isLangDriftUrl && !redirectAttempted.current) {
      redirectAttempted.current = true;
      
      // Extract the remaining path after /{lang}/drift
      const remainingPath = pathname.replace(LANG_DRIFT_REGEX, '');
      
      // Construct the new URL (English-only Drift)
      const newPath = remainingPath || '/drift';
      const fullNewPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
      
      console.log('🔄 Redirecting:', pathname, '→', fullNewPath);
      
      // Perform the redirect
      router.replace(fullNewPath);
    }
  }, [pathname, router]);

  return <>{children}</>;
}

// Optional: Helper function to check if a path is a language-specific Drift URL
export function isLangDriftPath(pathname) {
  return LANG_DRIFT_REGEX.test(pathname);
}

// Optional: Helper function to get the clean Drift path
export function getCleanDriftPath(pathname) {
  if (!isLangDriftPath(pathname)) return pathname;
  const remainingPath = pathname.replace(LANG_DRIFT_REGEX, '');
  return remainingPath || '/drift';
}