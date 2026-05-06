"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const DarkMode = () => {
  const { themeName, changeTheme } = useTheme();

  const toggleDarkMode = () => {
    // Always switch to dark theme directly
    changeTheme('dark');
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        p-2 rounded-full transition-all duration-200 
        hover:scale-110 flex items-center justify-center 
        border ${
          themeName === 'dark' 
            ? "border-gray-600 bg-gray-800 hover:bg-gray-700" 
            : "border-gray-300 bg-gray-100 hover:bg-gray-200"
        }
      `}
      aria-label="Switch to dark mode"
      title="Switch to dark mode"
    >
      <FaMoon className={themeName === 'dark' ? "text-blue-400" : "text-gray-600"} size={18} />
    </button>
  );
};

export default DarkMode;