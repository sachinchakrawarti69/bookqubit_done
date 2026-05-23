"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";

const GoToUp = ({ showAfter = 300, smooth = true, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme, themeName } = useTheme();
  const { direction, isRTL } = useRTL();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [showAfter]);

  // Scroll to top function
  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Styles based on theme
  const getButtonStyles = () => {
    const baseStyles = {
      position: "fixed",
      bottom: "2rem",
      [isRTL ? "left" : "right"]: "1.5rem",
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1000,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    };

    if (theme?.button?.primary) {
      return {
        ...baseStyles,
        background: theme.button.primary,
        color: theme.button?.text || "#ffffff",
      };
    }

    if (isDarkMode) {
      return {
        ...baseStyles,
        background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
        color: "#ffffff",
      };
    }

    return {
      ...baseStyles,
      background: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
      color: "#ffffff",
    };
  };

  const buttonStyles = getButtonStyles();

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={buttonStyles}
          className={`go-to-up-btn ${className}`}
          aria-label="Go to top"
          dir={direction}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = buttonStyles.boxShadow;
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
        >
          <FaArrowUp 
            style={{ 
              fontSize: "1.25rem",
              transition: "transform 0.2s ease"
            }} 
          />
        </button>
      )}

      <style jsx>{`
        .go-to-up-btn {
          animation: fadeInUp 0.3s ease;
        }

        .go-to-up-btn:hover svg {
          transform: translateY(-2px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .go-to-up-btn {
            width: 44px !important;
            height: 44px !important;
            bottom: 1.5rem !important;
            ${isRTL ? 'left' : 'right'}: 1rem !important;
          }
          
          .go-to-up-btn svg {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .go-to-up-btn {
            width: 40px !important;
            height: 40px !important;
            bottom: 1rem !important;
            ${isRTL ? 'left' : 'right'}: 0.75rem !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .go-to-up-btn {
            animation: none;
            transition: none;
          }
          
          .go-to-up-btn:hover svg {
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

export default GoToUp;