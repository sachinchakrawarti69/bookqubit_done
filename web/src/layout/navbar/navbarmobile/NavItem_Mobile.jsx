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
  FaGraduationCap,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

// Navigation Configuration - TOP LEVEL ONLY (No Dropdowns)
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
      path: "/books",
      translationKey: "nav.books",
    },
    {
      name: t("nav.academic_books"),
      icon: <FaGraduationCap />,
      path: "/academicbooks",
      translationKey: "nav.academic_books",
    },
    {
      name: t("nav.comics"),
      icon: <FaBook />,
      path: "/comicslist",
      translationKey: "nav.comics",
    },
    {
      name: t("nav.genre_category"),
      icon: <FaBoxes />,
      path: "/category",
      translationKey: "nav.genre_category",
    },
    {
      name: t("nav.collections"),
      icon: <FaBoxes />,
      path: "/collections",
      translationKey: "nav.collections",
    },
    {
      name: t("nav.authors"),
      icon: <FaUser />,
      path: "/authors",
      translationKey: "nav.authors",
    },
    {
      name: t("nav.publications"),
      icon: <FaBook />,
      path: "/publications",
      translationKey: "nav.publications",
    },
    {
      name: t("nav.about"),
      icon: <FaInfoCircle />,
      path: "/about",
      translationKey: "nav.about",
    },
  ],
});

// Main NavItem Mobile Component - No Dropdowns
export const NavItemMobile = ({ onItemClick }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigationConfig = getNavigationConfig(t);

  return (
    <div className="navbar-mobile-nav-items-container">
      {navigationConfig.items.map((item) => (
        <Link
          key={item.translationKey}
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
      ))}
    </div>
  );
};

export default NavItemMobile;