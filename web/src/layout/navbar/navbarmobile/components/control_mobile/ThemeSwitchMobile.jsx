"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

const ThemeSwitchMobile = ({ onClose }) => {
  const { themeName, changeTheme, theme } = useTheme();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  // TAILWIND CLASSES
  const cardBg =
    isDarkMode
      ? "bg-gray-800"
      : "bg-white";

  const borderClass =
    isDarkMode
      ? "border-gray-700"
      : "border-gray-200";

  const textPrimary =
    theme?.textColors?.primary ||
    (isDarkMode
      ? "text-white"
      : "text-gray-900");

  const textSecondary =
    theme?.textColors?.secondary ||
    (isDarkMode
      ? "text-gray-400"
      : "text-gray-500");

  const activeCard =
    theme?.buttonColors?.primaryButton?.background ||
    "bg-gradient-to-r from-sky-600 to-sky-500";

  const themesList = [
    { key: "light", icon: "☀️", name: "Light" },
    { key: "dark", icon: "🌙", name: "Dark" },
    { key: "forest", icon: "🌲", name: "Forest" },
    { key: "cyberpunk", icon: "🎮", name: "Cyberpunk" },
    { key: "lavender", icon: "🌸", name: "Lavender" },
    { key: "midnight", icon: "🌃", name: "Midnight" },
    { key: "ocean", icon: "🌊", name: "Ocean" },
    { key: "rose", icon: "🌹", name: "Rose" },
    { key: "sand", icon: "🏖️", name: "Sand" },
    { key: "sepia", icon: "📜", name: "Sepia" },
  ];

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);

    if (onClose) {
      setTimeout(() => onClose(), 300);
    }
  };

  return (
    <div className="w-full">
      <div className="max-h-[60vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          {themesList.map((item) => {
            const isActive =
              themeName === item.key;

            return (
              <button
                key={item.key}
                onClick={() =>
                  handleThemeChange(item.key)
                }
                className={`
                  flex items-center gap-2
                  p-3
                  rounded-xl
                  border
                  transition-all duration-200
                  active:scale-95
                  w-full
                  shadow-sm

                  ${
                    isActive
                      ? `${activeCard} border-transparent shadow-lg`
                      : `${cardBg} ${borderClass}`
                  }
                `}
              >
                {/* ICON */}
                <div className="flex-shrink-0">
                  <div
                    className={`
                      w-8 h-8
                      rounded-lg
                      flex items-center justify-center
                      ${
                        isActive
                          ? "bg-white/20"
                          : isDarkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    <span className="text-lg">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* INFO */}
                <div className="flex-1 text-left overflow-hidden">
                  <div
                    className={`
                      text-sm
                      font-semibold
                      truncate
                      ${
                        isActive
                          ? "text-white"
                          : textPrimary
                      }
                    `}
                  >
                    {item.name}
                  </div>

                  <div
                    className={`
                      text-[10px]
                      truncate
                      ${
                        isActive
                          ? "text-white/80"
                          : textSecondary
                      }
                    `}
                  >
                    {isActive
                      ? "Active"
                      : "Tap to apply"}
                  </div>
                </div>

                {/* CHECK */}
                {isActive && (
                  <FaCheck
                    size={12}
                    className="text-white flex-shrink-0"
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

export default ThemeSwitchMobile;