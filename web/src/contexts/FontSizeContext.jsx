// src/contexts/FontSizeContext.jsx

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "./LanguageContext";

// Font size options
export const fontSizes = {
  xsmall: {
    id: "xsmall",
    name: "Extra Small",
    label: "XS",
    size: "12px",
    remValue: "0.75rem",
    scale: 0.75,
    icon: "🔤",
    description: "Compact view",
  },
  small: {
    id: "small",
    name: "Small",
    label: "S",
    size: "14px",
    remValue: "0.875rem",
    scale: 0.875,
    icon: "🔤",
    description: "Comfortable compact",
  },
  medium: {
    id: "medium",
    name: "Medium",
    label: "M",
    size: "16px",
    remValue: "1rem",
    scale: 1.0,
    icon: "🔤",
    description: "Standard reading",
  },
  large: {
    id: "large",
    name: "Large",
    label: "L",
    size: "18px",
    remValue: "1.125rem",
    scale: 1.125,
    icon: "🔤",
    description: "Enhanced readability",
  },
  xlarge: {
    id: "xlarge",
    name: "Extra Large",
    label: "XL",
    size: "20px",
    remValue: "1.25rem",
    scale: 1.25,
    icon: "🔤",
    description: "Easy reading",
  },
  xxlarge: {
    id: "xxlarge",
    name: "XX Large",
    label: "XXL",
    size: "22px",
    remValue: "1.375rem",
    scale: 1.375,
    icon: "🔤",
    description: "Maximum comfort",
  },
};

// Language-specific font size multipliers
// Some scripts need slightly larger base size for better readability
export const languageFontSizeMultipliers = {
  // Default
  default: 1.0,
  
  // South Asian languages - need larger for script complexity
  hi: 1.0625,    // Hindi: 17px
  mr: 1.0625,    // Marathi: 17px
  ta: 1.125,     // Tamil: 18px
  ml: 1.125,     // Malayalam: 18px
  te: 1.0625,    // Telugu: 17px
  kn: 1.0625,    // Kannada: 17px
  bn: 1.0625,    // Bangla: 17px
  
  // RTL languages
  ur: 1.0625,    // Urdu: 17px
  ar: 1.0625,    // Arabic: 17px
  fa: 1.0625,    // Persian: 17px
  ps: 1.0625,    // Pashto: 17px
  
  // East Asian languages
  zh: 1.0,       // Chinese: 16px
  ja: 1.0,       // Japanese: 16px
  ko: 1.0,       // Korean: 16px
  
  // European languages
  en: 1.0,       // English: 16px
  es: 1.0,       // Spanish: 16px
  fr: 1.0,       // French: 16px
  de: 1.0,       // German: 16px
  it: 1.0,       // Italian: 16px
  ru: 1.0,       // Russian: 16px
};

const FontSizeContext = createContext();

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error("useFontSize must be used within FontSizeProvider");
  }
  return context;
};

export const FontSizeProvider = ({ children }) => {
  const { language } = useLanguage();
  const [fontSizeId, setFontSizeId] = useState("medium");
  const [currentSize, setCurrentSize] = useState(fontSizes.medium);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [adjustedFontSize, setAdjustedFontSize] = useState("16px");

  // Get language-specific multiplier
  const getLanguageMultiplier = useCallback((lang) => {
    return languageFontSizeMultipliers[lang] || languageFontSizeMultipliers.default;
  }, []);

  // Calculate adjusted font size based on language
  const calculateAdjustedSize = useCallback((sizeId, lang) => {
    const baseSize = fontSizes[sizeId] || fontSizes.medium;
    const multiplier = getLanguageMultiplier(lang);
    const basePx = parseInt(baseSize.size);
    const adjustedPx = Math.round(basePx * multiplier);
    return `${adjustedPx}px`;
  }, [getLanguageMultiplier]);

  // Apply font size to document
  const applyFontSize = useCallback((sizeId, lang) => {
    const sizeConfig = fontSizes[sizeId];
    if (!sizeConfig) return;

    setIsTransitioning(true);
    
    // Calculate language-adjusted size
    const adjustedSize = calculateAdjustedSize(sizeId, lang);
    setAdjustedFontSize(adjustedSize);
    
    // Apply to root element
    document.documentElement.style.fontSize = adjustedSize;
    
    // Also set a CSS variable for components that need it
    document.documentElement.style.setProperty('--font-size-base', adjustedSize);
    document.documentElement.style.setProperty('--font-size-scale', sizeConfig.scale);
    
    // Add transition class for smooth changes
    document.documentElement.classList.add('font-size-transition');
    
    // Store preference
    localStorage.setItem("bookqubit_font_size", sizeId);
    localStorage.setItem(`bookqubit_font_size_${lang}`, sizeId);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('fontSizeChanged', { 
      detail: { fontSizeId: sizeId, fontSize: sizeConfig, adjustedSize, language: lang } 
    }));
    
    setTimeout(() => {
      document.documentElement.classList.remove('font-size-transition');
      setIsTransitioning(false);
    }, 200);
  }, [calculateAdjustedSize]);

  // Change font size
  const changeFontSize = useCallback((sizeId) => {
    if (fontSizes[sizeId]) {
      setFontSizeId(sizeId);
      setCurrentSize(fontSizes[sizeId]);
      applyFontSize(sizeId, language);
    }
  }, [language, applyFontSize]);

  // Load saved font size preference
  useEffect(() => {
    // Try to get language-specific saved size first
    const savedSizeForLang = localStorage.getItem(`bookqubit_font_size_${language}`);
    const savedSizeGlobal = localStorage.getItem("bookqubit_font_size");
    
    let initialSize = "medium";
    if (savedSizeForLang && fontSizes[savedSizeForLang]) {
      initialSize = savedSizeForLang;
    } else if (savedSizeGlobal && fontSizes[savedSizeGlobal]) {
      initialSize = savedSizeGlobal;
    }
    
    setFontSizeId(initialSize);
    setCurrentSize(fontSizes[initialSize]);
    applyFontSize(initialSize, language);
  }, [language, applyFontSize]);

  // Update font size when language changes (to apply language-specific multiplier)
  useEffect(() => {
    if (fontSizeId) {
      applyFontSize(fontSizeId, language);
    }
  }, [language, fontSizeId, applyFontSize]);

  // Get CSS variable for font size in components
  const getFontSizeCSS = useCallback((level = 'base') => {
    const sizes = {
      base: 'var(--font-size-base)',
      xs: 'calc(var(--font-size-base) * 0.75)',
      sm: 'calc(var(--font-size-base) * 0.875)',
      lg: 'calc(var(--font-size-base) * 1.125)',
      xl: 'calc(var(--font-size-base) * 1.25)',
      '2xl': 'calc(var(--font-size-base) * 1.5)',
      '3xl': 'calc(var(--font-size-base) * 1.875)',
    };
    return sizes[level] || sizes.base;
  }, []);

  // Get current font size with multiplier for a specific language
  const getSizeForLanguage = useCallback((lang, sizeId = fontSizeId) => {
    return calculateAdjustedSize(sizeId, lang);
  }, [fontSizeId, calculateAdjustedSize]);

  const value = useMemo(() => ({
    fontSizeId,
    currentSize,
    fontSizesList: Object.values(fontSizes),
    changeFontSize,
    getFontSizeCSS,
    getSizeForLanguage,
    isTransitioning,
    adjustedFontSize,
    languageMultiplier: getLanguageMultiplier(language),
  }), [fontSizeId, currentSize, changeFontSize, getFontSizeCSS, getSizeForLanguage, isTransitioning, adjustedFontSize, getLanguageMultiplier, language]);

  return (
    <FontSizeContext.Provider value={value}>
      <div className="font-size-provider" style={{ fontSize: 'var(--font-size-base)' }}>
        {children}
      </div>
    </FontSizeContext.Provider>
  );
};

export default FontSizeProvider;