"use client";

import React from "react";
import { FaFont, FaCheck, FaSpinner } from "react-icons/fa";

import { useLanguage } from "@/contexts/LanguageContext";
import { useFont } from "@/contexts/FontContext";
import { useTheme } from "@/themes/useTheme";

const FontChanger_Mobile = ({ onClose }) => {
  const { isRTL } = useLanguage();

  const {
    currentFont,
    availableFonts,
    changeFont,
    isFontLoaded,
  } = useFont();

  const { theme, themeName } = useTheme();

  // DARK MODE CHECK
  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // FIX TAILWIND CLASS ISSUE
  const getSolidColor = (themeClass, fallback) => {
    if (!themeClass || typeof themeClass !== "string") {
      return fallback;
    }

    // DARK COLORS
    if (themeClass.includes("gray-900")) return "#111827";
    if (themeClass.includes("gray-800")) return "#1f2937";
    if (themeClass.includes("gray-700")) return "#374151";
    if (themeClass.includes("gray-600")) return "#4b5563";

    // LIGHT COLORS
    if (themeClass.includes("white")) return "#ffffff";
    if (themeClass.includes("gray-100")) return "#f3f4f6";
    if (themeClass.includes("gray-200")) return "#e5e7eb";

    // SKY COLORS
    if (themeClass.includes("sky-500")) return "#0ea5e9";
    if (themeClass.includes("sky-400")) return "#38bdf8";
    if (themeClass.includes("sky-600")) return "#0284c7";

    // ROSE COLORS
    if (themeClass.includes("rose")) return "#f43f5e";

    return fallback;
  };

  // THEME COLORS
  const cardBg = getSolidColor(
    theme?.background?.navigationDots,
    isDarkMode ? "#1f2937" : "#ffffff"
  );

  const activeBg = getSolidColor(
    theme?.buttonColors?.primaryButton?.background,
    "#0ea5e9"
  );

  const borderColor = getSolidColor(
    theme?.background?.bookCoverSide,
    isDarkMode ? "#374151" : "#e5e7eb"
  );

  const textPrimary = getSolidColor(
    theme?.textColors?.primary,
    isDarkMode ? "#ffffff" : "#111827"
  );

  const textSecondary = getSolidColor(
    theme?.textColors?.secondary,
    isDarkMode ? "#9ca3af" : "#6b7280"
  );

  // CHANGE FONT
  const handleFontChange = (fontId) => {
    changeFont(fontId);

    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  // LOADING
  if (!isFontLoaded && availableFonts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner
          className="animate-spin"
          size={30}
          style={{
            color: activeBg,
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* FONT GRID */}
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          {availableFonts.map((font) => {
            const isActive =
              currentFont?.id === font.id;

            return (
              <button
                key={font.id}
                onClick={() =>
                  handleFontChange(font.id)
                }
                style={{
                  fontFamily: font.family,

                  // FIXED SOLID BACKGROUND
                  backgroundColor: isActive
                    ? activeBg
                    : cardBg,

                  border: `1px solid ${
                    isActive
                      ? activeBg
                      : borderColor
                  }`,

                  opacity: 1,

                  backdropFilter: "none",
                  WebkitBackdropFilter: "none",

                  boxShadow: isActive
                    ? "0 4px 12px rgba(14,165,233,0.25)"
                    : isDarkMode
                    ? "0 2px 8px rgba(0,0,0,0.35)"
                    : "0 2px 6px rgba(0,0,0,0.08)",

                  transition:
                    "all 0.25s ease",
                }}
                className={`
                  flex items-center gap-2
                  p-3 rounded-xl
                  active:scale-95
                  w-full
                  ${
                    isRTL
                      ? "flex-row-reverse"
                      : "flex-row"
                  }
                `}
              >
                {/* ICON */}
                <div className="flex-shrink-0">
                  <div
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.2)"
                        : isDarkMode
                        ? "#374151"
                        : "#f3f4f6",
                    }}
                    className="
                      w-8 h-8
                      rounded-lg
                      flex items-center justify-center
                    "
                  >
                    <FaFont
                      size={13}
                      style={{
                        color: isActive
                          ? "#ffffff"
                          : textPrimary,
                      }}
                    />
                  </div>
                </div>

                {/* FONT INFO */}
                <div
                  className={`
                    flex-1 overflow-hidden
                    ${
                      isRTL
                        ? "text-right"
                        : "text-left"
                    }
                  `}
                >
                  <div
                    style={{
                      color: isActive
                        ? "#ffffff"
                        : textPrimary,
                    }}
                    className="
                      text-sm
                      font-semibold
                      truncate
                    "
                  >
                    {font.name}
                  </div>

                  <div
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.8)"
                        : textSecondary,
                    }}
                    className="
                      text-[10px]
                      truncate
                    "
                  >
                    {isActive
                      ? "Active"
                      : "Tap to apply"}
                  </div>
                </div>

                {/* CHECK */}
                {isActive && (
                  <FaCheck
                    className="flex-shrink-0"
                    size={12}
                    style={{
                      color: "#ffffff",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FontChanger_Mobile;