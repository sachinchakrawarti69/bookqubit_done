export async function GET() {
  const robots = `
User-agent: *
Allow: /

Sitemap: https://www.bookqubit.com/sitemap.xml
`

  return new Response(robots.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}