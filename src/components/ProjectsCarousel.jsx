import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CarouselContext = createContext({
  onCardClose: (index) => {},
  currentIndex: 0,
});

const data = [
  {
    category: "AI & Web Development",
    title: "AI Summarizer",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739156701/e8zmfs0c9r4zmemelt2b.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className=" text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
          SumAI is an AI-powered application designed to save users time and enhance productivity by summarizing articles in seconds. By leveraging modern AI technologies and a clean, intuitive interface, SumAI extracts key insights from any article URL, eliminating the hassle of information overload.
        </p>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/IQXfZ4jln-w?si=RLBodxhzUpLJR9mY" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
          className="mt-8 rounded-xl"
        />
      </div>
    ),
  },
  {
    category: "Saas Web Development",
    title: "Xora | SaaS Landing",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739156572/uhnefmacciezsdymfcny.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl  max-w-3xl mx-auto">
          Xora is a modern and visually appealing landing page designed to promote an AI-powered video editor. The page highlights the product's simplicity, power, and speed, providing a seamless experience for users seeking innovative video editing solutions.
        </p>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/Em_xKFMLTZM?si=0UVf2u4N53Hs3eOr" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
          className="mt-8 rounded-xl"
        />
      </div>
    ),
  },
  {
    category: "AI & Growth engineering",
    title: "Wilicar: Sell Your Car",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739156226/ei4craym012jufzccgvv.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
          Looking to sell your car quickly and securely? Wilicar makes it easy! With a simple listing process, AI-powered support, and maximum visibility, you'll connect with the right buyers fast. Wilicar: safe, simple, sold!
        </p>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/HWkClYZhHyM?si=8AqwFSUvVf8v9p5t&start=1" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
          className="mt-8 rounded-xl"
        />
      </div>
    ),
  },
  {
    category: "Web Development & Design",
    title: "Hilink",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739157234/ttqykeuxpmyh9kfb3lot.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
          Hilink is a responsive and interactive landing page built with Next.js and Tailwind CSS, designed to showcase a camping and adventure app. The project focuses on delivering a seamless user experience through a modern design, reusable components, and a focus on performance and scalability.
        </p>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/thYZ8j3nhv4?si=KFcxk1TdPk7b-ixz" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
          className="mt-8 rounded-xl"
        />
      </div>
    ),
  },
  {
    category: "Web Development & Growth engineering",
    title: "Bank Landing",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739157626/k0mxkpszdjpmbaieduyr.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl max-w-3xl mx-auto">
          The Horizon Bank Landing Page is built using modern web technologies to ensure a responsive and visually appealing interface. It features various sections such as services, testimonials, and a call-to-action, all aimed at enhancing the user experience. This project showcases the design and development of the Horizon Bank landing page. The landing page is designed to be modern, intuitive, and user-friendly, providing a seamless experience for users.
        </p>
        <a 
          href="https://res.cloudinary.com/upwork-fp/image/upload/v1722151972/profile/portfolio/1449901177950367744/orfaokss3a06kcqzd6vm.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Documentation PDF
        </a>
      </div>
    ),
  },
  {
    category: "AI & Payments",
    title: "Payment secure",
    src: "https://res.cloudinary.com/dfgjenml4/image/upload/v1739155977/jrdidpyhwwghvotlol6t.png",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl  max-w-3xl mx-auto">
          Seiff is a technology platform that redefines used car transactions between individuals in LATAM by ensuring secure payments, digital transfers, and a centralized buying and selling process
        </p>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube.com/embed/yup-IewGpgc?si=L2KnQMtylNIL2XBy" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen 
          className="mt-8 rounded-xl"
        />
      </div>
    ),
  },
];

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <X className="h-6 w-6 text-white dark:text-black" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={() => setOpen(true)}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] mt-2 hidden md:block"
          >
            {card.title}
          </motion.p>
        </div>
        <img
          src={card.src}
          alt={card.title}
          className="object-cover absolute z-10 inset-0 w-full h-full"
        />
      </motion.button>
    </>
  );
};

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          ref={carouselRef}
          className="flex w-full overflow-x-scroll scroll-smooth [scrollbar-width:none] py-10 md:py-7"
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export function ProjectsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800">
        My Projects
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

export default ProjectsCarousel;