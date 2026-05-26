"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import Silder_Menu_Mobile from "./components/Silder_Menu_Mobile";
import Slider_Auth_Mobile from "./components/Slider_Auth_Mobile";
import "./silder_mobile.css";

const Silder_Mobile = ({ user = null, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { direction } = useRTL();
  const { currentFont } = useFont();

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
      {/* Simplified Menu Trigger */}
      <button
        className={`silder-mobile-trigger-simple ${isOpen ? "active" : ""} ${theme.textColors?.primary || "text-gray-900"}`}
        onClick={openMenu}
        onKeyDown={handleTriggerKeyDown}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Sidebar Container Panel */}
      <aside
        className={`silder-mobile-sidebar transition-all duration-300 ${isOpen ? "open" : ""} ${theme.background?.section || ""}`}
        dir={direction}
        aria-hidden={!isOpen}
        style={{
          fontFamily: currentFont?.family,
          color: theme.textColors?.primary,
          "--panel-border":
            theme.border?.default || "rgba(156, 163, 175, 0.15)",
          "--panel-secondary-text": theme.textColors?.secondary || "inherit",
          "--active-outline":
            theme.buttonColors?.primaryButton?.background || "#0ea5e9",
        }}
      >
        {/* Top Control Header with integrated Close Button */}
        <div className="silder-mobile-top-controls">
          <button
            className="header-close-btn-top"
            onClick={closeMenu}
            aria-label="Close menu"
            style={{ color: theme.textColors?.secondary }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 1. AUTH COMPONENT */}
        <div className="silder-mobile-user-section">
          <Slider_Auth_Mobile
            user={user}
            onItemClick={closeMenu}
            onLogout={onLogout}
          />
        </div>

        {/* 2. SCROLLABLE NAVIGATION CONTENT */}
        <div className="silder-mobile-content-wrapper">
          <div className="silder-mobile-menu-section">
            <Silder_Menu_Mobile onItemClick={closeMenu} />
          </div>
        </div>

        {/* 3. FOOTER */}
        <div className="silder-mobile-footer">
          <p>© 2026. All rights reserved.</p>
          <p className="footer-version">Version 2.0.0</p>
        </div>
      </aside>

      {/* Overlay Background Glass Layout */}
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
