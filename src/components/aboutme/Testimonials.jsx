import { useState, useEffect } from 'react';
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Iván is a rare blend of technical expertise and strategic thinking. Working with him on our growth initiatives was eye-opening - his ability to translate complex technical concepts into actionable business strategies is remarkable.",
    name: "Sarah Chen",
    designation: "Director of Product at TechVision",
    src: "/api/placeholder/400/400"
  },
  {
    quote: "His leadership in implementing our AI solutions was transformative. Iván doesn't just solve problems; he anticipates them and builds scalable solutions that grow with your business.",
    name: "Michael Torres",
    designation: "CTO at DataFlow Systems",
    src: "/api/placeholder/400/400"
  },
  {
    quote: "The product roadmap Iván developed for our startup was instrumental in securing our Series A funding. His deep understanding of both technology and market dynamics is exceptional.",
    name: "Laura Stevens",
    designation: "Founder at EdTech Innovations",
    src: "/api/placeholder/400/400"
  },
  {
    quote: "Working with Iván on our automation projects was a game-changer. His ability to identify and implement the right tools while keeping the human element in mind resulted in significant efficiency gains.",
    name: "David Park",
    designation: "Head of Engineering at AutoScale",
    src: "/api/placeholder/400/400"
  },
  {
    quote: "Iván's approach to product management combines technical depth with user empathy. The growth frameworks he implemented helped us double our user retention within months.",
    name: "Elena Rodriguez",
    designation: "VP of Product at GrowthMetrics",
    src: "/api/placeholder/400/400"
  }
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-custom-bg dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-custom-bgs transition-colors duration-300"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:text-white group-hover/button:rotate-12 transition-all duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-custom-bg dark:bg-neutral-800 flex items-center justify-center group/button hover:bg-custom-bgs transition-colors duration-300"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:text-white group-hover/button:-rotate-12 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;