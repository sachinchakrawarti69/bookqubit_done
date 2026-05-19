import { BooksData } from '@/data/books/BooksData'
import { AuthorsData } from '@/data/authors/AuthorsData'
import { PublicationsData } from '@/data/publications/PublicationsData'

const BASE_URL = 'https://www.bookqubit.com'

export default function sitemap() {
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/bookslist',
    '/comicslist',
    '/authors',
    '/publications',
    '/collections',
    '/search',
    '/footerpages/blog',
    '/footerpages/news',
    '/footerpages/contact',
    '/footerpages/faq',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic Book Pages
  const bookPages = BooksData.map((book) => ({
    url: `${BASE_URL}/bookdeatils/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Dynamic Author Pages
  const authorPages = AuthorsData.map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic Publication Pages
  const publicationPages = PublicationsData.map((publication) => ({
    url: `${BASE_URL}/publications/${publication.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...bookPages,
    ...authorPages,
    ...publicationPages,
  ]
}