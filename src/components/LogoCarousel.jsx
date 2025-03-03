import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370865/sqpdgslq9pdmksccqszd.png', alt: 'Google Developer Groups' },
  { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370873/nioyewooah5tzgsrlpkh.png', alt: 'Notion' },
  { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720370845/dqdgzw6ei4d6lqu2r5b3.png', alt: 'Sigma' },
  { src: 'https://res.cloudinary.com/dfgjenml4/image/upload/v1720381257/btmc7hzjdvu8cet3adcs.png', alt: 'sgca' }
];

const LogoCarousel = () => {
  return (
    <div className="py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-8">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="w-20 h-10 md:w-24 md:h-12 object-contain transition-all duration-300 filter grayscale group-hover:filter-none"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;