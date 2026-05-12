"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaCheck, FaFont, FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa";

const FontChanger = ({ isInline = false, onFontChange }) => {
  const { theme, themeName } = useTheme();
  const { currentFont, availableFonts, changeFont, isFontLoaded } = useFont();
  const { language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [previewText, setPreviewText] = useState("The quick brown fox jumps over the lazy dog");
  const dropdownRef = useRef(null);

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Set preview text based on language
  useEffect(() => {
    const previews = {
      en: "The quick brown fox jumps over the lazy dog",
      hi: "सभी मनुष्य गरिमा और अधिकारों के मामले में जन्मजात स्वतंत्रता प्राप्त है",
      ur: "تمام انسان آزاد اور حقوق و عزت کے اعتبار سے برابر پیدا ہوئے ہیں",
      ar: "تولد جميع الناس أحراراً متساوين في الكرامة والحقوق",
      bn: "সমস্ত মানুষ স্বাধীনভাবে সমান মর্যাদা এবং অধিকার নিয়ে জন্মগ্রহণ করে",
      mr: "सर्व मानवी व्यक्ती मर्यादा व हक्क बाबतीत स्वतंत्रच जन्माला येतात",
      ta: "மனித பிறவியினர் சகலரும் சுதந்திரமாகவே பிறக்கின்றனர்",
      kn: "ಎಲ್ಲಾ ಮಾನವರು ಸ್ವತಂತ್ರರಾಗಿಯೇ ಹುಟ್ಟುತ್ತಾರೆ ಮತ್ತು ಘನತೆ ಮತ್ತು ಹಕ್ಕುಗಳಲ್ಲಿ ಸಮಾನರು",
      te: "ప్రతిపత్తి మరియు హక్కుల విషయంలో మానవులెల్లరు స్వేచ్ఛగా సమానంగా పుట్టుకొంటారు",
      ml: "മനുഷ്യരെല്ലാവരും സ്വതന്ത്രരായും അന്തസ്സിലും അവകാശങ്ങളിലും തുല്യരായും ജനിക്കുന്നു",
      es: "El zorro marrón rápido salta sobre el perro perezoso",
      ps: "ټول انسان په آزاده توګه له مساوي حقونو او وقار سره زیږیدلي دي",
      zh: "敏捷的棕色狐狸跳过懒狗",
      fr: "Le renard brun rapide saute par-dessus le chien paresseux",
      de: "Der schnelle braune Fuchs springt über den faulen Hund",
      it: "La volpe marrone veloce salta sopra il cane pigro",
      ja: "素早い茶色のキツネが怠惰な犬を飛び越えます",
      ko: "빠른 갈색 여우가 게으른 개를 뛰어 넘습니다",
      fa: "روباه قهوه‌ای سریع از روی سگ تنبل می‌پرد",
      ru: "Быстрая коричневая лиса прыгает через ленивую собаку"
    };
    
    setPreviewText(previews[language] || previews.en);
  }, [language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontChange = (fontId) => {
    changeFont(fontId);
    setIsOpen(false);
    onFontChange?.();
  };

  const getButtonClasses = (isActive = false) => {
    if (isActive) {
      return `${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} text-white shadow-md`;
    }
    return `
      ${theme.background?.card || (isDarkMode ? "bg-gray-800" : "bg-white")}
      ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}
      border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}
      hover:scale-105 transition-all duration-300
    `;
  };

  // Loading state
  if (!isFontLoaded && availableFonts.length === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <FaSpinner className="animate-spin text-sky-500" size={24} />
      </div>
    );
  }

  // Inline version (used inside Control)
  if (isInline) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {availableFonts.map((font) => {
            const isActive = currentFont?.id === font.id;
            return (
              <button
                key={font.id}
                onClick={() => handleFontChange(font.id)}
                style={{ fontFamily: font.family }}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:scale-102 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md"
                    : isDarkMode
                      ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                      : "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100"
                } ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center">
                  <FaFont className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-base">{font.name}</div>
                  <div className="text-xs opacity-70">{font.category}</div>
                </div>
                {isActive && <FaCheck size={16} className="flex-shrink-0" />}
              </button>
            );
          })}
        </div>
        
        {/* Preview Section */}
        <div className={`mt-4 pt-4 border-t ${theme.border?.default || (isDarkMode ? "border-gray-700" : "border-gray-200")}`}>
          <p className={`text-xs text-center mb-3 ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
            Preview
          </p>
          <div 
            className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            style={{ fontFamily: currentFont?.family }}
          >
            <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'} ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              {previewText}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Standalone dropdown version
  const dropdownBg = theme.background?.section || (isDarkMode ? "bg-gray-900" : "bg-white");
  const borderColor = theme.border?.default || (isDarkMode ? "border-gray-700" : "border-gray-200");
  const headerBg = theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-50");

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${getButtonClasses(false)}`}
      >
        <FaFont size={16} />
        <span className="text-sm font-medium hidden sm:inline">
          {currentFont?.name || "Font"}
        </span>
        {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
      </button>

      {isOpen && (
        <div 
          className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-96 rounded-xl shadow-2xl border z-50 overflow-hidden ${dropdownBg} ${borderColor}`}
          style={{ [isRTL ? 'left' : 'right']: 0 }}
        >
          <div className={`px-4 py-3 border-b ${headerBg} ${borderColor}`}>
            <h3 className={`text-sm font-semibold ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")}`}>
              Choose Font
            </h3>
            <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")} mt-1`}>
              Select your preferred reading font
            </p>
          </div>
          
          <div className="p-3 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {availableFonts.map((font) => {
                const isActive = currentFont?.id === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => handleFontChange(font.id)}
                    style={{ fontFamily: font.family }}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 hover:scale-102 ${
                      isActive
                        ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md"
                        : isDarkMode
                          ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
                          : "bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100"
                    } ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-gradient-to-r from-sky-400 to-blue-500'}`}>
                        <FaFont className={`${isActive ? 'text-white' : 'text-white'}`} size={16} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium">{font.name}</div>
                        <div className="text-xs opacity-70">{font.category}</div>
                      </div>
                    </div>
                    {isActive && <FaCheck className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Preview in dropdown */}
          <div className={`px-4 py-3 border-t ${headerBg} ${borderColor}`}>
            <p className={`text-xs text-center mb-2 ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Preview
            </p>
            <div 
              className="p-2 rounded-lg text-center text-sm"
              style={{ fontFamily: currentFont?.family }}
            >
              {previewText.substring(0, 50)}...
            </div>
          </div>
          
          <div className={`px-4 py-2 border-t text-center ${headerBg} ${borderColor}`}>
            <p className={`text-xs ${theme.textColors?.secondary || (isDarkMode ? "text-gray-400" : "text-gray-500")}`}>
              Font settings are saved automatically
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FontChanger;