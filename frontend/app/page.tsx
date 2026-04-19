'use client';

import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Project from '@/components/home/Project';
import TechStack from '@/components/home/TechStack';
import WhatIDo from '@/components/home/WhatIDo';
import Journey from '@/components/home/Journey';
import Certificates from '@/components/home/Certificate';
import ContactForm from '@/components/contact/ContactForm';

export default function Home() {
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