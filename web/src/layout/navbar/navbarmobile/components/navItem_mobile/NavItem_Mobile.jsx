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
import { useRTL } from "@/contexts/RTLContext";

// Navigation Configuration - TOP LEVEL ONLY (No Dropdowns)
const getNavigationConfig = (t, isRTL) => ({
  items: [
    {
      name: t("nav.home"),
      nameAr: "الرئيسية",
      icon: <FaHome />,
      path: "/homepages",
      translationKey: "nav.home",
    },
    {
      name: t("nav.books"),
      nameAr: "الكتب",
      icon: <FaBook />,
      path: "/books",
      translationKey: "nav.books",
    },
    {
      name: t("nav.academic_books"),
      nameAr: "الكتب الأكاديمية",
      icon: <FaGraduationCap />,
      path: "/academicbooks",
      translationKey: "nav.academic_books",
    },
    {
      name: t("nav.comics"),
      nameAr: "القصص المصورة",
      icon: <FaBook />,
      path: "/comicslist",
      translationKey: "nav.comics",
    },
    {
      name: t("nav.genre_category"),
      nameAr: "تصنيفات الأنواع",
      icon: <FaBoxes />,
      path: "/category",
      translationKey: "nav.genre_category",
    },
    {
      name: t("nav.collections"),
      nameAr: "المجموعات",
      icon: <FaBoxes />,
      path: "/collections",
      translationKey: "nav.collections",
    },
    {
      name: t("nav.authors"),
      nameAr: "المؤلفون",
      icon: <FaUser />,
      path: "/authors",
      translationKey: "nav.authors",
    },
    {
      name: t("nav.publications"),
      nameAr: "المطبوعات",
      icon: <FaBook />,
      path: "/publications",
      translationKey: "nav.publications",
    },
    {
      name: t("nav.about"),
      nameAr: "عن الموقع",
      icon: <FaInfoCircle />,
      path: "/about",
      translationKey: "nav.about",
    },
  ],
});

// Main NavItem Mobile Component - No Dropdowns
export const NavItemMobile = ({ onItemClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { direction, isRTL, textAlign } = useRTL();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const navigationConfig = getNavigationConfig(t, isRTL);

  // Get item name based on RTL
  const getItemName = (item) => {
    if (isRTL && item.nameAr) {
      return item.nameAr;
    }
    return item.name;
  };

  // Get text color class
  const getTextColorClass = () => {
    return (
      theme?.textColors?.primary ||
      (isDarkMode ? "text-white" : "text-gray-900")
    );
  };

  // Get highlight color class
  const getHighlightColorClass = () => {
    return (
      theme?.textColors?.highlight ||
      (isDarkMode ? "text-blue-400" : "text-sky-600")
    );
  };

  return (
    <div className="navbar-mobile-nav-items-container" dir={direction}>
      {navigationConfig.items.map((item) => (
        <Link
          key={item.translationKey}
          href={item.path || "#"}
          className={`navbar-mobile-item ${getTextColorClass()} ${isRTL ? "rtl-item" : "ltr-item"}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onItemClick) onItemClick();
          }}
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          <span
            className={`navbar-mobile-item-icon ${getHighlightColorClass()}`}
            style={{
              marginLeft: isRTL ? "0" : "0.75rem",
              marginRight: isRTL ? "0.75rem" : "0",
            }}
          >
            {item.icon}
          </span>
          <span
            className="navbar-mobile-item-text"
            style={{
              textAlign: isRTL ? "right" : "left",
              flex: 1,
            }}
          >
            {getItemName(item)}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavItemMobile;
