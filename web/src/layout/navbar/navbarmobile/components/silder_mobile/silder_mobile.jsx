"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import Silder_Menu_Mobile from "./components/Silder_Menu_Mobile";
import Slider_Auth_Mobile from "./components/Slider_Auth_Mobile";
import "./silder_mobile.css";

const Silder_Mobile = ({ user = null, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, themeName } = useTheme();
  const { direction, isRTL } = useRTL();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Handle escape key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const handleTriggerKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  };

  return (
    <>
      {/* Menu Trigger */}
      <button
        className={`silder-mobile-trigger ${isOpen ? "active" : ""}`}
        onClick={openMenu}
        onKeyDown={handleTriggerKeyDown}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <span className="silder-mobile-hamburger">
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isOpen ? "open" : ""}`}></span>
        </span>
      </button>

      {/* Sidebar */}
      <aside
        className={`silder-mobile-sidebar ${isOpen ? "open" : ""} ${isRTL ? "rtl" : "ltr"} ${isDarkMode ? "dark" : "light"}`}
        dir={direction}
        aria-hidden={!isOpen}
      >
        {/* Header with Logo */}
        <div className="silder-mobile-header">
          <div className="header-logo-section">
            <div className="logo-icon">📚</div>
            <div className="header-logo">
              <span className="logo-text">BookQubit</span>
              <span className="logo-badge">Beta</span>
            </div>
          </div>
          <button 
            className="header-close-btn" 
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content Container */}
        <div className="silder-mobile-content-wrapper">
          {/* User Section */}
          <div className="silder-mobile-user-section">
            <Slider_Auth_Mobile 
              user={user} 
              onItemClick={closeMenu}
              onLogout={onLogout}
            />
          </div>

          {/* Menu Section */}
          <div className="silder-mobile-menu-section">
            <Silder_Menu_Mobile onItemClick={closeMenu} />
          </div>
        </div>

        {/* Footer */}
        <div className="silder-mobile-footer">
          <p>© 2024 BookQubit. All rights reserved.</p>
          <p className="footer-version">Version 2.0.0</p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="silder-mobile-overlay" 
          onClick={closeMenu}
          role="presentation"
        />
      )}
    </>
  );
};

export default Silder_Mobile;