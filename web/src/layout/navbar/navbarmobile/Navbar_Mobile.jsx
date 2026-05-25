"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaBell, FaUserCircle } from "react-icons/fa";
import { useRTL } from "@/contexts/RTLContext";
import { useTheme } from "@/themes/useTheme";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Silder_Mobile from "./components/silder_mobile/silder_mobile";
import Control_Mobile_Slider from "./components/control_mobile/Control_Mobile_Slider";
import SearchBar_Mobile from "@/components/searchbar/searchbar_mobile/searchbar_mobile";
import DarkMode_Mobile from "./components/darkmode_mobile/darkmode_mobile";
import "./Navbar_Mobile.css";

const Navbar_Mobile = () => {
  const router = useRouter();
  const { direction, isRTL } = useRTL();
  const { theme, themeName } = useTheme();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCount] = useState(3);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleNotificationClick = () => {
    router.push("/notifications");
  };

  const handleProfileClick = () => {
    router.push("/auth/profile");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const displayName = user.displayName || user.email?.split('@')[0] || "User";
    const nameParts = displayName.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return displayName.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <nav className="navbar-mobile" dir={direction}>
        <div className="navbar-mobile-left">
          <div className="skeleton-loader"></div>
        </div>
        <div className="navbar-mobile-center">
          <div className="skeleton-logo"></div>
        </div>
        <div className="navbar-mobile-right">
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
          <div className="skeleton-icon"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar-mobile" dir={direction}>
      {/* Left Section - Menu Icon */}
      <div className="navbar-mobile-left">
        <Silder_Mobile user={user} />
      </div>

      {/* Center Section - Logo */}
      <div className="navbar-mobile-center">
        <Link href="/homepages" className="navbar-mobile-logo">
          <div className="logo-icon">📚</div>
          <span className="logo-text">BookQubit</span>
        </Link>
      </div>

      {/* Right Section - All Control Icons */}
      <div className="navbar-mobile-right">
        {/* Search Component */}
        <SearchBar_Mobile />

        {/* Dark Mode Toggle */}
        <DarkMode_Mobile />

        {/* Control Slider */}
        <Control_Mobile_Slider />

        {/* Notification Icon - Only shows when logged in */}
        {isLoggedIn && (
          <button 
            className="nav-control-btn notification-btn" 
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <FaBell size={18} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
        )}

        {/* Profile Icon - Shows when logged in */}
        {isLoggedIn && (
          <button 
            className="nav-control-btn profile-btn" 
            onClick={handleProfileClick}
            aria-label="Profile"
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="profile-avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="profile-initials">
                {getUserInitials()}
              </div>
            )}
          </button>
        )}

        {/* Login Button - Shows when not logged in */}
        {!isLoggedIn && (
          <button className="login-btn-nav" onClick={handleLogin}>
            <FaUser />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar_Mobile;