"use client";

// src/app/(public)/layout.js
import Navbar_Desktop from "@/layout/navbar/navbardesktop/Navbar_Desktop";
import Footer from "@/layout/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar_Desktop />
      <main>{children}</main>
      <Footer />
    </>
  );
}