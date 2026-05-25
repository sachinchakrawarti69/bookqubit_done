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
import "./Slider_Auth_Mobile.css";

// FAKE USER DATA FOR TESTING
const FAKE_USER = {
  uid: "fake_user_123",
  displayName: "Priyal Shrivastava",
  email: "priyal.shrivastava@bookqubit.com",
  photoURL: null, // No photo, will show initials
  emailVerified: true,
};

const Slider_Auth_Mobile = ({ user, onItemClick, onLogout, useFakeUser = true }) => {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { direction, isRTL } = useRTL();

  const isDarkMode = themeName === "dark" || themeName === "midnight" || themeName === "cyberpunk";

  // Determine which user to display
  const displayUser = (useFakeUser && !user) ? FAKE_USER : user;

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "PS"; // Default for Priyal Shrivastava
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
    // If using fake user, just redirect without actual logout
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
      <div className={`mobile-auth-section ${isDarkMode ? 'dark' : 'light'}`} dir={direction}>
        {/* Fake User Badge - Only show for fake user */}
        {useFakeUser && !user && (
          <div className="fake-user-badge">
            <span>Demo Mode</span>
          </div>
        )}

        {/* User Profile */}
        <div className={`mobile-auth-profile ${isRTL ? "rtl" : "ltr"}`}>
          <div className="mobile-auth-avatar-wrapper">
            {displayUser?.photoURL ? (
              <img
                src={displayUser.photoURL}
                alt={displayUser.displayName || "User"}
                className="mobile-auth-avatar"
              />
            ) : (
              <div className="mobile-auth-avatar-placeholder">
                <span className="avatar-initials">
                  {getInitials(displayUser?.displayName || displayUser?.email)}
                </span>
              </div>
            )}
          </div>
          <div className="mobile-auth-info">
            <div className="mobile-auth-name">
              {displayUser?.displayName || displayUser?.email?.split('@')[0] || "Priyal Shrivastava"}
            </div>
            <div className="mobile-auth-email">
              {displayUser?.email || "priyal.shrivastava@bookqubit.com"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mobile-auth-buttons">
          <button
            onClick={() => handleNavigation("/userdashboard")}
            className="mobile-auth-btn dashboard-btn"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation("/bookwormranking")}
            className="mobile-auth-btn ranking-btn"
          >
            <FaBookReader />
            <span>Bookworm Ranking</span>
            <span className="ranking-badge">
              #{formatRankingNumber(rankingNumber)}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="mobile-auth-btn logout-btn"
          >
            <FaSignOutAlt />
            <span>{useFakeUser && !user ? "Exit Demo" : "Logout"}</span>
          </button>
        </div>
      </div>
    );
  }

  // Guest View - Not Logged In (only shown if no fake user and no real user)
  return (
    <div className={`mobile-auth-guest ${isDarkMode ? 'dark' : 'light'}`} dir={direction}>
      <div className={`mobile-auth-guest-content ${isRTL ? "rtl" : "ltr"}`}>
        <div className="mobile-auth-guest-icon">
          <FaUser />
        </div>
        <div className="mobile-auth-guest-text">
          <div className="mobile-auth-guest-title">Welcome Guest</div>
          <div className="mobile-auth-guest-subtitle">
            Sign in to continue
          </div>
        </div>
      </div>
      <button
        onClick={() => handleNavigation("/auth/login")}
        className="mobile-auth-guest-login"
      >
        Log In
      </button>
    </div>
  );
};

export default Slider_Auth_Mobile;