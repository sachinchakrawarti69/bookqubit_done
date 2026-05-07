"use client";

import Navbar_Desktop from "./navbardesktop/Navbar_Desktop";
// import Navbar_Mobile from "./navbarmobile/Navbar_Mobile";

const Navbar = () => {
  return (
    <>
      <div className="block md:hidden">
        {/* <Navbar_Mobile /> */}
      </div>
      <div className="hidden md:block">
        <Navbar_Desktop />
      </div>
    </>
  );
};

export default Navbar;