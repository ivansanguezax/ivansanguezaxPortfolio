import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Newsletter from "./pages/Newsletter";
import Tools from "./pages/Tools";
import Podcast from "./pages/Podcast";

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
    }
    img.onerror = img.onabort = function() {
      reject(src);
    }
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
    }, 1000); // Delay de 1 segundo antes de iniciar la precarga

    return () => clearTimeout(timer);
  }, []);

  return (
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
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/podcast" element={<Podcast />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </div>
        </CSSTransition>
      )}
    </div>
  );
}

export default App;