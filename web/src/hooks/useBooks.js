"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBooks, getBookBySlug } from '@/lib/api';

export const useBooks = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const booksData = await getBooks(language);
        setBooks(Array.isArray(booksData) ? booksData : (booksData && booksData.books) || []);
      } catch (err) {
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [language]);

  return { books, loading, language };
};

export const useBook = (slug) => {
  const { language } = useLanguage();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const bookData = await getBookBySlug(slug, language);
        setBook(bookData);
      } catch (err) {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadBook();
  }, [slug, language]);

  return { book, loading, language };
};