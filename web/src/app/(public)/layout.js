"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/layout/navbar/Navbar";
import Footer from "@/layout/footer/Footer";
import GoToUp from "@/utils/GoToUp";
import ScrollToTop from "@/utils/ScrollToTop";

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current route is bookqubitsnap
  const isBookQubitSnap = pathname === "/bookqubitsnap";
  
  return (
    <>
      <ScrollToTop behavior="smooth" onMount={true} onRouteChange={true} />
      {!isBookQubitSnap && <Navbar />}
      <main className={isBookQubitSnap ? "no-navbar-footer" : ""}>
        {children}
      </main>
      {!isBookQubitSnap && <Footer />}
      {!isBookQubitSnap && <GoToUp showAfter={300} smooth={true} />}
    </>
  );
}