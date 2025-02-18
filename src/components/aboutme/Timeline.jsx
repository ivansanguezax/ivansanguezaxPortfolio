import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { HoverBorderGradient } from '../hover-border-gradient';

export const Timeline = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height - 40);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const experienceData = [
    {
      title: "Sept 2024 - Present",
      subtitle: "Chief Technology Officer & Founder | Seiff",
      description: "Secure checkout for buying and selling used cars.",
      location: "Chile – Metropolitana de Santiago",
      tags: ["Leadership", "LangChain", "FastAPI", "React", "Flutter", "Mixpanel", "n8n"],
      content: "As CTO at Seiff, a startup spun out from Güil Mobility Ventures and the Kauffman Group where I continued my work after Güil, also acted as Product Manager by defining product roadmaps, managing backlog, and leading product growth to align business and technical goals. Built an AI-powered payment platform with CRM automation, data pipelines, and real-time tracking to enhance conversion rates. Raised $100K in pre-seed funding at a $2M valuation, ensuring KPI-driven financial management and scalable growth.",
      link: {
        url: "https://www.seiff.cl/",
        text: "Visit Seiff",
        icon: "🚀"
      }
    },
    {
      title: "Jan 2024 - Sept 2024",
      subtitle: "Senior Frontend Developer & Growth Engineer | Güil Mobility Ventures",
      description: "A venture builder that creates mobility startups from scratch",
      location: "Chile – Metropolitana de Santiago",
      tags: ["React", "Next.js", "Vue", "Figma", "Google Analytics", "Mixpanel"],
      content: "Led engineering and growth efforts for multiple startups at Güil, acting as Tech Lead while building and optimizing data-driven growth funnels that improved conversion rates and retention. Delivered measurable growth improvements within 9 months by optimizing funnels and implementing data-driven strategies, reducing drop-off by 15%.",
      link: {
        url: "https://guilventures.com/es",
        text: "View Company",
        icon: "💡"
      }
    },
    {
      title: "Dec 2021 - Dec 2023",
      subtitle: "Chief Technology Officer & Founder | Menti Academy",
      description: "The platform that makes learning online fun for kids",
      location: "Bolivia – La Paz",
      tags: ["Leadership", "Technical Expertise", "React", "Zapier"],
      content: "As CTO at Menti Academy, spearheaded the growth and technical development of an edtech platform, scaling it to 5,000+ students. Led product strategy through well-defined roadmaps, feature prioritization, and the integration of SEO, automation, and data-driven insights to enhance user engagement and retention."
    }
  ];

  return (
    <motion.div 
      className="w-full bg-gray-100 font-sans md:px-10 relative"
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      <motion.div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-4xl mb-4 text-black font-bold"
          >
            My Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-700 text-sm md:text-base max-w-2xl"
          >
            Here's a timeline of my professional experience and achievements in product management and technology leadership.
          </motion.p>
        </div>

        {experienceData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 relative"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                <div className="h-4 w-4 rounded-full bg-blue-600 border border-gray-200" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-blue-600">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-blue-600">
                {item.title}
              </h3>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:border-blue-100 transition-all duration-300">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {item.subtitle}
                </h4>
                <p className="text-gray-600 text-sm italic mb-2">
                  {item.description}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {item.location}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {item.content}
                </p>
                {item.link && (
                  <div className="w-full md:w-48">
                    <HoverBorderGradient
                      as="a"
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      containerClassName="rounded-full w-full"
                      className="bg-white text-black flex items-center justify-center space-x-2 py-2 px-4 w-full"
                    >
                      <span>{item.link.icon}</span>
                      <span>{item.link.text}</span>
                    </HoverBorderGradient>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          style={{
            height: height + "px",
            position: 'absolute'
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-blue-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-600 via-blue-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Timeline;