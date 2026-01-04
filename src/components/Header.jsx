"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { HoverBorderGradient } from "./hover-border-gradient";
import { SlidingNumber } from "./core/sliding-number";
import toast from "react-hot-toast";

const Header = () => {
  const [currentTime, setCurrentTime] = useState({
    laPaz: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
    },
    santiago: {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
    },
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const location = useLocation();
  const { scrollY } = useScroll();

  useEffect(() => {
    // Verificar si es la primera visita
    const hasVisited = localStorage.getItem("hasVisited");
    setIsFirstVisit(!hasVisited);

    // Marcar como visitado
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    }

    // Limpiar el localStorage cuando el usuario cierra la pestaña o navegador
    const handleTabClose = () => {
      localStorage.removeItem("hasVisited");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const santiagoTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Santiago" })
      );

      setCurrentTime({
        laPaz: {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds(),
        },
        santiago: {
          hours: santiagoTime.getHours(),
          minutes: santiagoTime.getMinutes(),
          seconds: santiagoTime.getSeconds(),
        },
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (window.innerWidth >= 768) {
      const timeoutId = setTimeout(() => {
        setIsScrolled(latest > 50);
      }, 200);
      return () => clearTimeout(timeoutId);
    } else {
      setIsScrolled(latest > 50);
    }
  });

  const handleComingSoon = () => {
    toast.success("Coming soon! 🚀", {
      duration: 3000,
      position: "bottom-center",
    });
  };

  const navItems = [
    { id: "blog", name: "Blog", path: "/blog", icon: "📝", comingSoon: false },
    {
      id: "about me",
      name: "About me",
      path: "/about",
      icon: "✍️",
      comingSoon: false,
    },
    {
      id: "startups",
      name: "Startups",
      path: "/startups",
      icon: "🚀",
      comingSoon: false,
    },
  ];

  const isActiveRoute = (path) => {
    if (path === "/blog") {
      return (
        location.pathname === path || location.pathname.startsWith(`${path}/`)
      );
    }
    if (path === "/startups") {
      return location.pathname === path || location.pathname.startsWith(`${path}/`);
    }
    return location.pathname === path;
  };

  const Clock = ({ time }) => (
    <div className="flex items-center gap-0.5 font-mono">
      <span className="w-4 text-center">
        {time.hours.toString().padStart(2, "0")}
      </span>
      <span className="text-zinc-500">:</span>
      <span className="w-4 text-center">
        {time.minutes.toString().padStart(2, "0")}
      </span>
      <span className="text-zinc-500">:</span>
      <SlidingNumber value={time.seconds} padStart={true} />
    </div>
  );

  const renderNavLink = (item) => {
    if (item.comingSoon) {
      return (
        <button
          key={item.id}
          onClick={handleComingSoon}
          className={`px-4 py-2 rounded-lg transition-all duration-300 w-28 text-center hover:border-black hover:border`}
          onMouseEnter={() => setHoveredNav(item.path)}
          onMouseLeave={() => setHoveredNav(null)}
        >
          <span
            className={`transition-opacity duration-300 ${
              hoveredNav === item.path ? "hidden" : "block"
            }`}
          >
            {item.name}
          </span>
          <span
            className={`transition-opacity duration-300 ${
              hoveredNav === item.path ? "block" : "hidden"
            }`}
          >
            {item.icon}
          </span>
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        className={`px-4 py-2 rounded-lg transition-all duration-300 w-28 text-center ${
          isActiveRoute(item.path)
            ? "bg-custom-border text-white"
            : "hover:border-black hover:border"
        }`}
        onMouseEnter={() => setHoveredNav(item.path)}
        onMouseLeave={() => setHoveredNav(null)}
      >
        <span
          className={`transition-opacity duration-300 ${
            hoveredNav === item.path ? "hidden" : "block"
          }`}
        >
          {item.name}
        </span>
        <span
          className={`transition-opacity duration-300 ${
            hoveredNav === item.path ? "block" : "hidden"
          }`}
        >
          {item.icon}
        </span>
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={false} // Removemos la animación por defecto
        animate={isFirstVisit ? { y: 0, opacity: 1 } : {}} // Solo anima si es primera visita
        transition={{ ease: "easeInOut", duration: 0.6 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "mt-4" : "bg-custom-bg py-4"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 ${
            isScrolled ? "max-w-3xl" : ""
          }`}
        >
          {isScrolled ? (
            <motion.div
              className="bg-white shadow-lg rounded-full px-4 sm:px-6 py-3 flex items-center justify-between"
              initial={false} // Removemos la animación por defecto
              animate={isFirstVisit ? { y: 0, opacity: 1 } : {}} // Solo anima si es primera visita
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="md:hidden flex items-center justify-between w-full">
                  <Link to="/" className="flex-1 flex justify-center">
                    <img
                      src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1756093152/loog_vzcxy5.png"
                      alt="Logo Ivan Sangueza"
                      className="h-8 w-auto object-contain"
                      loading="lazy"
                    />
                  </Link>

                  <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
                    <svg
                      className="w-6 h-6 transform rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  {navItems.map((item) => renderNavLink(item))}
                </div>
              </div>

              <div className="hidden md:block">
                <HoverBorderGradient
                  as="a"
                  href="https://calendar.app.google/9qnqLsgxZH6Zs5N87"
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="rounded-full"
                  className="bg-white text-black flex items-center space-x-2"
                >
                  <span>📅</span>
                  <span>Let's Connect</span>
                </HoverBorderGradient>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center xl:space-x-8 md:space-x-4 flex-1 justify-center md:justify-start">
                <Link to="/" className="flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/dg1x0cwdc/image/upload/v1756093152/loog_vzcxy5.png"
                    alt="Logo Ivan Sangueza"
                    className="h-12 w-auto object-contain"
                    loading="lazy"
                  />
                </Link>

                <div className="hidden md:flex items-center xl:space-x-6 md:space-x-2">
                  {navItems.map((item) => renderNavLink(item))}
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <div className="hidden lg:flex space-x-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span>La Paz</span>
                      <span className="ml-1">🇧🇴</span>
                    </div>
                    <Clock time={currentTime.laPaz} />
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <span>Santiago</span>
                      <span className="ml-1">🇨🇱</span>
                    </div>
                    <Clock time={currentTime.santiago} />
                  </div>
                </div>

                <HoverBorderGradient
                  as="a"
                  href="https://calendar.app.google/9qnqLsgxZH6Zs5N87"
                  target="_blank"
                  rel="noopener noreferrer"
                  containerClassName="rounded-full"
                  className="bg-white text-black flex items-center space-x-2"
                >
                  <span>📅</span>
                  <span>Let's Connect</span>
                </HoverBorderGradient>
              </div>

              <button
                className="md:hidden pr-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6 transform rotate-45"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden fixed z-40 ${
              isScrolled
                ? "top-20 inset-x-4 max-w-3xl mx-auto left-0 right-0"
                : "top-20 inset-x-4"
            }`}
          >
            <div className="bg-white shadow-lg rounded-3xl border border-gray-100 overflow-hidden">
              <div className="p-4 space-y-3">
                {navItems.map((item) =>
                  item.comingSoon ? (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleComingSoon();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 py-3 px-4 hover:bg-gray-100 rounded-xl"
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center space-x-2 py-3 px-4 hover:bg-gray-100 rounded-xl ${
                        isActiveRoute(item.path)
                          ? "bg-custom-border text-white"
                          : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )
                )}
                <a
                  href="https://calendar.app.google/9qnqLsgxZH6Zs5N87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 py-3 px-4 bg-black text-white rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <span>📅</span>
                  <span>Let's Connect</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
