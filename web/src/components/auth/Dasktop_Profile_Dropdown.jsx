"use client";

import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaBookReader,
  FaChevronDown,
  FaCrown,
  FaStar,
  FaTrophy,
  FaMedal,
  FaFire,
  FaTimes,
} from "react-icons/fa";

export default function UserDropDown({ user, darkMode = false }) {
  const [open, setOpen] = useState(false);
  const [userRank, setUserRank] = useState(null);
  const [rankingNumber, setRankingNumber] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Generate random ranking and ranking number on component mount
  useEffect(() => {
    const rankings = [
      {
        rank: "Bookworm Novice",
        icon: <FaStar />,
        color: "text-amber-500",
        bgColor: darkMode ? "bg-amber-900/30" : "bg-amber-50",
        borderColor: darkMode ? "border-amber-800" : "border-amber-200",
      },
      {
        rank: "Page Turner",
        icon: <FaStar />,
        color: "text-amber-400",
        bgColor: darkMode ? "bg-amber-900/30" : "bg-amber-50",
        borderColor: darkMode ? "border-amber-800" : "border-amber-200",
      },
      {
        rank: "Story Devourer",
        icon: <FaBookReader />,
        color: "text-emerald-600",
        bgColor: darkMode ? "bg-emerald-900/30" : "bg-emerald-50",
        borderColor: darkMode ? "border-emerald-800" : "border-emerald-200",
      },
      {
        rank: "Literary Sage",
        icon: <FaCrown />,
        color: "text-purple-600",
        bgColor: darkMode ? "bg-purple-900/30" : "bg-purple-50",
        borderColor: darkMode ? "border-purple-800" : "border-purple-200",
      },
      {
        rank: "Chapter Conqueror",
        icon: <FaTrophy />,
        color: "text-rose-600",
        bgColor: darkMode ? "bg-rose-900/30" : "bg-rose-50",
        borderColor: darkMode ? "border-rose-800" : "border-rose-200",
      },
      {
        rank: "Bibliophile Elite",
        icon: <FaMedal />,
        color: "text-sky-600",
        bgColor: darkMode ? "bg-sky-900/30" : "bg-sky-50",
        borderColor: darkMode ? "border-sky-800" : "border-sky-200",
      },
      {
        rank: "Wordsmith Master",
        icon: <FaCrown />,
        color: "text-yellow-600",
        bgColor: darkMode ? "bg-yellow-900/30" : "bg-yellow-50",
        borderColor: darkMode ? "border-yellow-800" : "border-yellow-200",
      },
      {
        rank: "Reading Legend",
        icon: <FaFire />,
        color: "text-orange-600",
        bgColor: darkMode ? "bg-orange-900/30" : "bg-orange-50",
        borderColor: darkMode ? "border-orange-800" : "border-orange-200",
      },
    ];

    const randomRank = rankings[Math.floor(Math.random() * rankings.length)];
    setUserRank(randomRank);

    // Generate a random ranking number between 1 and 10000
    const randomRankNumber = Math.floor(Math.random() * 10000) + 1;
    setRankingNumber(randomRankNumber);
  }, [darkMode]); // Re-run if darkMode changes (for bgColor etc.)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open, isMobile]);

  const handleLogout = async () => {
    await auth.signOut();
    setOpen(false);
    router.push("/login");
  };

  const handleNavigate = (path) => {
    setOpen(false);
    router.push(path);
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
    return darkMode
      ? "bg-gradient-to-r from-sky-700 to-sky-800 text-white"
      : "bg-gradient-to-r from-sky-500 to-sky-600 text-white";
  };

  // Mobile version of the button (simpler, no text)
  const MobileButton = () => (
    <button
      onClick={() => setOpen(!open)}
      className={`
        group flex items-center justify-center
        w-10 h-10 rounded-full
        ${darkMode ? "bg-gray-800" : "bg-white"}
        border ${darkMode ? "border-gray-600" : "border-gray-300"}
        shadow-md transition-all duration-300
        hover:shadow-lg hover:scale-[1.05]
        active:scale-[0.98] relative
      `}
      aria-label="User menu"
    >
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt="User"
          className="w-8 h-8 rounded-full object-cover border-2 border-white"
        />
      ) : (
        <FaUserCircle
          className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
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

  // Desktop version of the button (with text)
  const DesktopButton = () => (
    <button
      onClick={() => setOpen(!open)}
      className={`
        group flex items-center gap-2 px-3 py-2 rounded-xl
        ${
          darkMode
            ? `bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600`
            : `bg-gradient-to-r from-white to-sky-50 border-sky-200/70 hover:border-sky-300`
        }
        border shadow-md transition-all duration-300
        hover:shadow-lg hover:scale-[1.02]
        active:scale-[0.98] relative
      `}
    >
      {/* Avatar with Glow Effect */}
      <div className="relative">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`}
        ></div>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center`}
          >
            <FaUserCircle
              className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
            />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="text-left hidden sm:block">
        <span
          className={`block text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"} leading-tight`}
        >
          {user.displayName || user.email?.split("@")[0]}
        </span>
        {userRank && (
          <span
            className={`flex items-center gap-1 text-xs ${userRank.color} font-medium`}
          >
            {userRank.icon}
            <span className="truncate max-w-[100px]">{userRank.rank}</span>
          </span>
        )}
      </div>

      {/* Ranking Badge */}
      {rankingNumber && rankingNumber <= 1000 && (
        <div
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${getRankingBadgeStyle(rankingNumber)} flex items-center justify-center text-[10px] font-bold shadow-sm`}
        >
          {rankingNumber <= 10 ? "🔥" : rankingNumber <= 100 ? "⭐" : "🏆"}
        </div>
      )}

      {/* Animated Chevron */}
      <FaChevronDown
        className={`
          w-3 h-3 transition-transform duration-300 ${darkMode ? "text-gray-400" : "text-gray-500"} hidden sm:block
          ${open ? "rotate-180" : ""}
        `}
      />
    </button>
  );

  // Mobile dropdown (full screen)
  const MobileDropdown = () => (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dropdown Sheet */}
      <div
        className={`
          relative w-full max-w-sm mx-4 rounded-2xl
          ${darkMode ? "bg-gray-800" : "bg-white"}
          border ${darkMode ? "border-gray-700" : "border-gray-200"}
          shadow-xl
          animate-slide-up
          max-h-[80vh] overflow-y-auto
        `}
      >
        {/* Header */}
        <div
          className={`sticky top-0 ${darkMode ? "bg-gray-800" : "bg-white"} p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}
        >
          <h3
            className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            Account
          </h3>
          <button
            onClick={() => setOpen(false)}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
          >
            <FaTimes className={darkMode ? "text-gray-400" : "text-gray-500"} />
          </button>
        </div>

        {/* User Info */}
        <div className={`p-4 ${userRank?.bgColor || ""}`}>
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center`}
              >
                <FaUserCircle
                  className={`w-12 h-12 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
                />
              </div>
            )}
            <div className="flex-1">
              <p
                className={`text-base font-bold ${darkMode ? "text-gray-200" : "text-gray-800"}`}
              >
                {user.displayName || user.email?.split("@")[0]}
              </p>
              <p
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {user.email}
              </p>
              {userRank && (
                <div
                  className={`flex items-center gap-2 mt-2 ${userRank.color}`}
                >
                  {userRank.icon}
                  <span className="text-xs font-semibold">{userRank.rank}</span>
                </div>
              )}
            </div>
          </div>

          {/* Ranking */}
          {rankingNumber && (
            <div className="mt-3 flex items-center justify-between">
              <div
                className={`px-3 py-1.5 rounded-lg ${getRankingBadgeStyle(rankingNumber)} text-xs font-bold`}
              >
                #{formatRankingNumber(rankingNumber)} Global Rank
              </div>
              <span
                className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Top {Math.round((rankingNumber / 10000) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {[
            {
              label: "Profile",
              path: "/auth/profile",
              icon: (
                <FaUser
                  className={darkMode ? "text-blue-400" : "text-sky-600"}
                />
              ),
              description: "View and edit your profile",
            },
            {
              label: "Dashboard",
              path: "/userdashboard",
              icon: <FaTachometerAlt className="text-emerald-500" />,
              description: "Your reading dashboard",
            },
            {
              label: "Bookworm Ranking",
              path: "/bookwormranking",
              icon: <FaBookReader className="text-amber-500" />,
              description: rankingNumber
                ? `Rank #${formatRankingNumber(rankingNumber)} worldwide`
                : "See your reading rank",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`
                w-full text-left px-4 py-4 flex items-start gap-3
                ${darkMode ? "bg-gray-700" : "bg-gray-100"}
                rounded-xl mb-2
                active:scale-[0.98] transition-all
              `}
            >
              <div
                className={`mt-0.5 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`block font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}
                  >
                    {item.label}
                  </span>
                  {item.label === "Bookworm Ranking" && rankingNumber && (
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold ${getRankingBadgeStyle(rankingNumber)}`}
                    >
                      #{formatRankingNumber(rankingNumber)}
                    </div>
                  )}
                </div>
                <span
                  className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1 block`}
                >
                  {item.description}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div
          className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Conditional Button */}
      {isMobile ? <MobileButton /> : <DesktopButton />}

      {/* Conditional Dropdown */}
      {open &&
        (isMobile ? (
          <MobileDropdown />
        ) : (
          <div
            className={`
            absolute right-0 mt-2 w-72 
            ${darkMode ? "bg-gray-800/95" : "bg-white/95"} backdrop-blur-sm
            border ${darkMode ? "border-gray-700" : "border-sky-200/50"} 
            shadow-xl ${darkMode ? "shadow-gray-900/50" : "shadow-sky-100/50"} 
            z-50 rounded-xl overflow-hidden
            animate-in slide-in-from-top-5 duration-200
          `}
            style={{
              animation: "slideDown 0.2s ease-out",
            }}
          >
            {/* Desktop Dropdown Content */}
            <div
              className={`${userRank?.bgColor || (darkMode ? "bg-gray-800" : "bg-gradient-to-r from-sky-50 to-purple-50")} px-4 py-3 border-b ${userRank?.borderColor || (darkMode ? "border-gray-700" : "border-sky-100")}`}
            >
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center`}
                  >
                    <FaUserCircle
                      className={`w-10 h-10 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-bold ${darkMode ? "text-blue-400" : "text-sky-600"} truncate`}
                  >
                    {user.displayName || user.email}
                  </p>
                  <p
                    className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} truncate`}
                  >
                    {user.email}
                  </p>
                  {userRank && (
                    <div
                      className={`flex items-center gap-2 mt-1 ${userRank.color}`}
                    >
                      {userRank.icon}
                      <span className="text-xs font-semibold">
                        {userRank.rank}
                      </span>
                    </div>
                  )}
                </div>
                {rankingNumber && (
                  <div className="flex flex-col items-center">
                    <div
                      className={`px-2 py-1 rounded-lg ${getRankingBadgeStyle(rankingNumber)} text-xs font-bold`}
                    >
                      #{formatRankingNumber(rankingNumber)}
                    </div>
                    <span
                      className={`text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}
                    >
                      Global Rank
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="py-1">
              {[
                {
                  label: "Profile",
                  path: "/auth/profile",
                  icon: (
                    <FaUser
                      className={darkMode ? "text-blue-400" : "text-sky-600"}
                    />
                  ),
                  description: "View and edit your profile",
                },
                {
                  label: "Dashboard",
                  path: "/userdashboard",
                  icon: <FaTachometerAlt className="text-emerald-500" />,
                  description: "Your reading dashboard",
                },
                {
                  label: "Bookworm Ranking",
                  path: "/bookwormranking",
                  icon: <FaBookReader className="text-amber-500" />,
                  description: rankingNumber
                    ? `Rank #${formatRankingNumber(rankingNumber)} worldwide`
                    : "See your reading rank",
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                  w-full text-left px-4 py-3 flex items-start gap-3
                  hover:bg-gradient-to-r ${darkMode ? "hover:from-gray-700/50" : "hover:from-sky-50/50"} hover:to-transparent 
                  transition-all duration-200 group/item
                  border-b ${darkMode ? "border-gray-700" : "border-sky-50"} last:border-b-0
                  hover:pl-5 relative
                `}
                >
                  <div
                    className={`mt-1 ${darkMode ? "text-blue-400" : "text-sky-600"}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`block font-medium ${darkMode ? "text-gray-200" : "text-gray-800"} group-hover/item:text-sky-600 transition-colors`}
                      >
                        {item.label}
                      </span>
                      {item.label === "Bookworm Ranking" && rankingNumber && (
                        <div
                          className={`flex items-center gap-1 ${rankingNumber <= 1000 ? "animate-pulse" : ""}`}
                        >
                          <div
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRankingBadgeStyle(rankingNumber)}`}
                          >
                            #{formatRankingNumber(rankingNumber)}
                          </div>
                          {rankingNumber <= 100 && (
                            <FaCrown className="text-yellow-500 text-xs" />
                          )}
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} mt-0.5 block`}
                    >
                      {item.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {rankingNumber && (
              <div
                className={`px-4 py-2 border-t ${darkMode ? "border-gray-700 bg-gray-900" : "border-sky-100 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Ranking Progress
                  </span>
                  <span
                    className={`text-xs font-semibold ${darkMode ? "text-blue-400" : "text-sky-600"}`}
                  >
                    Top {Math.round((rankingNumber / 10000) * 100)}%
                  </span>
                </div>
                <div
                  className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-1.5`}
                >
                  <div
                    className={`h-1.5 rounded-full ${rankingNumber <= 1000 ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-sky-400 to-blue-500"}`}
                    style={{
                      width: `${Math.max(5, (1 - rankingNumber / 10000) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            <div
              className={`relative px-3 py-2 border-t ${darkMode ? "border-gray-700" : "border-sky-100"}`}
            >
              <div
                className={`absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent ${darkMode ? "via-gray-600" : "via-sky-200"} to-transparent`}
              ></div>
              <button
                onClick={handleLogout}
                className={`
                w-full text-left px-4 py-2.5 flex items-center gap-2 
                text-rose-600 hover:text-rose-700 hover:bg-gradient-to-r 
                ${darkMode ? "hover:from-rose-900/30" : "hover:from-rose-50/50"} hover:to-transparent transition-all duration-200
                rounded-lg group/logout font-medium
              `}
              >
                <FaSignOutAlt className="group-hover/logout:translate-x-1 transition-transform" />
                Logout
                <span
                  className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} ml-auto`}
                >
                  ({user.email?.split("@")[0]})
                </span>
              </button>
            </div>
          </div>
        ))}

      {/* Keyframes for animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
