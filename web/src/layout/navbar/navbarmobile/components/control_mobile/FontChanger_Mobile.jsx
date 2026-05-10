"use client";

import React, { useState, useEffect } from "react";
import { FaTextHeight, FaCheck } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const FontChanger_Mobile = ({ onClose }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState("medium");

  const fontSizes = [
    { id: "small", label: t("font.small") || "Small", size: "14px", scale: 0.9 },
    { id: "medium", label: t("font.medium") || "Medium", size: "16px", scale: 1.0 },
    { id: "large", label: t("font.large") || "Large", size: "18px", scale: 1.1 },
    { id: "xlarge", label: t("font.xlarge") || "Extra Large", size: "20px", scale: 1.2 },
  ];

  useEffect(() => {
    // Load saved font size from localStorage
    const savedFontSize = localStorage.getItem("bookqubit_font_size");
    if (savedFontSize) {
      setCurrentFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
  }, []);

  const applyFontSize = (fontId) => {
    const font = fontSizes.find(f => f.id === fontId);
    if (font) {
      document.documentElement.style.fontSize = font.size;
      localStorage.setItem("bookqubit_font_size", fontId);
    }
  };

  const handleFontChange = (fontId) => {
    setCurrentFontSize(fontId);
    applyFontSize(fontId);
    setIsOpen(false);
    if (onClose) setTimeout(() => onClose(), 300);
  };

  return (
    <div className="mobile-font-changer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-control-button"
      >
        <span className="mobile-control-icon">
          <FaTextHeight />
        </span>
        <span className="mobile-control-label">
          {t("font.font_size") || "Font Size"}
        </span>
        <span className="mobile-control-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="mobile-font-dropdown">
          {fontSizes.map((font) => (
            <button
              key={font.id}
              onClick={() => handleFontChange(font.id)}
              className={`mobile-font-option ${currentFontSize === font.id ? "active" : ""}`}
              style={{ fontSize: font.size }}
            >
              <span className="mobile-font-preview">Aa</span>
              <div className="mobile-font-info">
                <span className="mobile-font-name">{font.label}</span>
                <span className="mobile-font-size">{font.size}</span>
              </div>
              {currentFontSize === font.id && (
                <FaCheck className="mobile-font-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FontChanger_Mobile;