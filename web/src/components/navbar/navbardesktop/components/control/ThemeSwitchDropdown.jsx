"use client";

import { useTheme } from "@/themes/useTheme";
import { FaCheck } from "react-icons/fa";

const ThemeSwitchDropdown = ({ isInline = false }) => {
  const { themeName, changeTheme, availableThemes, theme } = useTheme();

  const themeConfig = {
    light: { icon: "☀️", name: "Light", color: "text-yellow-500" },
    dark: { icon: "🌙", name: "Dark", color: "text-indigo-400" },
    forest: { icon: "🌲", name: "Forest", color: "text-green-500" },
    cyberpunk: { icon: "🎮", name: "Cyberpunk", color: "text-cyan-400" },
    lavender: { icon: "🌸", name: "Lavender", color: "text-purple-400" },
    midnight: { icon: "🌃", name: "Midnight", color: "text-blue-400" },
    ocean: { icon: "🌊", name: "Ocean", color: "text-cyan-500" },
    rose: { icon: "🌹", name: "Rose", color: "text-pink-500" },
    sand: { icon: "🏖️", name: "Sand", color: "text-amber-500" },
    sepia: { icon: "📜", name: "Sepia", color: "text-amber-700" },
  };

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  if (isInline) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {availableThemes.map((key) => {
          const config = themeConfig[key];
          if (!config) return null;

          const isActive = themeName === key;

          return (
            <button
              key={key}
              onClick={() => changeTheme(key)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                transition-all duration-200 hover:scale-105
                ${
                  isActive
                    ? (theme.buttonColors?.primaryButton?.background ||
                        "bg-gradient-to-r from-sky-600 to-sky-500") +
                      " text-white"
                    : `${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-gray-100")} 
                     ${theme.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900")} 
                     border ${theme.border?.button || (isDarkMode ? "border-gray-700" : "border-gray-300")}`
                }
              `}
            >
              <span className="text-lg">{config.icon}</span>
              <span className="flex-1 text-left text-sm font-medium">
                {config.name}
              </span>
              {isActive && <FaCheck className="w-3 h-3" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Original dropdown version
  return (
    <div className="relative">{/* Your existing dropdown code here */}</div>
  );
};

export default ThemeSwitchDropdown;
