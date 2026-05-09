import { academicBooksEnglish } from "./academic_books_english";
import { academicBooksHindi } from "./academic_books_hindi";
import { academicBooksTamil } from "./academic_books_tamil"
import { academicBooksUrdu } from "./academic_books_urdu";


// For now, use English as the default. Add other languages as you create them.
export const academicBooksTranslations = {
  en: academicBooksEnglish,
  hi: academicBooksHindi,
  ur: academicBooksUrdu, 
  ar: academicBooksEnglish, // Fallback to English until Arabic file is ready
  bn: academicBooksEnglish, // Fallback to English until Bangla file is ready
  mr: academicBooksEnglish, // Fallback to English until Marathi file is ready
  ta: academicBooksTamil, 
  kn: academicBooksEnglish, // Fallback to English until Kannada file is ready
  zh: academicBooksEnglish, // Fallback to English until Chinese file is ready
  fr: academicBooksEnglish, // Fallback to English until French file is ready
  de: academicBooksEnglish, // Fallback to English until German file is ready
  it: academicBooksEnglish, // Fallback to English until Italian file is ready
  ja: academicBooksEnglish, // Fallback to English until Japanese file is ready
  ko: academicBooksEnglish, // Fallback to English until Korean file is ready
  fa: academicBooksEnglish, // Fallback to English until Persian file is ready
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