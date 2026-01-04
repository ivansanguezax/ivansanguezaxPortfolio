import React from 'react';
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Timeline from "../components/aboutme/Timeline";
import Skills from "../components/aboutme/Skills";
import CTASection from '../components/aboutme/CTASection';
import Footer from '../components/Footer';

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>About Me - Iván Sangueza</title>
        <meta 
          name="description" 
          content="Product Manager with a strong technical background in software engineering, growth strategy, and AI integration."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        <Header />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="pt-32 relative" // Añadido relative aquí
          style={{ position: 'relative' }} // Aseguramos la posición relativa
        >
          <motion.section 
            variants={itemVariants} 
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4 sm:px-6 lg:px-10"
          >
            <div className="relative rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1767478776/Group_1_dmp4cm.svg"
                alt="Ivan Sangueza - Product Manager"
                className="w-full h-auto rounded-2xl shadow-lg animate-fadeIn"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-6">
              <blockquote className="text-lg md:text-xl text-gray-700 border-l-4 border-custom-bgs pl-6 animate-fadeIn">
                I'm Iván Sangueza, a Product Manager with a strong technical background in software engineering, growth strategy, and AI integration. I've led cross-functional teams across LATAM, the U.S., and Europe, managing product roadmaps, scaling products, and driving automation for impactful results. My journey includes achieving a successful exit at Menti Academy, currently building Favorcito—a platform connecting university students with businesses for hourly tasks across Bolivia—and serving as a Notion Ambassador. Let's build something great together.
              </blockquote>
              
              {/* Logos */}
              <div className="flex flex-row items-center gap-4 md:gap-6 mt-4">
                <img
                  src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1767480138/ambassador-white_1_tn41x4.svg"
                  alt="Notion Ambassador"
                  className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <img
                  src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1767480137/Group_2_vhs2sx.svg"
                  alt="Google Developers"
                  className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <img
                  src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1767480137/Group_3_y8jyb2.svg"
                  alt="Favorcito"
                  className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.section>
          <Timeline />
          <Skills />
          <CTASection />
          <Footer />
        </motion.main>
      </div>
    </>
  );
};

export default AboutMe;