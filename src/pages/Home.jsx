import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import StartupGrid from '../components/StartupGrid';
import Community from '../components/Community';
import ProjectsCarousel from '../components/ProjectsCarousel';
import BlogBanner from '../components/BlogBanner';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="">
        <Hero />
        <StartupGrid />
        <Community />
        {/* <ProjectsCarousel /> */}
        <BlogBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
