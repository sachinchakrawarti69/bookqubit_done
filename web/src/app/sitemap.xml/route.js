import { getAllBooks, getAllAuthors } from '@/utils/GlobalImport'

export async function GET() {
  const baseUrl = 'https://bookqubit.com'
  const books = await getAllBooks()
  const authors = await getAllAuthors()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url><loc>${baseUrl}</loc><priority>1.0</priority></url>
      ${books.map(book => `
        <url>
          <loc>${baseUrl}/bookdeatils/${book.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>
      `).join('')}
      ${authors.map(author => `
        <url>
          <loc>${baseUrl}/authors/${author.slug}</loc>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  })
}