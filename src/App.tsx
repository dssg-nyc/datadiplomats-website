import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Gap } from './components/Gap';
import { Reality } from './components/Reality';
import { Membership } from './components/Membership';
import { Glance } from './components/Glance';
import { HowItWorks } from './components/HowItWorks';
import { Faq } from './components/Faq';
import { Join } from './components/Join';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/primitives';

export default function App() {
  const scrollToJoin = () =>
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <ScrollProgress />
      <Nav />

      <main className="grow">
        <Hero onJoin={scrollToJoin} />
        <Gap />
        <Reality onJoin={scrollToJoin} />
        <Membership onJoin={scrollToJoin} />
        <Glance />
        <HowItWorks />
        <Faq />
        <Join />
      </main>

      <Footer />
    </div>
  );
}
