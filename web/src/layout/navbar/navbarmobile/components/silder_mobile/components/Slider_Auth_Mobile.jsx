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

const Slider_Auth_Mobile = ({ user, onItemClick }) => {
  const router = useRouter();
  const { theme, isDark } = useTheme();
  const { direction, isRTL } = useRTL();

  // Dummy user data - Priyal Shrivastava
  const dummyUser = {
    displayName: "Priyal Shrivastava",
    email: "priyal.shrivastava@bookqubit.com",
    photoURL: null,
  };

  const activeUser = user || dummyUser;
  const isLoggedIn = true;

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "PS";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return name.charAt(0);
  };

  const rankingNumber = 2456;

  const formatRankingNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLogout = async () => {
    onItemClick?.();
    router.push("/");
  };

  const handleNavigation = (path) => {
    onItemClick?.();
    router.push(path);
  };

  if (isLoggedIn && activeUser) {
    return (
      <div className="mobile-auth-section" dir={direction}>
        {/* User Profile - Compact */}
        <div className={`mobile-auth-profile ${isRTL ? "rtl" : "ltr"}`}>
          <div className="mobile-auth-avatar-wrapper">
            {activeUser?.photoURL ? (
              <img
                src={activeUser.photoURL}
                alt={activeUser.displayName || "User"}
                className="mobile-auth-avatar"
              />
            ) : (
              <div className="mobile-auth-avatar-placeholder">
                <span className="avatar-initials">
                  {getInitials(activeUser?.displayName)}
                </span>
              </div>
            )}
          </div>
          <div className="mobile-auth-info">
            <div className="mobile-auth-name">
              {activeUser?.displayName || "Priyal Shrivastava"}
            </div>
            <div className="mobile-auth-email">
              {activeUser?.email || "priyal.shrivastava@bookqubit.com"}
            </div>
          </div>
        </div>

        {/* Three Buttons - Compact */}
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

       
        </div>
      </div>
    );
  }

  // Not Logged In View - Compact
  return (
    <div className="mobile-auth-guest" dir={direction}>
      <div className={`mobile-auth-guest-content ${isRTL ? "rtl" : "ltr"}`}>
        <div className="mobile-auth-guest-icon">
          <FaUser />
        </div>
        <div className="mobile-auth-guest-text">
          <div className="mobile-auth-guest-title">Welcome</div>
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