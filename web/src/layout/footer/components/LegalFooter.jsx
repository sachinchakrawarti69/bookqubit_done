"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";

const LegalFooter = () => {
  const { theme, themeName } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const legalLinks = [
    { name: "Terms of Service", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Copyright Policy", path: "/copyright" },
    { name: "GDPR Compliance", path: "/gdpr" },
    { name: "Accessibility", path: "/accessibility" },
  ];

  return (
    <section
      className={`
        ${theme.background?.section || 'bg-white dark:bg-gray-900'}
        border-t 
        ${isDarkMode ? "border-gray-800" : "border-gray-200"}
        py-6
      `}
    >
      <div className={`${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4`}>
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`
                text-xs
                ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}
                hover:${theme.textColors?.highlight || 'text-sky-600 dark:text-sky-400'}
                transition-colors duration-200
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className={`text-center text-xs ${theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400'}`}>
          <p>© {new Date().getFullYear()} BookQubit. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default LegalFooter;