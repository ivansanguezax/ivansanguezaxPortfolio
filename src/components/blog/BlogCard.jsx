import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogCard } from '../../context/BlogCardContext';
import { useNavigate } from 'react-router-dom';
import mixpanel from '../../utils/mixpanel';

const BlogCard = ({ blog }) => {
  const cardRef = useRef(null);
  const { openCardId, setOpenCardId } = useBlogCard();
  const isOpen = openCardId === blog.id;
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpenCardId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenCardId]);

  const handleToggle = () => {
    setOpenCardId(isOpen ? null : blog.id);
  };

  const handleReadMore = () => {
    mixpanel.track('BlogClick', {
      blog_title: blog.title,
      blog_slug: blog.slug,
      category: blog.category || 'Uncategorized',
      source_page: window.location.pathname,
    });
    const cleanSlug = blog.slug.trim();
    navigate(`/blog/${cleanSlug}`);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  const imageVariants = {
    collapsed: { 
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.3 }
    },
    expanded: { 
      scale: 1.1,
      filter: 'blur(3px)',
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    collapsed: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
    expanded: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <div ref={cardRef} className="relative h-[350px] w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0" onClick={handleToggle}>
        <motion.div
          className="relative w-full h-full"
          initial="collapsed"
          animate={isOpen ? 'expanded' : 'collapsed'}
          variants={imageVariants}
        >
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="absolute w-full h-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-xl bg-zinc-900/95 px-4 pt-3"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
          >
            <h3
              className="mb-2 text-[16px] font-semibold text-white overflow-hidden text-ellipsis"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {truncateText(blog.title, 80)}
            </h3>
            <div className="flex flex-col pb-4 text-[14px] text-zinc-300">
              <p 
                className="mb-4 overflow-hidden text-ellipsis"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {truncateText(blog.content, 150)}
              </p>
              <button
                onClick={handleReadMore}
                className="mt-auto w-full rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white font-medium transition-all duration-300 hover:bg-white/20 hover:border-white/80 active:scale-[0.98]"
                type="button"
              >
                Read Full Article →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCard;