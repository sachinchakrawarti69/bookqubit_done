import { academicBooksEnglish } from "./academic_books_english";
import { academicBooksHindi } from "./academic_books_hindi";
import { academicBooksTamil } from "./academic_books_tamil";
import { academicBooksUrdu } from "./academic_books_urdu";
import { academicBooksArabic } from "./academic_books_arabic"; // Fixed: Changed from academicBookArabic to academicBooksArabic
import { academicBooksBangla } from "./academic_books_bangla";
import { academicBooksMarathi } from "./academic_books_marathi";
import { academicBooksKannada } from "./academic_books_kannada";
import { academicBooksChinese } from "./academic_books_chinese";
import { academicBooksFrench } from "./academic_books_french";
import { academicBooksGerman } from "./academic_books_german";
import { academicBooksItalian } from "./academic_books_italian";
import { academicBooksJapanese } from "./academic_books_japanese";
import { academicBooksKorean } from "./academic_books_korean";
import { academicBooksPersian } from "./academic_books_persian";
// Add more imports as you create them

// For now, use English as the default. Add other languages as you create them.
export const academicBooksTranslations = {
  en: academicBooksEnglish,
  hi: academicBooksHindi,
  ur: academicBooksUrdu,
  ar: academicBooksArabic, // Now this matches the import
  bn: academicBooksBangla, // Updated to use actual Bangla file
  mr: academicBooksMarathi, // Updated to use actual Marathi file
  ta: academicBooksTamil,
  kn: academicBooksKannada, // Updated to use actual Kannada file
  zh: academicBooksChinese, // Updated to use actual Chinese file
  fr: academicBooksFrench, // Updated to use actual French file
  de: academicBooksGerman, // Updated to use actual German file
  it: academicBooksItalian, // Updated to use actual Italian file
  ja: academicBooksJapanese, // Updated to use actual Japanese file
  ko: academicBooksKorean, // Updated to use actual Korean file
  fa: academicBooksPersian, // Updated to use actual Persian file
  ru: academicBooksEnglish, // Fallback to English until Russian file is ready
};

// Get academic books by language with fallback to English
export const getAcademicBooksByLanguage = (lang) => {
  try {
    const books = academicBooksTranslations[lang] || academicBooksEnglish;
    console.log(`Loading books for language: ${lang}, found ${books?.length || 0} books`);
    return books || [];
  } catch (error) {
    console.error("Error in getAcademicBooksByLanguage:", error);
    return academicBooksEnglish || [];
  }
};

// Helper function to get a single academic book by slug
export const getAcademicBookBySlug = (slug, lang) => {
  if (!slug) return null;
  const books = getAcademicBooksByLanguage(lang);
  return books.find(book => book.slug === slug) || null;
};

// Helper function to get academic books by category
export const getAcademicBooksByCategory = (category, lang) => {
  if (!category) return [];
  const books = getAcademicBooksByLanguage(lang);
  return books.filter(book => book.category === category);
};

// Helper function to search academic books
export const searchAcademicBooks = (searchTerm, lang) => {
  if (!searchTerm) return getAcademicBooksByLanguage(lang);
  const books = getAcademicBooksByLanguage(lang);
  const term = searchTerm.toLowerCase();
  return books.filter(book => 
    book.title?.toLowerCase().includes(term) ||
    book.author?.toLowerCase().includes(term) ||
    book.description?.toLowerCase().includes(term) ||
    book.tags?.some(tag => tag.toLowerCase().includes(term))
  );
};

// Default export for backward compatibility
const academicBooksData = academicBooksEnglish;
export default academicBooksData;