// src/layouts/BlogLayout.jsx
import Header from '../components/Header';
import BlogGrid from '../components/blog/BlogGrid';
import HeroCarousel from '../components/blog/HeroCarousel';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
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