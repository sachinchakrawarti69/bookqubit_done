// src/app/drift/layout-client.jsx

"use client";

import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import DriftSlider from "@/components_drift/layout/slider";
import DriftNavbar from "@/components_drift/layout/navbar/navbar";
import DriftRightSlider from "@/components_drift/layout/rightslider";
import MobileBottomNav from "@/components_drift/layout/navbar/mobile_bottom_nav/mobile_bottom_nav";
import "./drift-layout.css";

export default function DriftLayoutClient({ children }) {
  const pathname = usePathname();
  const params = useParams();
  
  // Get language from URL if present (for future multilingual support)
  const lang = params?.lang || 'en';
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  // Check if current route is active for sidebar items
  const isActiveRoute = (route) => {
    // Handle both /drift and /:lang/drift patterns
    const cleanPathname = pathname?.replace(/^\/(en|hi|ur|ar|bn)/, '') || pathname;
    if (route === "/drift" && (cleanPathname === "/drift" || cleanPathname === "")) return true;
    if (route !== "/drift" && cleanPathname?.startsWith(route)) return true;
    return false;
  };

  // Set RTL for Urdu and Arabic
  const isRTL = lang === 'ur' || lang === 'ar';

  return (
    <div className="drift-layout" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Slider - Desktop */}
      <DriftSlider isMobile={isMobile} isTablet={isTablet} />
      
      {/* Mobile Menu Button (only for mobile) */}
      {isMobile && (
        <button 
          className="drift-mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${showMobileMenu ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      )}

      {/* Main Content Area */}
      <div className={`drift-main-wrapper ${!isMobile ? 'lg:ml-[280px]' : ''}`}>
        {/* Top Navbar */}
        <DriftNavbar />
        
        {/* Main Content with Sidebars */}
        <div className="drift-content-container">
          {/* Center Main Content */}
          <main className="drift-main-content">
            <div className="drift-content-inner">
              {children}
            </div>
          </main>
          
          {/* Right Slider - Desktop & Tablet */}
          {!isMobile && <DriftRightSlider isTablet={isTablet} />}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}

      {/* Mobile Overlay */}
      {isMobile && showMobileMenu && (
        <div 
          className="drift-mobile-overlay"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      {isMobile && showMobileMenu && (
        <div className="drift-mobile-sidebar">
          <div className="drift-mobile-sidebar-header">
            <img 
              src="https://ui-avatars.com/api/?background=0284c7&color=fff&name=User&length=2" 
              alt="User avatar"
              className="drift-mobile-sidebar-avatar"
            />
            <div>
              <h4>BookQubit User</h4>
              <p>@bookqubit</p>
            </div>
          </div>
          <nav className="drift-mobile-sidebar-nav">
            <a href={`/${lang === 'en' ? '' : lang}/drift`} className={`mobile-nav-link ${isActiveRoute('/drift') ? 'active' : ''}`}>
              <span>🏠</span> Home
            </a>
            <a href={`/${lang === 'en' ? '' : lang}/drift/explore`} className={`mobile-nav-link ${isActiveRoute('/drift/explore') ? 'active' : ''}`}>
              <span>🌟</span> Explore
            </a>
            <a href={`/${lang === 'en' ? '' : lang}/drift/bookmarks`} className={`mobile-nav-link ${isActiveRoute('/drift/bookmarks') ? 'active' : ''}`}>
              <span>🔖</span> Bookmarks
            </a>
            <a href={`/${lang === 'en' ? '' : lang}/drift/messages`} className={`mobile-nav-link ${isActiveRoute('/drift/messages') ? 'active' : ''}`}>
              <span>💬</span> Messages
            </a>
            <a href={`/${lang === 'en' ? '' : lang}/drift/settings`} className={`mobile-nav-link ${isActiveRoute('/drift/settings') ? 'active' : ''}`}>
              <span>⚙️</span> Settings
            </a>
          </nav>
          <div className="drift-mobile-sidebar-footer">
            <button className="mobile-logout-btn">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}