// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";

// Componentes
import Home from "./pages/Home";
import BlogLayout from "./pages/BlogLayout";
import { HelmetProvider } from 'react-helmet-async';

// Importaciones de PrimeReact
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import BlogDetail from "./components/blog/BlogDetail";

const imagesToPreload = [
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720311811/tip7xyfvup8bgtnvjopv.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720371522/ct1tu7f3fmsyyuwfc7tg.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370865/sqpdgslq9pdmksccqszd.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370873/nioyewooah5tzgsrlpkh.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370845/dqdgzw6ei4d6lqu2r5b3.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1720370856/kwcskaflmqbo922omhzy.png",
  // Añade aquí cualquier otra imagen que necesites precargar
];

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const preloadAllImages = async () => {
        try {
          await Promise.all(imagesToPreload.map(preloadImage));
          setLoading(false);
          setTimeout(() => setShowContent(true), 50);
        } catch (error) {
          console.error("Error preloading images:", error);
          setLoading(false);
          setTimeout(() => setShowContent(true), 50);
        }
      };

      preloadAllImages();
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <GridLoader color="#001240" size={20} />
          </div>
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
