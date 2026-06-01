"use client";


import Slider from "@/layout_drift/Slider";
import Footer from "@/layout_drift/Footer";

export default function DriftLayout({ children }) {
  return (
    <>
      
      <Slider />

      <main className="drift-main">
        {children}
      </main>

    </>
  );
}