export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /auth/login/
Disallow: /auth/register/
Disallow: /search?
Sitemap: https://bookqubit.com/sitemap.xml`
  
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}