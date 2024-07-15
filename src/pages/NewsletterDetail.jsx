import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import { GridLoader } from "react-spinners";
import NotionRenderer from '../components/NotionRenderer';
import { getCachedNewsletterBySlug } from '../services/cacheService';

const NewsletterDetail = () => {
  const { slug } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        setLoading(true);
        const data = await getCachedNewsletterBySlug(slug);
        setNewsletter(data);
        setError(null);
      } catch (err) {
        setError('No se pudo obtener el newsletter. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#A66B37" size={20} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!newsletter) {
    return <div className="text-center mt-10">Newsletter no encontrado.</div>;
  }

  const metaDescription = newsletter.content.substring(0, 160);
  const canonicalUrl = `https://tudominio.com/newsletter/${slug}`;

  return (
    <>
      <Helmet>
        <title>{`${newsletter.title} | Un Café Contigo`}</title>
        <link rel="icon" type="image/png" href="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png" />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={newsletter.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={newsletter.bannerImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={newsletter.title} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={newsletter.bannerImage} />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <Link to="/newsletter" className="text-blue-500 hover:underline mb-4 inline-block">
            &larr; Volver a la lista de newsletters
          </Link>

          <article className="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
            <img 
              src={newsletter.bannerImage} 
              alt={newsletter.title} 
              className="w-full h-64 object-cover"
            />
            
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{newsletter.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <span className="mr-4">{new Date(newsletter.publicationDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span>Por {newsletter.author}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {newsletter.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose max-w-none">
                <NotionRenderer blocks={newsletter.blocks} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </>
  );
};

export default NewsletterDetail;