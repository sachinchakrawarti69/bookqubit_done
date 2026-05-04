"use client";

import React from "react";
import { useTheme } from "@/themes/useTheme";

const CopyrightFooter: React.FC = () => {
  const { theme, themeName } = useTheme();
  const currentYear = new Date().getFullYear();

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Dynamic footer theme based on current theme
  const footerTheme = {
    root: `${theme.background?.section || 'bg-white dark:bg-gray-900'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`,
    container: `${theme.layout?.containerWidth || 'max-w-7xl'} mx-auto px-4`,
    text: theme.textColors?.secondary || 'text-gray-600 dark:text-gray-400',
    strong: theme.textColors?.primary || 'text-gray-900 dark:text-white',
  };

  return (
    <section className={footerTheme.root}>
      <div className={`${footerTheme.container} text-center py-4`}>
        <p className={`${footerTheme.text} text-sm`}>
          &copy; {currentYear} <strong className={footerTheme.strong}>BookQubit</strong>. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default CopyrightFooter;