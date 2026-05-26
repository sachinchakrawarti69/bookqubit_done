"use client";

import { useRTL } from "@/contexts/RTLContext";
import { useTheme } from "@/themes/useTheme";
import NavItemMobile from "../../navItem_mobile/NavItem_Mobile";
import "./Silder_Menu_Mobile.css";

const Silder_Menu_Mobile = ({ onItemClick }) => {
  const { direction } = useRTL();
  const { theme } = useTheme();

  return (
    <div
      className={`silder-menu-mobile transition-colors duration-300 ${theme.background?.section || ""}`}
      dir={direction}
    >
      <div
        className="menu-scroller"
        style={{
          // Passes custom scrollbar and active tint variable tokens safely downstream
          "--scrollbar-thumb": theme.border?.default || "rgba(0, 0, 0, 0.2)",
          "--scrollbar-track":
            theme.background?.navigationDots || "rgba(0, 0, 0, 0.05)",
          "--active-border":
            theme.buttonColors?.primaryButton?.background || "#0ea5e9",
        }}
      >
        <div className="menu-content">
          <NavItemMobile onItemClick={onItemClick} />
        </div>
      </div>
    </div>
  );
};

export default Silder_Menu_Mobile;
