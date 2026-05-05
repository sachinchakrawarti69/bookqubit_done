"use client";

import React from "react";
import Link from "next/link";

const BookNavigation = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-8 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={goToTop}
        className="px-6 py-3 text-base font-medium border-2 border-sky-500 text-sky-600 dark:text-sky-400 rounded-lg hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Go to Top
      </button>
      <Link
        href="/bookslist"
        className="px-6 py-3 text-base font-medium text-center bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Back to Books
      </Link>
    </div>
  );
};

export default BookNavigation;