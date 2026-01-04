import React from "react";
import { NoiseBackground } from "../ui/noise-background";

const CTASection = () => {
  const handleClick = () => {
    window.open("https://calendar.app.google/9qnqLsgxZH6Zs5N87", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="w-full rounded-md h-[30rem] flex items-center justify-center">
        <div className="cta-section flex flex-col items-center justify-center px-4 md:px-10 py-4 w-full h-full">
          <h2 className="text-black text-2xl md:text-6xl font-bold text-center leading-tight tracking-tight">
            Inspiring Tech Leaders & Innovators
          </h2>
          <p className="text-black text-sm md:text-2xl max-w-2xl mt-6 text-center leading-relaxed">
            I share insights on product management, AI, and growth strategies that drive impact. Ready to level up your tech journey? Let's build the future together.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <NoiseBackground
              containerClassName="w-fit p-2 rounded-full mx-auto"
              gradientColors={[
                "rgb(255, 100, 150)",
                "rgb(100, 150, 255)",
                "rgb(255, 200, 100)",
              ]}
            >
              <button 
                className="h-full w-full cursor-pointer rounded-full bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_rgba(250,250,250,1)_inset,0px_0.5px_1px_0px_rgba(163,163,163,1)] transition-all duration-100 active:scale-[0.98] text-sm md:text-base font-normal"
                onClick={handleClick}
              >
                Book Me as a Speaker &rarr;
              </button>
            </NoiseBackground>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
