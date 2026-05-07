import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaBoxes,
  FaUser,
  FaRobot,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaFire,
  FaNewspaper,
  FaGamepad,
  FaFilm,
  FaMusic,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import { useTheme } from "../../../../utils/GlobalImport";

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  items: [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Books",
      icon: <FaBook />,
      path: "/books",
    },
    {
      name: "Comics",
      icon: <FaBook />,
      path: "/comics",
    },
    {
      name: "Genre & Category",
      icon: <FaBoxes />,
      path: "/category",
    },
    {
      name: "Collections",
      icon: <FaBoxes />,
      path: "/collections",
    },

    {
      name: "Authors",
      icon: <FaUser />,
      path: "/authors",
    },
    {
      name: "Publications",
      icon: <FaBook />,
      path: "/publications",
    },
    {
      name: "AI Tools",
      icon: <FaRobot />,
      path: "/ai-tools",
    },
    {
      name: "Smart Search & Filter",
      icon: <FaFire />,
      path: "/smartsearchfilter",
    },

    {
      name: "Tools",
      icon: <FaTools />,
      path: "/tools",
    },
    {
      name: "More",
      icon: <FaStar />,
      path: "/more",
    },
    {
      name: "About",
      icon: <FaInfoCircle />,
      path: "/about-us",
    },
  ],
};

// Main NavItem_Mobile Component with Theme
export const NavItem_Mobile = ({ onItemClick }) => {
  const { theme } = useTheme();

  return (
    <div className="navbar-mobile-items-container">
      {NAVIGATION_CONFIG.items.map((item, index) => (
        <div
          key={item.name}
          className="navbar-mobile-item-wrapper"
          style={{
            animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
          }}
        >
          <Link
            to={item.path || "#"}
            className={`
              navbar-mobile-item
              ${theme.textColors.primary}
              transition-all duration-200
            `}
            onClick={(e) => {
              e.stopPropagation();
              if (onItemClick) onItemClick();
            }}
          >
            <span
              className={`navbar-mobile-item-icon ${theme.textColors.highlight}`}
            >
              {item.icon}
            </span>
            <span className="navbar-mobile-item-text">{item.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

// Helper functions
export const addNavItem = (newItem) => {
  NAVIGATION_CONFIG.items.push(newItem);
};

export const removeNavItem = (itemName) => {
  const index = NAVIGATION_CONFIG.items.findIndex(
    (item) => item.name === itemName,
  );
  if (index !== -1) {
    NAVIGATION_CONFIG.items.splice(index, 1);
  }
};
