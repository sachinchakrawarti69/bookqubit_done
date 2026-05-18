/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bookqubit.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/dashboard/*' },
      { userAgent: '*', disallow: '/auth/*' },
    ],
    additionalSitemaps: [
      'https://bookqubit.com/sitemap.xml',
      'https://bookqubit.com/server-sitemap.xml',
    ],
  },
  exclude: ['/dashboard/*', '/auth/*'],
  generateIndexSitemap: true,
}