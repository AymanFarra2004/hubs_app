import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://qareeb.cc';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/auth', '/api'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
