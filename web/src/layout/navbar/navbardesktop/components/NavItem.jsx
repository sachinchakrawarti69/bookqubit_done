"use client";

import { useState, useRef, useEffect } from "react";
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
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaSquareRootAlt } from "react-icons/fa";
import { MoreDropdown } from "./MoreDropdown";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

// Navigation Configuration with translation keys
const getNavigationConfig = (t) => ({
  items: [
    {
      name: t("nav.home"),
      icon: <FaHome />,
      path: "/homepages",
      translationKey: "nav.home",
    },
    {
      name: t("nav.books"),
      icon: <FaBook />,
      path: "/bookslist",
      translationKey: "nav.books",
      dropdown: [
        {
          name: t("nav.bestsellers"),
          path: "/books/bestsellers",
          icon: <FaStar />,
          translationKey: "nav.bestsellers",
        },
        {
          name: t("nav.new_releases"),
          path: "/books/newreleases",
          icon: <FaFire />,
          translationKey: "nav.new_releases",
        },
        {
          name: t("nav.top_rated"),
          path: "/books/toprated",
          icon: <FaStar />,
          translationKey: "nav.top_rated",
        },
      ],
    },
    {
      name: t("nav.academic_books"),
      icon: <FaGraduationCap />,
      path: "/academicbooks",
      translationKey: "nav.academic_books",
      dropdown: [
        {
          name: t("nav.engineering"),
          path: "/academic-books/engineering",
          icon: <FaCogs />,
          translationKey: "nav.engineering",
        },
        {
          name: t("nav.computer_science"),
          path: "/academic-books/computer-science",
          icon: <FaLaptopCode />,
          translationKey: "nav.computer_science",
        },
        {
          name: t("nav.medical"),
          path: "/academic-books/medical",
          icon: <FaUserDoctor />,
          translationKey: "nav.medical",
        },
        {
          name: t("nav.business_management"),
          path: "/academic-books/business",
          icon: <FaBriefcase />,
          translationKey: "nav.business_management",
        },
        {
          name: t("nav.science"),
          path: "/academic-books/science",
          icon: <FaFlask />,
          translationKey: "nav.science",
        },
        {
          name: t("nav.mathematics"),
          path: "/academic-books/mathematics",
          icon: <FaSquareRootAlt />,
          translationKey: "nav.mathematics",
        },
      ],
    },
    {
      name: t("nav.comics"),
      icon: <FaBook />,
      path: "/comicslist",
      translationKey: "nav.comics",
      dropdown: [
        {
          name: t("nav.marvel"),
          path: "/comics/marvel",
          icon: <FaFire />,
          translationKey: "nav.marvel",
        },
        {
          name: t("nav.dc"),
          path: "/comics/dc",
          icon: <FaStar />,
          translationKey: "nav.dc",
        },
        {
          name: t("nav.manga"),
          path: "/comics/manga",
          icon: <FaBook />,
          translationKey: "nav.manga",
        },
      ],
    },
    {
      name: t("nav.genre_category"),
      icon: <FaBoxes />,
      path: "/category",
      translationKey: "nav.genre_category",
      dropdown: [
        {
          name: t("nav.fiction"),
          path: "/category/fiction",
          translationKey: "nav.fiction",
        },
        {
          name: t("nav.non_fiction"),
          path: "/category/non-fiction",
          translationKey: "nav.non_fiction",
        },
        {
          name: t("nav.sci_fi"),
          path: "/category/sci-fi",
          translationKey: "nav.sci_fi",
        },
        {
          name: t("nav.fantasy"),
          path: "/category/fantasy",
          translationKey: "nav.fantasy",
        },
        {
          name: t("nav.mystery"),
          path: "/category/mystery",
          translationKey: "nav.mystery",
        },
        {
          name: t("nav.romance"),
          path: "/category/romance",
          translationKey: "nav.romance",
        },
        {
          name: t("nav.biography"),
          path: "/category/biography",
          translationKey: "nav.biography",
        },
      ],
    },
    {
      name: t("nav.collections"),
      icon: <FaBoxes />,
      path: "/collections",
      translationKey: "nav.collections",
      dropdown: [
        {
          name: t("nav.all_collections"),
          path: "/collections",
          icon: <FaBoxes />,
          translationKey: "nav.all_collections",
        },
        {
          name: t("nav.featured"),
          path: "/collections/featured",
          icon: <FaStar />,
          translationKey: "nav.featured",
        },
        {
          name: t("nav.summer_reads"),
          path: "/collections/summer",
          icon: <FaFire />,
          translationKey: "nav.summer_reads",
        },
        {
          name: t("nav.award_winners"),
          path: "/collections/awards",
          icon: <FaStar />,
          translationKey: "nav.award_winners",
        },
      ],
    },
    {
      name: t("nav.authors"),
      icon: <FaUser />,
      path: "/authors",
      translationKey: "nav.authors",
      dropdown: [
        {
          name: t("nav.all_authors"),
          path: "/authors",
          icon: <FaUser />,
          translationKey: "nav.all_authors",
        },
        {
          name: t("nav.popular_authors"),
          path: "/authors/popular",
          icon: <FaStar />,
          translationKey: "nav.popular_authors",
        },
        {
          name: t("nav.new_authors"),
          path: "/authors/new",
          icon: <FaFire />,
          translationKey: "nav.new_authors",
        },
        {
          name: t("nav.featured_authors"),
          path: "/authors/featured",
          icon: <FaStar />,
          translationKey: "nav.featured_authors",
        },
      ],
    },
    {
      name: t("nav.publications"),
      icon: <FaBook />,
      path: "/publications",
      translationKey: "nav.publications",
      dropdown: [
        {
          name: t("nav.all_publications"),
          path: "/publications",
          icon: <FaBook />,
          translationKey: "nav.all_publications",
        },
        {
          name: t("nav.magazines"),
          path: "/publications/magazines",
          icon: <FaNewspaper />,
          translationKey: "nav.magazines",
        },
        {
          name: t("nav.journals"),
          path: "/publications/journals",
          icon: <FaBook />,
          translationKey: "nav.journals",
        },
        {
          name: t("nav.newspapers"),
          path: "/publications/newspapers",
          icon: <FaNewspaper />,
          translationKey: "nav.newspapers",
        },
      ],
    },
    {
      name: t("nav.about"),
      icon: <FaInfoCircle />,
      path: "/about",
      translationKey: "nav.about",
    },
  ],
});

// Dropdown Component for Desktop with RTL support and proper theme handling
const DesktopDropdown = ({ item, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const { isRTL } = useRTL();

  // Check if current theme is dark mode variant
  const isDarkTheme = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleParentClick = () => {
    if (item.path) {
      router.push(item.path);
      if (onItemClick) onItemClick();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="navbar-desktop-dropdown-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clickable parent item */}
      <div
        onClick={handleParentClick}
        className={`
          navbar-desktop-dropdown-button
          ${theme.textColors.primary}
          hover:${theme.textColors.highlight}
          transition-colors duration-200
        `}
        style={{ 
          flexDirection: isRTL ? 'row-reverse' : 'row',
          cursor: 'pointer'
        }}
      >
        <span
          className={`navbar-desktop-dropdown-icon ${theme.textColors.highlight}`}
          style={{ 
            marginRight: isRTL ? '0' : '0.375rem', 
            marginLeft: isRTL ? '0.375rem' : '0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {item.icon}
        </span>
        <span>{item.name}</span>
        <span
          className={`navbar-desktop-dropdown-chevron ${theme.textColors.secondary}`}
          style={{ 
            marginLeft: isRTL ? '0' : '0.25rem', 
            marginRight: isRTL ? '0.25rem' : '0',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <FaChevronDown size={12} />
        </span>
      </div>

      {/* Dropdown Menu - Controlled by React state */}
      {isOpen && item.dropdown && (
        <div
          className={`
            navbar-desktop-dropdown-menu
            ${theme.background.section}
            ${theme.border.default}
            ${theme.shadow.container}
            animate-slideDownFade
          `}
          style={{ 
            left: isRTL ? 'auto' : '0', 
            right: isRTL ? '0' : 'auto',
            display: 'block',
            opacity: 1,
            visibility: 'visible',
            pointerEvents: 'auto',
            transform: 'translateY(0)',
            backgroundColor: isDarkTheme ? theme.background?.section : undefined
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {item.dropdown.map((dropdownItem, index) => {
            // RENDER HEADINGS
            if (dropdownItem.type === "heading") {
              return (
                <div
                  key={`heading-${index}`}
                  className={`
                    navbar-desktop-dropdown-heading
                    ${theme.textColors.secondary}
                  `}
                  style={{ 
                    textAlign: isRTL ? 'right' : 'left',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
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
                className={`
                  navbar-desktop-dropdown-item
                  ${theme.textColors.primary}
                  hover:${theme.textColors.highlight}
                  transition-colors duration-150
                `}
                style={{ 
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  textDecoration: 'none'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onItemClick) onItemClick();
                }}
              >
                {dropdownItem.icon && (
                  <span
                    className={`navbar-desktop-dropdown-item-icon ${theme.textColors.highlight}`}
                    style={{ 
                      marginRight: isRTL ? '0' : '0.75rem', 
                      marginLeft: isRTL ? '0.75rem' : '0',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {dropdownItem.icon}
                  </span>
                )}
                <div 
                  className="navbar-desktop-dropdown-item-content" 
                  style={{ 
                    alignItems: isRTL ? 'flex-end' : 'flex-start',
                    flex: 1
                  }}
                >
                  <span
                    className={`navbar-desktop-dropdown-item-title ${theme.textColors.primary}`}
                    style={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      lineHeight: 1.3
                    }}
                  >
                    {dropdownItem.name}
                  </span>
                  {dropdownItem.description && (
                    <span
                      className={`navbar-desktop-dropdown-item-description ${theme.textColors.secondary}`}
                      style={{
                        fontSize: '0.75rem',
                        marginTop: '0.125rem'
                      }}
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

// Main NavItem Component for Desktop only
export const NavItem = ({ mobile = false, onItemClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { isRTL } = useRTL();
  const navigationConfig = getNavigationConfig(t);

  // Check if current theme is dark mode variant
  const isDarkTheme = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  // Only desktop version
  return (
    <div 
  className="flex items-center gap-1 h-full" 
  style={{ 
    direction: isRTL ? 'rtl' : 'ltr',
    backgroundColor: 'transparent'
  }}
>
  {navigationConfig.items
    .filter(
      (item) =>
        !(
          item.translationKey === "nav.about" &&
          (!item.name || item.name.trim() === "")
        )
    )
    .map((item) => (
      <div key={item.translationKey} className="h-full flex items-center">
        {item.dropdown ? (
          <DesktopDropdown item={item} onItemClick={onItemClick} />
        ) : (
          <Link
            href={item.path || "#"}
            className={`
              navbar-desktop-item
              ${theme.textColors.primary}
              hover:${theme.textColors.highlight}
              transition-colors duration-200
            `}
            style={{ 
              flexDirection: isRTL ? 'row-reverse' : 'row',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              whiteSpace: 'nowrap',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              fontWeight: 500
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onItemClick) onItemClick();
            }}
          >
            <span
              className={`navbar-desktop-item-icon ${theme.textColors.highlight}`}
              style={{ 
                marginRight: isRTL ? '0' : '0.375rem', 
                marginLeft: isRTL ? '0.375rem' : '0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {item.icon}
            </span>

            {item.name}
          </Link>
        )}
      </div>
    ))}

  <MoreDropdown mobile={false} onItemClick={onItemClick} />
</div>
  );
};

// Helper functions
export const addDropdownItem = (parentName, newItem) => {
  const parent = getNavigationConfig((key) => key).items.find(
    (item) => item.name === parentName,
  );
  if (parent && parent.dropdown) {
    parent.dropdown.push(newItem);
  }
};

export const removeDropdownItem = (parentName, itemPath) => {
  const parent = getNavigationConfig((key) => key).items.find(
    (item) => item.name === parentName,
  );
  if (parent && parent.dropdown) {
    parent.dropdown = parent.dropdown.filter((item) => item.path !== itemPath);
  }
};

export const addNavItem = (newItem) => {
  getNavigationConfig((key) => key).items.push(newItem);
};

export const removeNavItem = (itemName) => {
  const index = getNavigationConfig((key) => key).items.findIndex(
    (item) => item.name === itemName,
  );
  if (index !== -1) {
    getNavigationConfig((key) => key).items.splice(index, 1);
  }
};