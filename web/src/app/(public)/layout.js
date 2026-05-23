"use client";

import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <GoToUp showAfter={300} smooth={true} />
    </>
  );
}