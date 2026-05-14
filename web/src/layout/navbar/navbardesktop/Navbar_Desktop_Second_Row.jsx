// src/layout/navbar/navbardesktop/Navbar_Desktop_Second_Row.jsx

"use client";

import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import { NavItem } from "./components/NavItem";
import "./Navbar_Desktop_Second_Row.css";

const Navbar_Desktop_Second_Row = () => {
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();
  const { currentFont } = useFont();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  return (
    <div
      className={`navbar-desktop-second-row ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")}`}
      dir={isRTL ? "rtl" : "ltr"}
      style={{ fontFamily: currentFont?.family || 'inherit' }}
    >
      <div className="navbar-desktop-links-container">
        <NavItem />
      </div>
    </div>
  );
};

export default Navbar_Desktop_Second_Row;