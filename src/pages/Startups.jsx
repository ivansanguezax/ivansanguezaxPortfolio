import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const Startups = () => {
  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="founders-section"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Empowering Founders to Build the Future
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Every great company starts with a vision. We help founders transform their ideas into products that change the world.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="inline-block"
            >
              <div className="px-8 py-4 border-2 border-gray-900 rounded-full inline-block">
                <span className="text-base md:text-lg font-semibold text-gray-900 uppercase tracking-wider">
                  Próximamente
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Startups;
