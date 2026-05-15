"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  FaTimes,
  FaPalette,
  FaLanguage,
  FaTextHeight,
} from "react-icons/fa";

import { AiOutlineControl } from "react-icons/ai";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

import FontChanger_Mobile from "./FontChanger_Mobile";
import LangSwitch_Mobile from "./LangSwitch_Mobile";
import ThemeSwitchMobile from "./ThemeSwitchMobile";

const Control_Mobile_Slider = () => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("theme");

  const sliderRef = useRef(null);

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // BACKGROUND
  const bgClass =
    theme?.background?.section ||
    (isDarkMode
      ? "bg-gradient-to-b from-gray-900 to-gray-800"
      : "bg-white");

  // BORDER
  const borderClass =
    isDarkMode
      ? "border-gray-700"
      : "border-gray-200";

  // TEXT
  const textPrimary =
    theme?.textColors?.primary ||
    (isDarkMode ? "text-white" : "text-gray-900");

  const textSecondary =
    theme?.textColors?.secondary ||
    (isDarkMode ? "text-gray-400" : "text-gray-500");

  // ACTIVE TAB BG
  const activeBg =
    isDarkMode
      ? "bg-sky-500/20"
      : "bg-sky-100";

  // OPEN/CLOSE
  const toggleSlider = () => {
    setIsOpen((prev) => {
      document.body.style.overflow =
        !prev ? "hidden" : "unset";

      return !prev;
    });
  };

  const closeSlider = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  // ESC CLOSE
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeSlider();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(e.target) &&
        isOpen
      ) {
        closeSlider();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen]);

  // TAB STYLE
  const tabClass = (tab) => `
    flex-1
    flex
    flex-col
    items-center
    gap-1
    p-3
    rounded-xl
    transition-all
    duration-200
    ${
      activeTab === tab
        ? `${activeBg} text-sky-500`
        : `${textSecondary}`
    }
  `;

  return (
    <>
      {/* CONTROL BUTTON */}
      <button
        onClick={toggleSlider}
        aria-label="Control Panel"
        title="Control Panel"
        className="
          w-[42px]
          h-[42px]
          flex
          items-center
          justify-center
          flex-shrink-0
        "
      >
        <AiOutlineControl
          size={24}
          className={
            theme?.textColors?.highlight ||
            "text-sky-500"
          }
        />
      </button>

      {/* OVERLAY */}
      <div
        onClick={closeSlider}
        className={`
          fixed
          inset-0
          bg-black/50
          z-[999]
          transition-opacity
          duration-300

          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
      />

      {/* SLIDER */}
      <div
        ref={sliderRef}
        style={{
          willChange: "transform",
        }}
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-[85%]
          max-w-[400px]
          z-[1000]

          flex
          flex-col

          shadow-2xl
          border-l

          transition-all
          duration-300
          transform

          ${bgClass}
          ${borderClass}

          ${
            isOpen
              ? "translate-x-0 opacity-100 visible pointer-events-auto"
              : "translate-x-full opacity-0 invisible pointer-events-none"
          }
        `}
      >
        {/* HEADER */}
        <div
          className={`
            flex
            items-center
            justify-between
            p-4
            border-b
            flex-shrink-0
            ${borderClass}
            ${bgClass}
          `}
        >
          <div>
            <h3
              className={`
                text-base
                font-bold
                ${textPrimary}
              `}
            >
              Customize
            </h3>

            <p
              className={`
                text-xs
                mt-1
                ${textSecondary}
              `}
            >
              Personalize your experience
            </p>
          </div>

          <button
            onClick={closeSlider}
            className={`
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              border
              transition-all
              duration-200
              ${borderClass}
              ${
                isDarkMode
                  ? "bg-gray-800"
                  : "bg-gray-100"
              }
            `}
          >
            <FaTimes
              className={textSecondary}
              size={15}
            />
          </button>
        </div>

        {/* TABS */}
        <div
          className={`
            flex
            gap-2
            p-4
            border-b
            flex-shrink-0
            ${borderClass}
            ${bgClass}
          `}
        >
          <button
            onClick={() =>
              setActiveTab("theme")
            }
            className={tabClass("theme")}
          >
            <FaPalette size={18} />

            <span className="text-[11px] font-semibold">
              Theme
            </span>
          </button>

          <button
            onClick={() =>
              setActiveTab("language")
            }
            className={tabClass("language")}
          >
            <FaLanguage size={18} />

            <span className="text-[11px] font-semibold">
              Language
            </span>
          </button>

          <button
            onClick={() =>
              setActiveTab("font")
            }
            className={tabClass("font")}
          >
            <FaTextHeight size={18} />

            <span className="text-[11px] font-semibold">
              Font
            </span>
          </button>
        </div>

        {/* CONTENT */}
        <div
          className={`
            flex-1
            overflow-y-auto
            p-4
            min-h-0
            ${bgClass}
          `}
        >
          {activeTab === "theme" && (
            <ThemeSwitchMobile
              onClose={closeSlider}
            />
          )}

          {activeTab === "language" && (
            <LangSwitch_Mobile
              onClose={closeSlider}
            />
          )}

          {activeTab === "font" && (
            <FontChanger_Mobile
              onClose={closeSlider}
            />
          )}
        </div>

        {/* FOOTER */}
        <div
          className={`
            p-4
            border-t
            text-center
            flex-shrink-0
            ${borderClass}
            ${bgClass}
          `}
        >
          <p
            className={`
              text-xs
              ${textSecondary}
            `}
          >
            Customize your reading experience
          </p>
        </div>
      </div>
    </>
  );
};

export default Control_Mobile_Slider;