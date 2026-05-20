// src/components/auth/Mobile_Profile.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import {
  FaUserCircle,
  FaStar,
  FaBookReader,
  FaCrown,
  FaTrophy,
  FaMedal,
  FaFire,
} from "react-icons/fa";

export default function MobileProfile({ user }) {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const [userRank, setUserRank] = useState(null);
  const [rankingNumber, setRankingNumber] = useState(null);

  if (!user) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Generate random ranking and ranking number on component mount
  useEffect(() => {
    const rankings = [
      {
        rank: "Bookworm Novice",
        icon: <FaStar />,
        color: theme.textColors?.highlight || (isDarkMode ? "text-amber-400" : "text-amber-500"),
      },
      {
        rank: "Page Turner",
        icon: <FaStar />,
        color: theme.textColors?.highlight || (isDarkMode ? "text-amber-300" : "text-amber-400"),
      },
      {
        rank: "Story Devourer",
        icon: <FaBookReader />,
        color: "text-emerald-600 dark:text-emerald-400",
      },
      {
        rank: "Literary Sage",
        icon: <FaCrown />,
        color: "text-purple-600 dark:text-purple-400",
      },
      {
        rank: "Chapter Conqueror",
        icon: <FaTrophy />,
        color: "text-rose-600 dark:text-rose-400",
      },
      {
        rank: "Bibliophile Elite",
        icon: <FaMedal />,
        color: "text-sky-600 dark:text-sky-400",
      },
      {
        rank: "Wordsmith Master",
        icon: <FaCrown />,
        color: "text-yellow-600 dark:text-yellow-400",
      },
      {
        rank: "Reading Legend",
        icon: <FaFire />,
        color: "text-orange-600 dark:text-orange-400",
      },
    ];

    const randomRank = rankings[Math.floor(Math.random() * rankings.length)];
    setUserRank(randomRank);

    // Generate a random ranking number between 1 and 10000
    const randomRankNumber = Math.floor(Math.random() * 10000) + 1;
    setRankingNumber(randomRankNumber);
  }, [isDarkMode, theme]);

  // Navigate to profile page on click
  const handleProfileClick = () => {
    router.push("/auth/profile");
  };

  // Format ranking number with commas
  const formatRankingNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get ranking badge style based on position
  const getRankingBadgeStyle = (rank) => {
    if (rank <= 10)
      return "bg-gradient-to-r from-yellow-400 to-amber-500 text-white";
    if (rank <= 100)
      return "bg-gradient-to-r from-gray-300 to-gray-400 text-white";
    if (rank <= 1000)
      return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
    return isDarkMode
      ? "bg-gradient-to-r from-sky-700 to-sky-800 text-white"
      : "bg-gradient-to-r from-sky-500 to-sky-600 text-white";
  };

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  return (
    <button
      onClick={handleProfileClick}
      className={`
        group flex items-center justify-center
        w-10 h-10 rounded-full
        ${theme.background?.navigationDots || (isDarkMode ? "bg-gray-800" : "bg-white")}
        border ${theme.border?.button || (isDarkMode ? "border-gray-600" : "border-gray-300")}
        shadow-md transition-all duration-300
        hover:shadow-lg hover:scale-[1.05]
        active:scale-[0.98] relative
      `}
      aria-label="Go to profile"
    >
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={displayName}
          className="w-8 h-8 rounded-full object-cover border-2 border-white"
        />
      ) : (
        <FaUserCircle
          className={`w-6 h-6 ${theme.textColors?.highlight || (isDarkMode ? "text-blue-400" : "text-sky-600")}`}
        />
      )}

      {/* Ranking Badge */}
      {rankingNumber && rankingNumber <= 1000 && (
        <div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${getRankingBadgeStyle(rankingNumber)} flex items-center justify-center text-[8px] font-bold shadow-sm`}
        >
          {rankingNumber <= 10 ? "🔥" : rankingNumber <= 100 ? "⭐" : "🏆"}
        </div>
      )}
    </button>
  );
}