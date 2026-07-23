'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Team from '@/components/sections/Team';
import Portfolio from '@/components/sections/Portfolio';
import Ongoing from '@/components/sections/Ongoing';
import Blog from '@/components/sections/Blog';
import Testimonials from '@/components/sections/Testimonials';
import Partners from '@/components/sections/Partners';
import Contact from '@/components/sections/Contact';
import ServiceModal from '@/components/modals/ServiceModal';
import PortfolioModal from '@/components/modals/PortfolioModal';
import OngoingModal from '@/components/modals/OngoingModal';
import BlogModal from '@/components/modals/BlogModal';
import { servicesData } from '@/data/services';
import { portfolioData } from '@/data/portfolio';
import { ongoingData } from '@/data/ongoing';
import { blogData } from '@/data/blog';
import EditModeToggle from '@/components/admin/EditModeToggle';
import PublishButton from '@/components/admin/PublishButton';
import { useEditMode } from '@/contexts/EditModeContext';

export default function AdminPage() {
  const { editedContent } = useEditMode();

  const getService = (i: number) => {
    try {
      const raw = editedContent['services.items'];
      if (raw) {
        const items = JSON.parse(raw);
        if (items?.[i]) {
          const s = items[i];
          return { ...servicesData[i], ...s, features: s.features ?? [], tag: s.tag ?? '' };
        }
      }
    } catch {}
    return servicesData[i];
  };

  const getItem = (key: string, fallback: any[], i: number) => {
    try {
      const raw = editedContent[key];
      if (raw) {
        const items = JSON.parse(raw);
        if (items?.[i]) return { ...fallback[i], ...items[i] };
      }
    } catch {}
    return fallback[i];
  };
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [ongoingModalOpen, setOngoingModalOpen] = useState(false);
  const [ongoingIndex, setOngoingIndex] = useState(0);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogIndex, setBlogIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add('visible');
      else observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <EditModeToggle />
      <PublishButton />
      <Navbar themeToggle={<ThemeToggle />} />
      <main style={{ paddingTop: 40 }}>
        <Hero />
        <About />
        <Services onServiceClick={(i) => { setServiceIndex(i); setServiceModalOpen(true); }} />
        <Team />
        <Portfolio onPortfolioClick={(i) => { setPortfolioIndex(i); setPortfolioModalOpen(true); }} />
        <Ongoing onOngoingClick={(i) => { setOngoingIndex(i); setOngoingModalOpen(true); }} />
        <Blog onBlogClick={(i) => { setBlogIndex(i); setBlogModalOpen(true); }} />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />

      <ServiceModal isOpen={serviceModalOpen} onClose={() => setServiceModalOpen(false)} data={getService(serviceIndex)} />
      <PortfolioModal isOpen={portfolioModalOpen} onClose={() => setPortfolioModalOpen(false)} data={getItem('portfolio.items', portfolioData, portfolioIndex)} />
      <OngoingModal isOpen={ongoingModalOpen} onClose={() => setOngoingModalOpen(false)} data={getItem('ongoing.items', ongoingData, ongoingIndex)} />
      <BlogModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} data={getItem('blog.posts', blogData, blogIndex)} />
    </>
  );
}
