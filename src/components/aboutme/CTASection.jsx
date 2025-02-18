import React from "react";
import { Vortex } from "../core/Vortex";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/events");
  };

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden bg-black">
      <Vortex
        backgroundColor="#000000"
        baseHue={280}           // Morado base
        rangeHue={60}           // Rango para variar entre morado y azul
        particleCount={700}     // Más partículas
        baseSpeed={0.1}         // Velocidad base más lenta
        rangeSpeed={0.8}        // Rango de velocidad menor
        baseRadius={1.2}        // Radio base más grande
        rangeRadius={1.5}       // Más variación en el tamaño
        rangeY={150}            // Mayor rango vertical
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center leading-tight tracking-tight">
          Inspiring Tech Leaders & Innovators
        </h2>
        <p className="text-white/90 text-sm md:text-2xl max-w-2xl mt-6 text-center leading-relaxed">
          I share insights on product management, AI, and growth strategies that drive impact. Ready to level up your tech journey? Let’s build the future together.
        </p>
        <div className="flex items-center gap-4 mt-8">
          <button 
            className="group px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
            onClick={handleClick}
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            <span>Book Me as a Speaker</span>
          </button>
        </div>
      </Vortex>
    </div>
  );
};

export default CTASection;
