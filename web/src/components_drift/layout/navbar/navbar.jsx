// src/components_drift/layout/navbar.jsx

"use client";

import { useState, useEffect } from "react";
import DesktopNavbar from "./desktop_navbar/desktop_navbar";
import MobileBottomNav from "./mobile_bottom_nav/mobile_bottom_nav";
import "./navbar.css";

export default function DriftNavbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For desktop, show the full desktop navbar
  if (!isMobile) {
    return <DesktopNavbar />;
  }

  // For mobile, only show bottom navigation
  // The top bar is handled within the mobile bottom nav component
  return (
    <>
      {/* Mobile Top Bar */}
      <header className="drift-mobile-top-bar">
        <div className="drift-mobile-top-bar-container">
          <div className="drift-mobile-logo">
            <h1>Drift</h1>
            <span>by BookQubit</span>
          </div>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="drift-mobile-menu-btn"
          >
            <img 
              src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User" 
              alt="Avatar"
              className="drift-mobile-avatar"
            />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        unreadCount={unreadCount}
      />

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <>
          <div className="drift-mobile-overlay" onClick={() => setShowMobileMenu(false)} />
          <div className="drift-mobile-menu-drawer">
            <div className="drift-mobile-user-info">
              <img 
                src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User" 
                alt="Avatar"
              />
              <div>
                <h4>BookQubit User</h4>
                <p>@bookqubit</p>
              </div>
            </div>
            <div className="drift-mobile-menu-items">
              <a href="/drift/profile" className="drift-mobile-menu-item">Profile</a>
              <a href="/drift/bookmarks" className="drift-mobile-menu-item">Bookmarks</a>
              <a href="/drift/settings" className="drift-mobile-menu-item">Settings</a>
              <a href="/drift/premium" className="drift-mobile-menu-item premium">Premium</a>
              <button className="drift-mobile-menu-item logout">Logout</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}