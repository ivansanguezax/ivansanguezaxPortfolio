import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BackgroundGradient } from "./BackgroundGradient";
import { HoverBorderGradient } from "./hover-border-gradient";

const BlogBanner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-2 sm:p-4">
      <BackgroundGradient className="rounded-2xl bg-white">
        <div className="flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-12">
          <div className="flex-1 text-center md:text-left space-y-4 w-full">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-[2.5rem] font-bold leading-tight text-neutral-900"
            >
              Grab a coffee
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent px-2">
                spark your curiosity
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600"
            >
              Unwind with stories that inspire, ideas that ignite, and insights that matter.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex justify-center md:justify-start w-full"
            >
              <Link to="/blog">
                <HoverBorderGradient
                  className="bg-white text-black hover:text-black"
                  containerClassName="md:w-auto mx-auto md:mx-0"
                >
                  <span className="w-full block">
                    Start Reading
                  </span>
                </HoverBorderGradient>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <img 
              src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
              alt="Relaxed character"
              className="w-40 md:w-48 h-auto object-contain"
            />
          </motion.div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default BlogBanner;