"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBooksByLanguage } from "@/data/books";

// Import components
import BookNotFound from "@/features/book/bookdeatils/components/BookNotFound";
import BookCover from "@/features/book/bookdeatils/components/BookCover";
import BookInfo from "@/features/book/bookdeatils/components/BookInfo";
import BookActions from "@/features/book/bookdeatils/components/BookActions";
import BookKeyPoints from "@/features/book/bookdeatils/components/BookKeyPoints";
import BookSubjects from "@/features/book/bookdeatils/components/BookSubjects";
import BookPublicationDetails from "@/features/book/bookdeatils/components/BookPublicationDetails";
import BookAbout from "@/features/book/bookdeatils/components/BookAbout";
import BookSummary from "@/features/book/bookdeatils/components/BookSummary";
import RelatedBooks from "@/features/book/bookdeatils/components/RelatedBooks";
import BookNavigation from "@/features/book/bookdeatils/components/BookNavigation";
import BookSEO from "@/features/book/bookdeatils/components/BookSEO"

const BookDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const { theme, themeName } = useTheme();
  const { language } = useLanguage();

  // Create ref for summary section
  const summaryRef = useRef(null);

  // State for book status and user interactions
  const [bookStatus, setBookStatus] = useState("unread");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCollection, setIsInCollection] = useState(false);
  const [book, setBook] = useState(null);
  const [booksData, setBooksData] = useState([]);

  // Load books based on language
  useEffect(() => {
    const books = getBooksByLanguage(language);
    setBooksData(books);
  }, [language]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Find book when slug or booksData changes
  useEffect(() => {
    if (slug && booksData.length > 0) {
      const foundBook = booksData.find((book) => {
        const bookSlug = book.slug?.toLowerCase().trim();
        const urlSlug = slug?.toLowerCase().trim();

        if (bookSlug === urlSlug) return true;
        if (!isNaN(slug) && book.id === parseInt(slug)) return true;

        const generatedSlug = book.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return generatedSlug === urlSlug;
      });

      setBook(foundBook);
    }
  }, [slug, booksData]);

  // Redirect from ID to slug URL
  useEffect(() => {
    if (book && book.slug && !isNaN(slug)) {
      router.replace(`/bookdeatils/${book.slug}`);
    }
  }, [book, slug, router]);

  // Function to scroll to summary
  const scrollToSummary = () => {
    if (summaryRef.current) {
      summaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (book?.buttons?.readSummary) {
      window.open(book.buttons.readSummary, "_blank");
    }
  };

  // Find related books
  const relatedByAuthor = book && booksData.length > 0
    ? booksData.filter(
        (b) =>
          b.author === book.author && (b.slug !== book.slug || b.id !== book.id),
      )
    : [];
  const relatedByCategory = book && booksData.length > 0
    ? booksData.filter(
        (b) =>
          b.category === book.category &&
          (b.slug !== book.slug || b.id !== book.id),
      )
    : [];

  // Handler functions
  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    console.log(
      `${isInWishlist ? "Removed from" : "Added to"} wishlist:`,
      book?.title,
    );
  };

  const handleShare = () => {
    if (!book) return;
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleReadStatus = (status) => {
    setBookStatus(status);
    console.log(`Marked as ${status}:`, book?.title);
  };

  const handleAddToLibrary = () => {
    setIsInCollection(!isInCollection);
    console.log(
      `${isInCollection ? "Removed from" : "Added to"} library:`,
      book?.title,
    );
  };

  const handleGetBook = () => {
    window.open(book?.buttons?.getBook, "_blank");
  };

  const handleListenAudiobook = () => {
    window.open(book?.buttons?.listenAudiobook, "_blank");
  };

  if (!book) {
    return <BookNotFound slug={slug} />;
  }

  // Check if current theme is dark mode
  const isDarkMode = themeName === 'dark' || themeName === 'midnight' || themeName === 'cyberpunk';

  return (
    <>
      <BookSEO book={book} />

      <div className={`${theme.background?.section || 'bg-gray-50 dark:bg-gray-900'} min-h-screen`}>
        <div
          className={`
            ${theme.layout?.containerWidth || 'max-w-7xl'} 
            mx-auto 
            ${theme.layout?.sectionPadding || 'py-12 px-4 sm:px-6 lg:px-8'}
          `}
        >
          {/* Main Book Details */}
          <div
            className={`
              flex flex-col lg:flex-row gap-8 mb-16 
              ${theme.shadow?.container || 'shadow-lg'} 
              ${theme.border?.default || 'border border-gray-200 dark:border-gray-700'} 
              p-6 
              ${theme.background?.section || 'bg-white dark:bg-gray-800'} 
              rounded-2xl
            `}
          >
            <BookCover book={book} />

            <div className="lg:w-2/3 space-y-6">
              <BookInfo book={book} />

              <BookActions
                book={book}
                bookStatus={bookStatus}
                isInWishlist={isInWishlist}
                isInCollection={isInCollection}
                onGetBook={handleGetBook}
                onScrollToSummary={scrollToSummary}
                onWishlist={handleWishlist}
                onShare={handleShare}
                onAddToLibrary={handleAddToLibrary}
                onReadStatus={handleReadStatus}
              />
            </div>
          </div>

          {/* Detailed Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <BookKeyPoints book={book} />
            <BookSubjects book={book} />
            <BookPublicationDetails book={book} />
          </div>

          {/* About Section */}
          <BookAbout book={book} />

          {/* Summary - with ref attached */}
          <div ref={summaryRef}>
            <BookSummary book={book} />
          </div>

          {/* Related Books */}
          <RelatedBooks
            relatedByAuthor={relatedByAuthor}
            relatedByCategory={relatedByCategory}
            book={book}
          />

          {/* Bottom Navigation */}
          <BookNavigation />
        </div>
      </div>
    </>
  );
};

export default BookDetailsPage;