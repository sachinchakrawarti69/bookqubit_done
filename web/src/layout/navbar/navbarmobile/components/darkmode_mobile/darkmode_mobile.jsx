"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import "./darkmode_mobile.css";

const DarkMode_Mobile = () => {
  const { themeName, changeTheme } = useTheme();
  
  // Check if currently in dark mode
  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  const toggleDarkMode = () => {
    // Toggle between light and dark
    if (isDarkMode) {
      changeTheme('light');
    } else {
      changeTheme('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`darkmode-mobile-btn ${isDarkMode ? 'dark' : 'light'}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <FaSun className="darkmode-icon sun-icon" size={18} />
      ) : (
        <FaMoon className="darkmode-icon moon-icon" size={18} />
      )}
    </button>
  );
};

export default DarkMode_Mobile;