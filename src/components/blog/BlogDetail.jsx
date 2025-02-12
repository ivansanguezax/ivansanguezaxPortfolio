import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogBySlug, getFeaturedBlogs } from '../../services/api';
import BlogCard from './BlogCard';
import Header from '../Header';
import Footer from '../Footer';
import { Chip } from 'primereact/chip';
import NotionRenderer from './NotionRenderer';
import { BlogCardProvider } from '../../context/BlogCardContext';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // Limpia el slug antes de hacer la petición
        const cleanSlug = slug.trim();
        const blogData = await getBlogBySlug(cleanSlug);
        setBlog(blogData);
        document.title = `${blogData.title} | Un Café Contigo`;
        
        // Cargar blogs relacionados
        const allBlogs = await getFeaturedBlogs();
        const filtered = allBlogs
          .filter(b => b.slug.trim() !== cleanSlug)
          .slice(0, 2);
        setRelatedBlogs(filtered);
      } catch (error) {
        console.error('Error loading blog:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
  
    loadBlogData();
    window.scrollTo(0, 0);
  
    return () => {
      document.title = 'Un Café Contigo | Blog';
    };
  }, [slug, navigate]);
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center pt-32">
          <div className="animate-pulse space-y-8 w-full max-w-4xl px-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"/>
            <div className="h-64 bg-gray-200 rounded w-full"/>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"/>
              <div className="h-4 bg-gray-200 rounded w-5/6"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* Títulos y Descripciones Básicas */}
        <title>{`${blog.title} | Un Café Contigo`}</title>
        <meta name="description" content={blog.content} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content} />
        <meta property="og:image" content={blog.bannerImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="Un Café Contigo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.content} />
        <meta name="twitter:image" content={blog.bannerImage} />
        
        {/* Metadatos del Artículo */}
        <meta property="article:published_time" content={blog.publicationDate} />
        <meta property="article:author" content={blog.author} />
        {blog.category.map((cat, index) => (
          <meta key={index} property="article:tag" content={cat} />
        ))}
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Header />
      
      <main className="pt-32">
        {/* Contenedor principal con padding consistente */}
        <div className="max-w-4xl mx-auto px-4">
          {/* Botón Regresar */}
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            <span>Regresar al blog</span>
          </button>

          {/* Header del blog */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
                  alt={blog.author}
                  className="w-auto h-12"
                />
                <div>
                  <p className="font-medium text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(blog.publicationDate)}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {blog.category.map((cat, index) => (
                  <Chip
                    key={index}
                    label={cat}
                    className="bg-blue-100 text-blue-800"
                  />
                ))}
              </div>
            </div>
          </header>

          {/* Contenido del blog */}
          <article className="prose prose-lg prose-gray max-w-none">
            <NotionRenderer data={blog} />
          </article>

          {/* Blogs relacionados - Alineado con el contenido */}
          {relatedBlogs.length > 0 && (
            <section className="py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Seguir leyendo
              </h2>
              <BlogCardProvider>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>
              </BlogCardProvider>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;