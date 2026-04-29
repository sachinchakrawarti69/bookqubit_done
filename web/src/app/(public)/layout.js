"use client";

// src/app/(public)/layout.js
import Navbar_Desktop from "@/components/navbar/navbardesktop/Navbar_Desktop";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar_Desktop />
   
      <main>{children}</main>
      <Footer />
    </>
  );
}