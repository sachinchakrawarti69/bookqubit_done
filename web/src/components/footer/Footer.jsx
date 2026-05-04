"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/themes/useTheme";
import FooterMain from "./components/FooterMain";
import SocialFooter from "./components/SocialFooter";
import LegalFooter from "./components/LegalFooter";
import AIAssistant from "./components/AIAssistant";
import GoUpButton from "./components/GoUpButton";
import ExplorePage from "./components/ExplorePage";
import "./Footer.module.css";

const Footer = () => {
  const { theme, themeName } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer className={`${theme.background?.section || 'bg-white dark:bg-gray-900'} relative overflow-hidden`}>
      {/* Footer Sections */}
      <div className="flex flex-col">
        <FooterMain />
        <ExplorePage />
        <SocialFooter />
        <LegalFooter />
      </div>

      {/* AI Assistant Component - Hidden on mobile */}
      {!isMobile && (
        <div className="hidden md:block">
          <AIAssistant />
        </div>
      )}

      {/* Floating "Go Up" Button Component */}
      <GoUpButton />
    </footer>
  );
};

export default Footer;