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
} from "react-icons/fa";
import { MoreDropdown } from "./MoreDropdown";
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
      dropdown: [
        { name: "Best Sellers", path: "/books/bestsellers", icon: <FaStar /> },
        { name: "New Releases", path: "/books/new", icon: <FaFire /> },
        { name: "Top Rated", path: "/books/top-rated", icon: <FaStar /> },
        { name: "Free Books", path: "/books/free", icon: <FaBook /> },
      ],
    },
    {
      name: "Comics",
      icon: <FaBook />,
      path: "/comicslist",
      dropdown: [
        { name: "Marvel", path: "/comics/marvel", icon: <FaFire /> },
        { name: "DC", path: "/comics/dc", icon: <FaStar /> },
        { name: "Manga", path: "/comics/manga", icon: <FaBook /> },
        {
          name: "Graphic Novels",
          path: "/comics/graphic-novels",
          icon: <FaBook />,
        },
      ],
    },
    {
      name: "Genre & Category",
      icon: <FaBoxes />,
      path: "/category",
      dropdown: [
        { name: "Fiction", path: "/category/fiction" },
        { name: "Non-Fiction", path: "/category/non-fiction" },
        { name: "Science Fiction", path: "/category/sci-fi" },
        { name: "Fantasy", path: "/category/fantasy" },
        { name: "Mystery", path: "/category/mystery" },
        { name: "Romance", path: "/category/romance" },
        { name: "Biography", path: "/category/biography" },
      ],
    },
    {
      name: "Collections",
      icon: <FaBoxes />,
      path: "/collections",
      dropdown: [
        { name: "All Collections", path: "/collections", icon: <FaBoxes /> },
        { name: "Featured", path: "/collections/featured", icon: <FaStar /> },
        { name: "Summer Reads", path: "/collections/summer", icon: <FaFire /> },
        {
          name: "Award Winners",
          path: "/collections/awards",
          icon: <FaStar />,
        },
      ],
    },
    {
      name: "Authors",
      icon: <FaUser />,
      path: "/authors",
      dropdown: [
        { name: "All Authors", path: "/authors", icon: <FaUser /> },
        { name: "Popular Authors", path: "/authors/popular", icon: <FaStar /> },
        { name: "New Authors", path: "/authors/new", icon: <FaFire /> },
        {
          name: "Featured Authors",
          path: "/authors/featured",
          icon: <FaStar />,
        },
      ],
    },
    {
      name: "Publications",
      icon: <FaBook />,
      path: "/publications",
      dropdown: [
        { name: "All Publications", path: "/publications", icon: <FaBook /> },
        {
          name: "Magazines",
          path: "/publications/magazines",
          icon: <FaNewspaper />,
        },
        { name: "Journals", path: "/publications/journals", icon: <FaBook /> },
        {
          name: "Newspapers",
          path: "/publications/newspapers",
          icon: <FaNewspaper />,
        },
      ],
    },
    {
      name: "About",
      icon: <FaInfoCircle />,
      path: "/about",
    },
  ],
};

// Dropdown Component for Desktop
const DesktopDropdown = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleParentClick = () => {
    if (item.path) {
      router.push(item.path);
      if (onItemClick) onItemClick();
    }
  };

  return (
    <div
      className="navbar-desktop-dropdown-container"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Clickable parent item */}
      <div
        onClick={handleParentClick}
        className={`navbar-desktop-dropdown-button ${theme.textColors.primary}`}
      >
        <span
          className={`navbar-desktop-dropdown-icon ${theme.textColors.highlight}`}
        >
          {item.icon}
        </span>
        <span>{item.name}</span>
        <span
          className={`navbar-desktop-dropdown-chevron ${theme.textColors.secondary}`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>

      {isOpen && item.dropdown && (
        <div
          className={`navbar-desktop-dropdown-menu ${theme.background.section} ${theme.border.default} ${theme.shadow.container}`}
          onClick={(e) => e.stopPropagation()}
        >
          {item.dropdown.map((dropdownItem, index) => {
            // RENDER HEADINGS
            if (dropdownItem.type === "heading") {
              return (
                <div
                  key={`heading-${index}`}
                  className={`navbar-desktop-dropdown-heading ${theme.textColors.secondary}`}
                >
                  {dropdownItem.name}
                </div>
              );
            }

            // NORMAL ITEMS
            return (
              <Link
                key={`${item.name}-${dropdownItem.path || index}`}
                href={dropdownItem.path}
                className={`navbar-desktop-dropdown-item ${theme.textColors.primary}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onItemClick) onItemClick();
                }}
              >
                {dropdownItem.icon && (
                  <span
                    className={`navbar-desktop-dropdown-item-icon ${theme.textColors.highlight}`}
                  >
                    {dropdownItem.icon}
                  </span>
                )}
                <div className="navbar-desktop-dropdown-item-content">
                  <span
                    className={`navbar-desktop-dropdown-item-title ${theme.textColors.primary}`}
                  >
                    {dropdownItem.name}
                  </span>
                  {dropdownItem.description && (
                    <span
                      className={`navbar-desktop-dropdown-item-description ${theme.textColors.secondary}`}
                    >
                      {dropdownItem.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Dropdown Component for Mobile
const MobileDropdown = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const handleParentClick = (e) => {
    e.preventDefault();
    if (item.path && !isOpen) {
      router.push(item.path);
      if (onItemClick) onItemClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="navbar-mobile-dropdown">
      <div
        onClick={handleParentClick}
        className={`navbar-mobile-dropdown-button ${theme.textColors.primary}`}
      >
        <span
          className={`navbar-mobile-dropdown-icon ${theme.textColors.highlight}`}
        >
          {item.icon}
        </span>
        <span className="navbar-mobile-dropdown-text">{item.name}</span>
        {item.dropdown && (
          <span
            className={`navbar-mobile-dropdown-chevron ${theme.textColors.secondary}`}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </div>

      {isOpen && item.dropdown && (
        <div
          className={`navbar-mobile-dropdown-content ${theme.background.section}`}
        >
          {item.dropdown.map((dropdownItem, index) => {
            // RENDER HEADINGS
            if (dropdownItem.type === "heading") {
              return (
                <div
                  key={`heading-${index}`}
                  className={`navbar-mobile-dropdown-heading ${theme.textColors.secondary}`}
                >
                  {dropdownItem.name}
                </div>
              );
            }

            // NORMAL ITEMS
            return (
              <Link
                key={`${item.name}-${dropdownItem.path || index}`}
                href={dropdownItem.path}
                className={`navbar-mobile-dropdown-item ${theme.textColors.primary}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onItemClick) onItemClick();
                }}
              >
                {dropdownItem.icon && (
                  <span
                    className={`navbar-mobile-dropdown-item-icon ${theme.textColors.highlight}`}
                  >
                    {dropdownItem.icon}
                  </span>
                )}
                <span>{dropdownItem.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Main NavItem Component
export const NavItem = ({ mobile = false, onItemClick }) => {
  const { theme } = useTheme();

  if (mobile) {
    return (
      <>
        {NAVIGATION_CONFIG.items.map((item) => (
          <div key={item.name}>
            {item.dropdown ? (
              <MobileDropdown item={item} onItemClick={onItemClick} />
            ) : (
              <Link
                href={item.path || "#"}
                className={`navbar-mobile-item ${theme.textColors.primary}`}
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
            )}
          </div>
        ))}
        {/* Add MoreDropdown component for mobile */}
        <MoreDropdown mobile={true} onItemClick={onItemClick} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-1 h-full">
      {NAVIGATION_CONFIG.items.map((item) => (
        <div key={item.name} className="h-full flex items-center">
          {item.dropdown ? (
            <DesktopDropdown item={item} onItemClick={onItemClick} />
          ) : (
            <Link
              href={item.path || "#"}
              className={`navbar-desktop-item ${theme.textColors.primary}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onItemClick) onItemClick();
              }}
            >
              <span
                className={`navbar-desktop-item-icon ${theme.textColors.highlight}`}
              >
                {item.icon}
              </span>
              {item.name}
            </Link>
          )}
        </div>
      ))}
      {/* Add MoreDropdown component for desktop */}
      <MoreDropdown mobile={false} onItemClick={onItemClick} />
    </div>
  );
};

// Helper functions
export const addDropdownItem = (parentName, newItem) => {
  const parent = NAVIGATION_CONFIG.items.find(
    (item) => item.name === parentName,
  );
  if (parent && parent.dropdown) {
    parent.dropdown.push(newItem);
  }
};

export const removeDropdownItem = (parentName, itemPath) => {
  const parent = NAVIGATION_CONFIG.items.find(
    (item) => item.name === parentName,
  );
  if (parent && parent.dropdown) {
    parent.dropdown = parent.dropdown.filter((item) => item.path !== itemPath);
  }
};

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