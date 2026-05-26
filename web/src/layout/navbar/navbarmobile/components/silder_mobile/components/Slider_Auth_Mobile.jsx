"use client";

import { useRouter } from "next/navigation";
import {
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBookReader,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useRTL } from "@/contexts/RTLContext";
import { useFont } from "@/contexts/FontContext";
import "./Slider_Auth_Mobile.css";

// FAKE USER DATA FOR TESTING
const FAKE_USER = {
  uid: "fake_user_123",
  displayName: "Priyal Shrivastava",
  email: "priyal.shrivastava@bookqubit.com",
  photoURL: null,
  emailVerified: true,
};

const Slider_Auth_Mobile = ({
  user,
  onItemClick,
  onLogout,
  useFakeUser = true,
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const { direction } = useRTL();
  const { currentFont } = useFont();

  // Determine which user to display
  const displayUser = useFakeUser && !user ? FAKE_USER : user;

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "PS";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return name.charAt(0).toUpperCase();
  };

  const rankingNumber = 2456;

  const formatRankingNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLogout = async () => {
    if (useFakeUser && !user) {
      onItemClick?.();
      router.push("/");
      return;
    }

    if (onLogout) {
      await onLogout();
    }
    onItemClick?.();
    router.push("/");
  };

  const handleNavigation = (path) => {
    onItemClick?.();
    router.push(path);
  };

  // If user is logged in (real or fake)
  if (displayUser) {
    return (
      <div
        className={`mobile-auth-section border-b transition-colors duration-300 ${theme.background?.section || ""}`}
        dir={direction}
        style={{
          fontFamily: currentFont?.family,
          borderColor: theme.border?.default || "rgba(0,0,0,0.08)",
        }}
      >
        {/* Fake User Badge */}
        {useFakeUser && !user && (
          <div
            className={`fake-user-badge ${theme.background?.badge ? "border" : ""}`}
          >
            <span>Demo Mode</span>
          </div>
        )}

        {/* User Profile Info Card Layout */}
        <div className="mobile-auth-profile">
          <div className="mobile-auth-avatar-wrapper">
            {displayUser?.photoURL ? (
              <img
                src={displayUser.photoURL}
                alt={displayUser.displayName || "User"}
                className="mobile-auth-avatar"
              />
            ) : (
              <div
                className={`mobile-auth-avatar-placeholder ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}`}
              >
                <span className="avatar-initials">
                  {getInitials(displayUser?.displayName || displayUser?.email)}
                </span>
              </div>
            )}
          </div>
          <div className="mobile-auth-info">
            <div
              className={`mobile-auth-name ${theme.textColors?.primary || "text-gray-900"}`}
            >
              {displayUser?.displayName ||
                displayUser?.email?.split("@")[0] ||
                "Priyal Shrivastava"}
            </div>
            <div
              className={`mobile-auth-email ${theme.textColors?.secondary || "text-gray-500"}`}
            >
              {displayUser?.email || "priyal.shrivastava@bookqubit.com"}
            </div>
          </div>
        </div>

        {/* Action Buttons Link Blocks */}
        <div className="mobile-auth-buttons">
          <button
            onClick={() => handleNavigation("/userdashboard")}
            className={`mobile-auth-btn dashboard-btn font-medium transition-all ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} ${theme.buttonColors?.primaryButton?.textColor || "text-white"}`}
          >
            <FaTachometerAlt className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation("/bookwormranking")}
            className={`mobile-auth-btn ranking-btn border font-medium ${theme.background?.navigationDots || "bg-gray-100"} ${theme.textColors?.primary || "text-gray-900"}`}
            style={{ borderColor: theme.border?.default || "rgba(0,0,0,0.1)" }}
          >
            <FaBookReader className="nav-icon" />
            <span className="nav-text">Bookworm Ranking</span>
            <span
              className={`ranking-badge ${theme.buttonColors?.primaryButton?.background || "bg-sky-600"} text-white`}
            >
              #{formatRankingNumber(rankingNumber)}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="mobile-auth-btn logout-btn font-medium"
          >
            <FaSignOutAlt className="nav-icon" />
            <span className="nav-text">
              {useFakeUser && !user ? "Exit Demo" : "Logout"}
            </span>
          </button>
        </div>
      </div>
    );
  }

  // Guest View - Not Logged In
  return (
    <div
      className={`mobile-auth-guest border-b transition-colors duration-300 ${theme.background?.section || ""}`}
      dir={direction}
      style={{
        fontFamily: currentFont?.family,
        borderColor: theme.border?.default || "rgba(0,0,0,0.08)",
      }}
    >
      <div className="mobile-auth-guest-content">
        <div
          className={`mobile-auth-guest-icon ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"}`}
        >
          <FaUser className="text-white" />
        </div>
        <div className="mobile-auth-guest-text">
          <div
            className={`mobile-auth-guest-title ${theme.textColors?.primary || "text-gray-900"}`}
          >
            Welcome Guest
          </div>
          <div
            className={`mobile-auth-guest-subtitle ${theme.textColors?.secondary || "text-gray-500"}`}
          >
            Sign in to continue
          </div>
        </div>
      </div>
      <button
        onClick={() => handleNavigation("/auth/login")}
        className={`mobile-auth-guest-login transition-all font-semibold ${theme.buttonColors?.primaryButton?.background || "bg-gradient-to-r from-sky-600 to-sky-500"} ${theme.buttonColors?.primaryButton?.textColor || "text-white"}`}
      >
        Log In
      </button>
    </div>
  );
};

export default Slider_Auth_Mobile;
