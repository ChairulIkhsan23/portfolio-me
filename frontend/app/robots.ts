import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/test-*',
                '/_next/',
                '/*.json$',
            ],
        },
        sitemap: 'https://www.chairulikhsan.my.id/sitemap.xml',
    };
}