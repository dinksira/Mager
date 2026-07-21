'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
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
import Contact from '@/components/sections/Contact';
import ServiceModal from '@/components/modals/ServiceModal';
import PortfolioModal from '@/components/modals/PortfolioModal';
import OngoingModal from '@/components/modals/OngoingModal';
import BlogModal from '@/components/modals/BlogModal';
import { servicesData } from '@/data/services';
import { portfolioData } from '@/data/portfolio';
import { ongoingData } from '@/data/ongoing';
import { blogData } from '@/data/blog';
import { EditModeProvider } from '@/contexts/EditModeContext';
import EditModeToggle from '@/components/admin/EditModeToggle';
import PublishButton from '@/components/admin/PublishButton';

function AdminDashboard() {
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
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <EditModeProvider>
      <EditModeToggle />
      <PublishButton />
      <Navbar themeToggle={<ThemeToggle />} />
      <main>
        <Hero />
        <About />
        <Services onServiceClick={(i) => { setServiceIndex(i); setServiceModalOpen(true); }} />
        <Team />
        <Portfolio onPortfolioClick={(i) => { setPortfolioIndex(i); setPortfolioModalOpen(true); }} />
        <Ongoing onOngoingClick={(i) => { setOngoingIndex(i); setOngoingModalOpen(true); }} />
        <Blog onBlogClick={(i) => { setBlogIndex(i); setBlogModalOpen(true); }} />
        <Contact />
      </main>
      <Footer />
      <ServiceModal isOpen={serviceModalOpen} onClose={() => setServiceModalOpen(false)} data={servicesData[serviceIndex] || null} />
      <PortfolioModal isOpen={portfolioModalOpen} onClose={() => setPortfolioModalOpen(false)} data={portfolioData[portfolioIndex] || null} />
      <OngoingModal isOpen={ongoingModalOpen} onClose={() => setOngoingModalOpen(false)} data={ongoingData[ongoingIndex] || null} />
      <BlogModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} data={blogData[blogIndex] || null} />
    </EditModeProvider>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1>Mager<span>.</span></h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    signIn();
    return null;
  }

  return <AdminDashboard />;
}
