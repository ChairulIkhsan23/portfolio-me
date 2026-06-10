// lib/seo.ts
import { Metadata } from 'next';

interface SeoProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    noIndex?: boolean;
    keywords?: string[];
}

export function generateSeoMetadata({
    title,
    description,
    image,
    url,
    noIndex = false,
    keywords = [],
}: SeoProps = {}): Metadata {
    const siteName = 'Chairul Ikhsan';
    const baseUrl = 'https://www.chairulikhsan.my.id';
    const defaultTitle = `${siteName} | Software Developer & AI/ML Engineer`;
    const defaultDescription = 'Portfolio Chairul Ikhsan - Software Developer, AI/ML Engineer, dan UI/UX Designer. Mahasiswa Sistem Informasi Kota Cerdas, Politeknik Negeri Indramayu. Berbasis di Majalengka, Jawa Barat.';
    const defaultImage = `${baseUrl}/og-image.jpg`;

    const metaTitle = title ? `${title} | ${siteName}` : defaultTitle;
    const metaDescription = description || defaultDescription;
    const metaImage = image || defaultImage;
    const canonicalUrl = url ? `${baseUrl}${url}` : baseUrl;

    const defaultKeywords = [
        'Chairul Ikhsan',
        'Software Developer',
        'Software Engineer',
        'AI Engineer',
        'ML Engineer',
        'UI/UX Designer',
        'Fullstack Developer',
        'Politeknik Negeri Indramayu',
        'Sistem Informasi Kota Cerdas',
        'Majalengka',
        'Jawa Barat',
    ];

    const metaKeywords = [...defaultKeywords, ...keywords];

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: metaKeywords,
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
        openGraph: {
            type: 'website',
            locale: 'id_ID',
            url: canonicalUrl,
            siteName,
            title: metaTitle,
            description: metaDescription,
            images: [
                {
                    url: metaImage,
                    width: 1200,
                    height: 630,
                    alt: metaTitle,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metaTitle,
            description: metaDescription,
            images: [metaImage],
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

// JSON-LD untuk Person (Google Knowledge Panel)
export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Chairul Ikhsan',
        url: 'https://www.chairulikhsan.my.id',
        image: 'https://www.chairulikhsan.my.id/profile.jpg',
        sameAs: [
            'https://github.com/ChairulIkhsan23',
            'https://linkedin.com/in/chairul-ikhsan-204b0927a',
            'https://www.instagram.com/ikhsan_hgz21',
        ],
        jobTitle: 'Software Developer & AI/ML Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Politeknik Negeri Indramayu',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Majalengka',
            addressRegion: 'Jawa Barat',
            addressCountry: 'Indonesia',
        },
        alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Politeknik Negeri Indramayu',
            department: 'Sistem Informasi Kota Cerdas',
        },
        knowsAbout: [
            'Software Development',
            'Artificial Intelligence',
            'Machine Learning',
            'UI/UX Design',
            'Web Development',
            'Mobile Development',
        ],
    };
}