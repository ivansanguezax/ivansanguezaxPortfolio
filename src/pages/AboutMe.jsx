import React from 'react';
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { HoverBorderGradient } from '../components/hover-border-gradient';
import Header from '../components/Header';
import Timeline from "../components/aboutme/Timeline";
import Skills from "../components/aboutme/Skills";
import CTASection from '../components/aboutme/CTASection';

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

      <div className="min-h-screen bg-custom-bg">
        <Header />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="pt-32 pb-16 relative" // Añadido relative aquí
          style={{ position: 'relative' }} // Aseguramos la posición relativa
        >
          <motion.section 
            variants={itemVariants} 
            className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-4"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dfgjenml4/image/upload/v1739823706/courses/pr0vvtpomybk2n7yt5ob.jpg"
                alt="Iván Sangueza"
                className="w-full h-full object-cover rounded-2xl shadow-lg animate-fadeIn"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-6">
              <blockquote className="text-lg md:text-xl text-gray-700 border-l-4 border-custom-bgs pl-6 animate-fadeIn">
              I'm Iván Sangueza, a Product Manager with a strong technical background in software engineering, growth strategy, and AI integration. I've led cross-functional teams across LATAM, the U.S., and Europe, managing product roadmaps, scaling products, and driving automation for impactful results. My journey includes raising $100K in pre-seed funding for Seiff, achieving a successful exit at Menti Academy, and optimizing growth funnels that improved user retention. Let’s build something great together.              </blockquote>
              
              <div className="w-full md:w-64">
                <HoverBorderGradient
                  as="a"
                  href="https://calendly.com/ivansanguezax/mentoria"
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="rounded-full w-full"
                  className="bg-white text-black flex items-center justify-center space-x-2 py-3 px-6 w-full"
                >
                  <span>🎯</span>
                  <span>Work with me</span>
                </HoverBorderGradient>
              </div>
            </div>
          </motion.section>
          <Timeline />
          <Skills />
          <CTASection />
        </motion.main>
      </div>
    </>
  );
};

export default AboutMe;