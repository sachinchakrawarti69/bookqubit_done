"use client";

import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}