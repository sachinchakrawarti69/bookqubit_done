import { getBooks } from '@/lib/api'

const BASE_URL = 'https://www.bookqubit.com'

export default async function sitemap() {
  // fetch books from API for sitemap
  let booksData = []
  try {
    const res = await getBooks();
    booksData = Array.isArray(res) ? res : (res && res.books) || [];
  } catch (e) {
    booksData = [];
  }
  const authorsData = []
  const publicationsData = []

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
  const bookPages = booksData.map((book) => ({
    url: `${BASE_URL}/bookdeatils/${book.slug}`, // Note: typo in 'bookdeatils' vs 'bookdetails'
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Dynamic Author Pages
  const authorPages = authorsData.map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Dynamic Publication Pages
  const publicationPages = publicationsData.map((publication) => ({
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