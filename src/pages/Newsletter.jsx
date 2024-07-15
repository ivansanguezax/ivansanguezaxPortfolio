import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GridLoader } from "react-spinners";
import { getCachedNewsletters } from '../services/cacheService';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const data = await getCachedNewsletters();
        setNewsletters(data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron obtener los newsletters. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const allTags = [...new Set(newsletters.flatMap(newsletter => newsletter.tags))];

  const filteredNewsletters = selectedTag
    ? newsletters.filter(newsletter => newsletter.tags.includes(selectedTag))
    : newsletters;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#A66B37]">
        <GridLoader color="#ffffff" size={20} />
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center mt-10 bg-[#A66B37]">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="bg-[#A66B37] text-white py-12 pt-24"> {/* Añadido pt-24 para compensar el header */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <motion.img 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000141/dp7hox8obgaied0cdnxo.png" 
              alt="Newsletter Logo" 
              className="w-64 h-auto mb-6" 
            />
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center max-w-2xl text-sm" 
            >
              Bienvenido a "Un Café Contigo", donde cada domingo compartimos charlas amenas sobre tecnología, desarrollo, startups y mis aventuras diarias.
            </motion.p>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setSelectedTag(null)} 
              className={`px-4 py-2 rounded-full ${!selectedTag ? 'bg-[#F7B602] text-[#18191F]' : 'bg-gray-200 text-gray-700'} hover:bg-[#F7B602] hover:text-[#18191F] transition-colors duration-300`}
            >
              Todos
            </button>
            {allTags.map(tag => (
              <button 
                key={tag} 
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full ${selectedTag === tag ? 'bg-[#F7B602] text-[#18191F]' : 'bg-gray-200 text-gray-700'} hover:bg-[#F7B602] hover:text-[#18191F] transition-colors duration-300`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNewsletters.map((newsletter) => (
              <motion.div
                key={newsletter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  to={`/newsletter/${newsletter.slug}`}
                  className="block bg-white rounded-2xl border-2 border-[#18191F] overflow-hidden shadow-[0_4px_0_0_#18191F] hover:shadow-[0_6px_0_0_#18191F] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img src={newsletter.bannerImage} alt={newsletter.title} className="w-full h-48 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h2 className="text-xl font-bold text-white">{newsletter.title}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">{newsletter.content}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newsletter.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-[#F7B602] text-[#18191F] text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600 mb-2">{new Date(newsletter.publicationDate).toLocaleDateString()}</span>
                      <div className="flex items-center">
                        <img 
                          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721001446/i8upfaudnru81gcqu2jm.png" 
                          alt="Author Icon" 
                          className="w-5 h-5 mr-2"
                        />
                        <span className="text-sm text-gray-600">Por {newsletter.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;