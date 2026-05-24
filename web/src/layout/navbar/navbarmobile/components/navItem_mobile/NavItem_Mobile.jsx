"use client";

import Link from "next/link";
import {
  FaHome,
  FaBook,
  FaBoxes,
  FaUser,
  FaInfoCircle,
  FaGraduationCap,
} from "react-icons/fa";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

const getNavigationConfig = (t) => ({
  items: [
    { name: t("nav.home"), icon: <FaHome />, path: "/homepages" },
    { name: t("nav.books"), icon: <FaBook />, path: "/books" },
    {
      name: t("nav.academic_books"),
      icon: <FaGraduationCap />,
      path: "/academicbooks",
    },
    { name: t("nav.comics"), icon: <FaBook />, path: "/comicslist" },
    { name: t("nav.genre_category"), icon: <FaBoxes />, path: "/category" },
    { name: t("nav.collections"), icon: <FaBoxes />, path: "/collections" },
    { name: t("nav.authors"), icon: <FaUser />, path: "/authors" },
    { name: t("nav.publications"), icon: <FaBook />, path: "/publications" },
    { name: t("nav.about"), icon: <FaInfoCircle />, path: "/about" },
  ],
});

export const NavItemMobile = ({ onItemClick }) => {
  const { theme, themeName } = useTheme();
  const { t } = useLanguage();
  const { direction, isRTL } = useRTL();

  const isDarkMode =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";
  const navigationConfig = getNavigationConfig(t);

  const textColor =
    theme?.textColors?.primary || (isDarkMode ? "text-white" : "text-gray-900");
  const highlightColor =
    theme?.textColors?.highlight ||
    (isDarkMode ? "text-blue-400" : "text-sky-600");

  return (
    <div className="navbar-mobile-nav-items-container" dir={direction}>
      {navigationConfig.items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`navbar-mobile-item ${textColor}`}
          onClick={(e) => {
            e.stopPropagation();
            onItemClick?.();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <span
            className={`navbar-mobile-item-icon ${highlightColor}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              marginLeft: isRTL ? 0 : "12px",
              marginRight: isRTL ? "12px" : 0,
            }}
          >
            {item.icon}
          </span>
          <span
            className="navbar-mobile-item-text"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              textAlign: isRTL ? "right" : "left",
              flex: 1,
            }}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavItemMobile;
