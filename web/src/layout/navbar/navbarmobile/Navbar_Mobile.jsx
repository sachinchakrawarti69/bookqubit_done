"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBell } from "react-icons/fa";
import { useRTL } from "@/contexts/RTLContext";
import { useTheme } from "@/themes/useTheme";
import { useFont } from "@/contexts/FontContext";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Silder_Mobile from "./components/silder_mobile/silder_mobile";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import SearchBar_Mobile from "@/components/searchbar/searchbar_mobile/searchbar_mobile";
import DarkMode_Mobile from "./components/darkmode_mobile/darkmode_mobile";

import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const router = useRouter();
  const { direction } = useRTL();
  const { theme } = useTheme();
  const { currentFont } = useFont();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount] = useState(3);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => router.push("/auth/login");
  const handleNotificationClick = () => router.push("/notifications");
  const handleProfileClick = () => router.push("/auth/profile");

  const getUserInitials = () => {
    if (!user) return "U";
    const displayName = user.displayName || user.email?.split("@")[0] || "User";
    const nameParts = displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  };

  const themeVars = {
    fontFamily: currentFont?.family,
    color: theme.textColors?.primary || "inherit",
    backgroundColor: theme.background?.navbar || "transparent",
    "--nav-border-color": theme.border?.default || "rgba(156, 163, 175, 0.15)",
    "--nav-secondary-color": theme.textColors?.secondary || "inherit",
    "--nav-btn-bg":
      theme.buttonColors?.login?.background || "rgba(156, 163, 175, 0.12)",
    "--nav-btn-text": theme.buttonColors?.login?.text || "inherit",
    "--nav-avatar-bg":
      theme.buttonColors?.primaryButton?.background || "#0ea5e9",
    "--nav-avatar-text": theme.buttonColors?.primaryButton?.text || "#ffffff",
  };

  if (loading) {
    return (
      <nav
        className="navbar-mobile navbar-loading-state h-16 flex items-center px-4 justify-between transition-colors duration-300 w-full max-w-full overflow-hidden box-border"
        dir={direction}
        style={themeVars}
      >
        <div className="navbar-mobile-left flex-shrink-0">
          <div
            className="skeleton-loader w-8 h-8 opacity-20 rounded"
            style={{
              backgroundColor: theme.textColors?.primary || "currentColor",
            }}
          ></div>
        </div>
        <div className="navbar-mobile-center min-w-0 mx-2">
          <div
            className="skeleton-logo w-20 h-6 opacity-20 rounded"
            style={{
              backgroundColor: theme.textColors?.primary || "currentColor",
            }}
          ></div>
        </div>
        <div className="navbar-mobile-right flex gap-1.5 flex-shrink-0">
          <div
            className="skeleton-icon w-6 h-6 opacity-20 rounded-full"
            style={{
              backgroundColor: theme.textColors?.primary || "currentColor",
            }}
          ></div>
          <div
            className="skeleton-icon w-6 h-6 opacity-20 rounded-full"
            style={{
              backgroundColor: theme.textColors?.primary || "currentColor",
            }}
          ></div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="navbar-mobile flex items-center justify-between px-3 h-16 sticky top-0 z-50 transition-colors duration-300 w-full max-w-full overflow-hidden box-border"
      dir={direction}
      style={themeVars}
    >
      {/* Left Section - Menu Icon */}
      <div className="navbar-mobile-left flex items-center flex-shrink-0">
        <Silder_Mobile user={user} />
      </div>

      {/* Center Section - Logo (with strict text clipping protections) */}
      <div className="navbar-mobile-center flex items-center min-w-0 mx-1">
        <Link
          href="/homepages"
          className="navbar-mobile-logo flex items-center gap-1 no-underline min-w-0"
        >
          <span className="logo-icon text-lg flex-shrink-0">📚</span>
          <span
            className="logo-text font-bold text-base truncate"
            style={{
              color: theme.textColors?.logo || theme.textColors?.primary,
            }}
          >
            BookQubit
          </span>
        </Link>
      </div>

      {/* Right Section - Optimized Action Layout Container */}
      <div className="navbar-mobile-right flex items-center gap-1.5 flex-shrink-0">
        <SearchBar_Mobile />
        <DarkMode_Mobile />
        <Control_Mobile_Slider />

        {/* Notification Icon */}
        {isLoggedIn && (
          <button
            className="nav-control-btn notification-btn relative p-1.5 rounded-full transition-colors flex-shrink-0"
            onClick={handleNotificationClick}
            aria-label="Notifications"
            style={{ color: "var(--nav-secondary-color)" }}
          >
            <FaBell size={16} />
            {unreadCount > 0 && (
              <span className="notification-badge absolute top-0.5 right-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Profile Avatar Selection */}
        {isLoggedIn && (
          <button
            className="nav-control-btn profile-btn p-0.5 rounded-full overflow-hidden focus:outline-none flex-shrink-0"
            onClick={handleProfileClick}
            aria-label="Profile"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-avatar w-7 h-7 rounded-full object-cover block"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className="profile-initials w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                style={{
                  backgroundColor: "var(--nav-avatar-bg)",
                  color: "var(--nav-avatar-text)",
                }}
              >
                {getUserInitials()}
              </div>
            )}
          </button>
        )}

        {/* Login Button */}
        {!isLoggedIn && (
          <button
            className="login-btn-nav flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
            onClick={handleLogin}
            style={{
              backgroundColor: "var(--nav-btn-bg)",
              color: "var(--nav-btn-text)",
            }}
          >
            <FaUser size={11} />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Mobile;
