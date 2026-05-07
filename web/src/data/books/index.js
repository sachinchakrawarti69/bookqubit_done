import booksEnglish from './BooksData_English';
import booksHindi from './BooksData_Hindi';
import booksUrdu from './BooksData_Urdu';

export const booksTranslations = {
  en: booksEnglish,
  hi: booksHindi,
  ur: booksUrdu
};

export const getBooksByLanguage = (lang) => {
  return booksTranslations[lang] || booksTranslations.en;
};

// Helper function to get a single book by slug in specific language
export const getBookBySlug = (slug, lang) => {
  const books = getBooksByLanguage(lang);
  return books.find(book => book.slug === slug);
};

// Helper function to get all books across all languages (for search)
export const getAllBooks = () => {
  return {
    en: booksTranslations.en,
    hi: booksTranslations.hi,
    ur: booksTranslations.ur
  };
};

// Default export for backward compatibility
export default booksEnglish;