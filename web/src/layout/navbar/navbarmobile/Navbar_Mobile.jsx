"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaBoxes,
  FaUser,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaFire,
  FaNewspaper,
  FaGraduationCap,
  FaCogs,
  FaLaptopCode,
  FaBriefcase,
  FaFlask,
  FaUserDoctor,
  FaSquareRootAlt,
  FaRobot,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  items: [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/homepages",
    },
    {
      name: "Books",
      icon: <FaBook />,
      path: "/bookslist",
    },
    {
      name: "Academic Books",
      icon: <FaGraduationCap />,
      path: "/academicbooks",
    },
    {
      name: "Comics",
      icon: <FaBook />,
      path: "/comicslist",
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
      name: "AI Assistant",
      icon: <FaRobot />,
      path: "/bookqubitai",
    },
    {
      name: "About",
      icon: <FaInfoCircle />,
      path: "/about",
    },
  ],
};

// Dropdown items configuration
export const dropdownConfig = {
  Books: [
    { name: "Best Sellers", path: "/books/bestsellers", icon: <FaStar /> },
    { name: "New Releases", path: "/books/newreleases", icon: <FaFire /> },
    { name: "Top Rated", path: "/books/toprated", icon: <FaStar /> },
  ],
  Comics: [
    { name: "Marvel", path: "/comics/marvel", icon: <FaFire /> },
    { name: "DC", path: "/comics/dc", icon: <FaStar /> },
    { name: "Manga", path: "/comics/manga", icon: <FaBook /> },
  ],
  "Academic Books": [
    { name: "Engineering", path: "/academic-books/engineering", icon: <FaCogs /> },
    { name: "Computer Science", path: "/academic-books/computer-science", icon: <FaLaptopCode /> },
    { name: "Medical", path: "/academic-books/medical", icon: <FaUserDoctor /> },
    { name: "Business", path: "/academic-books/business", icon: <FaBriefcase /> },
    { name: "Science", path: "/academic-books/science", icon: <FaFlask /> },
    { name: "Mathematics", path: "/academic-books/mathematics", icon: <FaSquareRootAlt /> },
  ],
};

// Main Mobile NavItem Component
export const NavItem_Mobile = ({ onItemClick }) => {
  const { theme, themeName } = useTheme();
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState({});

  if (!theme) return null;

  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const toggleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleNavigation = (path) => {
    if (onItemClick) onItemClick();
    router.push(path);
  };

  const getTextHighlightClass = () =>
    theme.textColors?.highlight || (isDarkMode ? "text-blue-400" : "text-sky-600");

  // Check if item has dropdown
  const hasDropdown = (itemName) => {
    return dropdownConfig[itemName] && dropdownConfig[itemName].length > 0;
  };

  return (
    <div className="flex flex-col w-full">
      {NAVIGATION_CONFIG.items.map((item) => (
        <div key={item.name} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
          {hasDropdown(item.name) ? (
            <>
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center justify-between w-full px-4 py-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xl ${getTextHighlightClass()}`}>
                    {item.icon}
                  </span>
                  <span className={`text-base font-medium ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                    {item.name}
                  </span>
                </div>
                {openDropdowns[item.name] ? (
                  <FaChevronUp className="text-gray-500" size={14} />
                ) : (
                  <FaChevronDown className="text-gray-500" size={14} />
                )}
              </button>
              {openDropdowns[item.name] && (
                <div className="pl-12 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                  {dropdownConfig[item.name].map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavigation(subItem.path)}
                      className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className={`text-sm ${getTextHighlightClass()}`}>
                        {subItem.icon}
                      </span>
                      <span className={`text-sm ${theme.textColors?.primary || (isDarkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                        {subItem.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-3 w-full px-4 py-3 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className={`text-xl ${getTextHighlightClass()}`}>
                {item.icon}
              </span>
              <span className={`text-base font-medium ${theme.textColors?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
                {item.name}
              </span>
            </button>
          )}
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

export const addDropdownItem = (parentName, newItem) => {
  if (dropdownConfig[parentName]) {
    dropdownConfig[parentName].push(newItem);
  }
};

export default NavItem_Mobile;