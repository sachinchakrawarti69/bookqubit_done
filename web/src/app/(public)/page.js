// src/app/(public)/page.jsx
"use client";

import { useTheme } from "@/themes/useTheme";

const HomePage = () => {
  const { theme, themeName } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          BookQubit
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome to BookQubit
        </p>
      </div>
    </div>
  );
};

export default HomePage;