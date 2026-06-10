'use client';

import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Project from '@/components/home/Project';
import TechStack from '@/components/home/TechStack';
import WhatIDo from '@/components/home/WhatIDo';
import Journey from '@/components/home/Journey';
import Certificates from '@/components/home/Certificate';
import ContactForm from '@/components/contact/ContactForm';
import { useEffect } from 'react';

export default function Home() {
  // Inject JSON-LD untuk SEO 
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
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
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <section className="pt-20 pb-0">
        <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div id="home">
            <Hero />
          </div>

          <TechStack />

          <div id="about">
            <About />
          </div>

          <div id="services">
            <WhatIDo />
          </div>

          <div id="projects">
            <Project />
          </div>

          <div id="journey">
            <Journey />
          </div>

          <div id="certificates">
            <Certificates />
          </div>

          <div id="contact" className='mb-6 md:mb-8'>
            <ContactForm />
          </div>

        </div>
      </section>
    </main>
  );
}