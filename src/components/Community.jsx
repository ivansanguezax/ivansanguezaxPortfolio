import React from 'react';
import { motion } from 'framer-motion';

const Community = () => {
  const logos = [
    { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370865/sqpdgslq9pdmksccqszd.png', alt: 'Google Developer Groups', size: 'h-6 sm:h-8 md:h-10' },
    { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370873/nioyewooah5tzgsrlpkh.png', alt: 'Notion', size: 'h-6 sm:h-8 md:h-10' },
    { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370845/dqdgzw6ei4d6lqu2r5b3.png', alt: 'Sigma', size: 'h-7 sm:h-9 md:h-11' },
    { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720381257/btmc7hzjdvu8cet3adcs.png', alt: 'sgca', size: 'h-5 sm:h-6 md:h-7' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        ease: "easeInOut",
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full bg-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Content */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Empowering ideas and people to build a better future together.
            </h2>
            <p className="text-lg text-gray-600">
              Every talk is an opportunity to share, connect, and inspire action. It's about creating real impact through ideas and collaboration.
            </p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-lg"
            >
              See My Next Talk →
            </motion.button>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 space-y-6"
          >
            <motion.div variants={itemVariants} className="relative">
              <img 
                src="https://res.cloudinary.com/dfgjenml4/image/upload/v1739070905/gvlgxk4xadewngyhnfov.png"
                alt="Community Speaker"
                className="w-full rounded-2xl shadow-lg"
              />
            </motion.div>

            {/* Logos - Fully responsive without scroll */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-row items-center justify-between w-full px-2 sm:px-4"
            >
              {logos.map((logo) => (
                <div key={logo.alt} className="flex items-center justify-center px-1 sm:px-2">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.size} w-auto object-contain`}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Community;