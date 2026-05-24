"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaSignOutAlt, FaUserCircle, FaTachometerAlt, FaBookReader } from "react-icons/fa";
import { useRTL } from "@/contexts/RTLContext";
import "./auth_mobile.css";

const Auth_Mobile = ({ onItemClick }) => {
  const router = useRouter();
  const { direction, isRTL } = useRTL();
  
  // Dummy user state - manage login/logout locally
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  // Dummy user data
  const dummyUser = {
    displayName: "Priyal Shrivastava",
    email: "priyal.shrivastava@bookqubit.com",
    photoURL: null,
    uid: "dummy123",
  };

  const rankingNumber = 2456;

  const formatRankingNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getInitials = (name) => {
    if (!name) return "PS";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
    }
    return name.charAt(0);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push("/auth/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onItemClick?.();
    router.push("/");
  };

  const handleNavigation = (path) => {
    onItemClick?.();
    router.push(path);
  };

  // Logged In View
  if (isLoggedIn) {
    return (
      <div className="auth-mobile" dir={direction}>
        {/* User Profile */}
        <div className={`auth-profile ${isRTL ? "rtl" : "ltr"}`}>
          <div className="auth-avatar-wrapper">
            {dummyUser?.photoURL ? (
              <img
                src={dummyUser.photoURL}
                alt={dummyUser.displayName}
                className="auth-avatar"
              />
            ) : (
              <div className="auth-avatar-placeholder">
                <span className="avatar-initials">
                  {getInitials(dummyUser.displayName)}
                </span>
              </div>
            )}
          </div>
          <div className="auth-info">
            <div className="auth-name">{dummyUser.displayName}</div>
            <div className="auth-email">{dummyUser.email}</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="auth-stats">
          <div className="stat-item">
            <div className="stat-value">{formatRankingNumber(rankingNumber)}</div>
            <div className="stat-label">Ranking</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">156</div>
            <div className="stat-label">Books Read</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">28</div>
            <div className="stat-label">Reviews</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="auth-buttons">
          <button
            onClick={() => handleNavigation("/userdashboard")}
            className="auth-btn dashboard-btn"
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation("/bookwormranking")}
            className="auth-btn ranking-btn"
          >
            <FaBookReader />
            <span>Bookworm Ranking</span>
            <span className="ranking-badge">
              #{formatRankingNumber(rankingNumber)}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="auth-btn logout-btn"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  // Logged Out View - Login Button
  return (
    <div className="auth-mobile-loggedout" dir={direction}>
      <div className={`login-prompt ${isRTL ? "rtl" : "ltr"}`}>
        <div className="login-icon">
          <FaUserCircle />
        </div>
        <div className="login-text">
          <div className="login-title">Welcome to BookQubit</div>
          <div className="login-subtitle">Sign in to access your account</div>
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="login-button"
      >
        <FaUser />
        <span>Log In</span>
      </button>
    </div>
  );
};

export default Auth_Mobile;