import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

// 🛠️ Lazy Load para mejorar el rendimiento
const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const BlogLayout = lazy(() => import("./pages/BlogLayout"));
const BlogDetail = lazy(() => import("./components/blog/BlogDetail"));
const EventsLayout = lazy(() => import("./pages/EventLayout"));
const EventDetail = lazy(() => import("./components/events/EventDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));

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
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png",
  "https://res.cloudinary.com/dfgjenml4/image/upload/v1739823706/courses/pr0vvtpomybk2n7yt5ob.jpg",
];

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = img.onabort = () => reject(src);
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

    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 2000));

    const loadImages = async () => {
      try {
        await Promise.all([
          minLoadingTime,
          ...imagesToPreload.map(preloadImage),
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
      <div className="relative min-h-screen bg-white overflow-x-hidden">
        <div className="relative w-full h-full">
          {loading ? (
            <div className="relative">
              <Suspense fallback={<LoadingSpinner />}>
                <LoadingSpinner />
              </Suspense>
            </div>
          ) : (
            <CSSTransition
              in={showContent}
              timeout={300}
              classNames="fade"
              unmountOnExit
              nodeRef={nodeRef}
            >
              <div ref={nodeRef} className="relative">
                <BrowserRouter
                  future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                  }}
                >
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<AboutMe />} />
                      <Route path="/blog" element={<BlogLayout />} />
                      <Route path="/blog/:slug" element={<BlogDetail />} />
                      <Route path="/events" element={<EventsLayout />} />
                      <Route path="/events/:slug" element={<EventDetail />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </div>
            </CSSTransition>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default App;
