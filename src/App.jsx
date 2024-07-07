import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Newsletter from "./pages/Newsletter";
import Tools from "./pages/Tools";
import Podcast from "./pages/Podcast";

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simula un tiempo de carga
    setTimeout(() => {
      setLoading(false);
      // Pequeño retraso antes de mostrar el contenido para una transición más suave
      setTimeout(() => setShowContent(true), 50);
    }, 2000); // Ajusta este tiempo según tus necesidades
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
        >
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
        </CSSTransition>
      )}
    </div>
  );
}

export default App;
