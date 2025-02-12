import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { HelmetProvider } from 'react-helmet-async';

// Components
import Home from "./pages/Home";
import BlogLayout from "./pages/BlogLayout";
import EventsLayout from "./pages/EventLayout";
import EventDetail from "./components/events/EventDetail";
import BlogDetail from "./components/blog/BlogDetail";
import LoadingSpinner from "./components/LoadingSpinner";

// PrimeReact imports
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const imagesToPreload = [
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720311811/tip7xyfvup8bgtnvjopv.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720371522/ct1tu7f3fmsyyuwfc7tg.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370865/sqpdgslq9pdmksccqszd.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370873/nioyewooah5tzgsrlpkh.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370845/dqdgzw6ei4d6lqu2r5b3.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370856/kwcskaflmqbo922omhzy.png",
];

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.onerror = img.onabort = function() {
      reject(src);
    };
    img.src = src;
  });
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const nodeRef = useRef(null);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!isFirstLoadRef.current) {
      setLoading(false);
      setShowContent(true);
      return;
    }

    // Aseguramos un tiempo mínimo de 2 segundos para el loading
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

    const loadImages = async () => {
      try {
        await Promise.all([
          minLoadingTime,
          ...imagesToPreload.map(preloadImage)
        ]);
      } catch (error) {
        console.error("Error preloading images:", error);
      }

      isFirstLoadRef.current = false;
      setLoading(false);
      setTimeout(() => setShowContent(true), 50);
    };

    loadImages();
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <CSSTransition
            in={showContent}
            timeout={300}
            classNames="fade"
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blog" element={<BlogLayout />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/events" element={<EventsLayout />} />
                  <Route path="/events/:slug" element={<EventDetail />} />
                </Routes>
              </Router>
            </div>
          </CSSTransition>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;