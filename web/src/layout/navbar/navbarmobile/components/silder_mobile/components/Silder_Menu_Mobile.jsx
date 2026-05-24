"use client";

import { useRTL } from "@/contexts/RTLContext";
import NavItemMobile from "../../navItem_mobile/NavItem_Mobile";
import "./Silder_Menu_Mobile.css";

const Silder_Menu_Mobile = ({ onItemClick }) => {
  const { direction, isRTL } = useRTL();

  return (
    <div className="silder-menu-mobile" dir={direction}>
      <div className="menu-scroller">
        <div className="menu-content">
          <NavItemMobile onItemClick={onItemClick} />
        </div>
      </div>
    </div>
  );
};

export default Silder_Menu_Mobile;