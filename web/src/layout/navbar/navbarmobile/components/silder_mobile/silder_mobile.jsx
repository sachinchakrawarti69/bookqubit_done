"use client";

import { useState, useEffect } from "react";
import { useRTL } from "@/contexts/RTLContext";
import Silder_Menu_Mobile from "./components/Silder_Menu_Mobile";
import Slider_Auth_Mobile from "./components/Slider_Auth_Mobile";
import "./silder_mobile.css";

const Silder_Mobile = ({ user = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { direction, isRTL } = useRTL();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Menu Trigger Button */}
      <button
        className={`silder-mobile-trigger ${isOpen ? "active" : ""}`}
        onClick={openMenu}
        aria-label="Open menu"
      >
        <span className="silder-mobile-hamburger">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </span>
      </button>

      {/* Sidebar */}
      <div
        className={`silder-mobile-sidebar ${isOpen ? "open" : ""} ${isRTL ? "rtl" : "ltr"}`}
        dir={direction}
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
          {/* User Section - 30% */}
          <div className="silder-mobile-user-section">
            <Slider_Auth_Mobile user={user} onItemClick={closeMenu} />
          </div>

          {/* Menu Section - 70% */}
          <div className="silder-mobile-menu-section">
            <Silder_Menu_Mobile onItemClick={closeMenu} />
          </div>
        </div>

        {/* Footer */}
        <div className="silder-mobile-footer">
          <p>© 2024 BookQubit. All rights reserved.</p>
          <p className="footer-version">Version 2.0.0</p>
        </div>
      </div>

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