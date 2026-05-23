"use client";

import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";
import ScrollToTop from "@/utils/ScrollToTop";

export default function PublicLayout({ children }) {
  return (
    <>
      <ScrollToTop behavior="smooth" onMount={true} onRouteChange={true} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <GoToUp showAfter={300} smooth={true} />
    </>
  );
}