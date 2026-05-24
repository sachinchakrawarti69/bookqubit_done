"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaTimes, FaPalette, FaLanguage, FaTextHeight } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

import ThemeSwitchMobile from "../themeswitch_mobile/ThemeSwitchMobile";
import LangSwitch_Mobile from "../langswitch_mobile/LangSwitch_Mobile";
import FontChanger_Mobile from "../fontchanger_mobile/FontChanger_Mobile";

import "./Control_Mobile_Slider.css";

export default function Control_Mobile_Slider() {
  const { theme, themeName } = useTheme();
  const { direction, isRTL } = useRTL();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("theme");
  const sliderRef = useRef(null);
  const openButtonRef = useRef(null);

  const dark = ["dark", "midnight", "cyberpunk"].includes(themeName);

  const bg = theme?.background?.section || (dark ? "bg-gray-900" : "bg-white");
  const border = dark ? "border-gray-700" : "border-gray-200";
  const text =
    theme?.textColors?.primary || (dark ? "text-white" : "text-gray-900");
  const secondary =
    theme?.textColors?.secondary || (dark ? "text-gray-400" : "text-gray-500");
  const active = dark
    ? "bg-sky-500/20 text-sky-400"
    : "bg-sky-100 text-sky-600";

  const lockScroll = () => {
    // Get current scroll position
    const scrollY = window.scrollY;
    // Store scroll position in a data attribute
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add("slider-open");
    document.documentElement.classList.add("slider-open");
  };

  const unlockScroll = () => {
    // Get stored scroll position
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    document.body.classList.remove("slider-open");
    document.documentElement.classList.remove("slider-open");
    document.body.style.top = "";
    // Restore scroll position
    window.scrollTo(0, scrollY);
  };

  const open = () => {
    setIsOpen(true);
    lockScroll();
  };

  const close = () => {
    setIsOpen(false);
    unlockScroll();
  };

  useEffect(() => {
    return () => {
      if (isOpen) {
        unlockScroll();
      }
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };

    const handleOutside = (e) => {
      if (
        isOpen &&
        sliderRef.current &&
        !sliderRef.current.contains(e.target) &&
        openButtonRef.current &&
        !openButtonRef.current.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  const TabButton = ({ icon: Icon, label, tabKey }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex-1 p-3 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 ${
        activeTab === tabKey ? active : secondary
      } hover:opacity-80`}
      aria-label={`Switch to ${label} tab`}
      role="tab"
      aria-selected={activeTab === tabKey}
    >
      <Icon size={18} />
      <span className="text-[11px] font-medium">{label}</span>
    </button>
  );

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={isOpen ? close : open}
        className="w-[42px] h-[42px] flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label={isOpen ? "Close settings" : "Open settings"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <AiOutlineControl
          size={24}
          className={theme?.textColors?.highlight || "text-sky-500"}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] transition-all duration-300"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slider Panel */}
      <aside
        ref={sliderRef}
        dir={direction}
        className={`control-mobile-slider fixed top-0 z-[1000] h-full transition-transform duration-300 ease-in-out ${bg} ${border} ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Customization settings"
        aria-modal="true"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          className={`p-4 border-b flex justify-between items-center ${border}`}
        >
          <div className="min-w-0 flex-1">
            <h3 className={`font-bold ${text} truncate`}>Customize</h3>
            <p className={`text-xs ${secondary} truncate`}>
              Personalize your experience
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 flex-shrink-0 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Close settings"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-2 p-4 border-b ${border}`}
          role="tablist"
          aria-label="Settings categories"
        >
          <TabButton icon={FaPalette} label="Theme" tabKey="theme" />
          <TabButton icon={FaLanguage} label="Language" tabKey="language" />
          <TabButton icon={FaTextHeight} label="Font" tabKey="font" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 break-words">
          <div className="break-words">
            {activeTab === "theme" && (
              <div role="tabpanel" aria-label="Theme settings">
                <ThemeSwitchMobile onClose={close} />
              </div>
            )}
            {activeTab === "language" && (
              <div role="tabpanel" aria-label="Language settings">
                <LangSwitch_Mobile onClose={close} />
              </div>
            )}
            {activeTab === "font" && (
              <div role="tabpanel" aria-label="Font settings">
                <FontChanger_Mobile onClose={close} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t p-4 ${border}`}>
          <p className={`text-xs text-center ${secondary} break-words`}>
            Customize your reading experience
          </p>
        </div>
      </aside>
    </>
  );
}
