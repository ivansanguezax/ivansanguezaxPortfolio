import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Newsletter from "./pages/Newsletter";
import Tools from "./pages/Tools";
import Podcast from "./pages/Podcast.jsx";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/podcast" element={<Podcast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
