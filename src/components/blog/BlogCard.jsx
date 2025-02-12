// src/components/blog/BlogCard.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogCard } from '../../context/BlogCardContext';
import { useNavigate } from 'react-router-dom';

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
    const cleanSlug = blog.slug.trim();
    navigate(`/blog/${cleanSlug}`);
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
            className="absolute bottom-0 left-0 right-0 rounded-xl bg-zinc-900/95 px-4 pt-2"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={contentVariants}
          >
            <button
              className="w-full pb-2 text-left text-[16px] font-medium text-white line-clamp-1"
              onClick={handleToggle}
            >
              {blog.title}
            </button>
            <div className="flex flex-col pb-4 text-[14px] text-zinc-300">
              <p className="line-clamp-3 mb-4">
                {blog.content}
              </p>
              <button
  onClick={handleReadMore}
  className="mt-auto w-full rounded-[4px] border border-zinc-700 bg-zinc-800 px-4 py-2 text-zinc-50 transition-colors duration-300 hover:bg-zinc-700"
  type="button"
>
  Discover More
</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCard;