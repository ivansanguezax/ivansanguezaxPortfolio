import React, { useEffect, Suspense } from 'react';
import Header from '../components/Header';
import BlogGrid from '../components/blog/BlogGrid';
import HeroCarousel from '../components/blog/HeroCarousel';
import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full">
        <HeroCarousel />
        <BlogGrid />
      </main>
    </div>
  );
};

export default BlogLayout;