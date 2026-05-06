"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/themes/useTheme";
import {
  FaPenFancy,
  FaLayerGroup,
  FaPaintBrush,
  FaBuilding,
  FaMask,
  FaClock,
  FaAward,
  FaStar,
} from "react-icons/fa";

const sections = [
  {
    title: "Comic Writers",
    icon: <FaPenFancy />,
    categoryPath: "comics/comic-writers",
  },
  {
    title: "Comic Series",
    icon: <FaLayerGroup />,
    categoryPath: "comics/comic-series",
  },
  {
    title: "Comic Artists",
    icon: <FaPaintBrush />,
    categoryPath: "comics/comic-artists",
  },
  {
    title: "Publishers",
    icon: <FaBuilding />,
    categoryPath: "comics/comic-publishers",
  },
  {
    title: "Characters",
    icon: <FaMask />,
    categoryPath: "comics/comic-characters",
  },
  {
    title: "Comic Eras",
    icon: <FaClock />,
    categoryPath: "comics/comic-eras",
  },
  // {
  //   title: "Comic Awards",
  //   icon: <FaAward />,
  //   categoryPath: "/comics/awards",
  // },
  // {
  //   title: "Iconic Issues",
  //   icon: <FaStar />,
  //   categoryPath: "/comics/issues",
  // },
];

const ComicsMenu = () => {
  const { theme, themeName } = useTheme();

  // Guard against undefined theme
  if (!theme) {
    return null;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <div className={`${theme.background?.section || (isDarkMode ? 'bg-gray-900' : 'bg-white')} py-6`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.categoryPath}
              className={`
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
                whitespace-nowrap transition-all duration-200 
                ${theme.background?.navigationDots || (isDarkMode ? 'bg-gray-800' : 'bg-gray-100')} 
                ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')} 
                ${theme.border?.button || 'border border-gray-200 dark:border-gray-700'} 
                hover:shadow-md hover:scale-105 active:scale-95
              `}
            >
              <span className="text-base">{section.icon}</span>
              <span className="text-sm font-medium">{section.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicsMenu;