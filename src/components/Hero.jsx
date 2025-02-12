import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaSpotify } from "react-icons/fa";
import { FlipWords } from "./flip-words";
import { FollowerPointerCard } from "./FollowingPointer";

const Hero = () => {
  const words = [
    "Build solutions that matter",
    "Design with purpose",
    "Empower ideas into reality",
    "Innovate with impact",
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-5 md:px-40 md:py-8 md:gap-10 min-h-screen pt-24">
      {/* Left Section */}
      <div className="w-full md:w-4/6 text-gray-800 mb-12 md:mb-0 flex flex-col items-center md:items-start">
        <h3 className="text-2xl font-light animate-[fadeIn_2s_ease-out] text-center md:text-left w-full mb-5">
          Hi, my name is Ivan Sangueza
        </h3>
        <div className="w-full relative min-h-[100px] flex items-center justify-center md:justify-start">
          <div
            className="w-full text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black animate-[fadeIn_2s_ease-out] text-center md:text-left absolute"
            style={{ fontFamily: '"Kanit", Arial, sans-serif' }}
          >
            <FlipWords
              words={words}
              className="text-black text-center md:text-left"
              duration={4000}
            />
          </div>
        </div>
        <h3 className="text-xl mt-5 md:text-2xl font-light mb-8 text-gray-700 animate-[fadeIn_2s_ease-out] text-center md:text-left w-full">
          I'm a builder of ideas, leader of projects, and engineer of growth
        </h3>

        {/* Redes Sociales */}
        <div className="flex flex-col md:items-start items-center w-full">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Let’s connect</h4>
          <div className="flex space-x-4 md:justify-start justify-center">
            <a
              href="https://www.instagram.com/ivansanguezax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/ivansanguezax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/ivansanguezax"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://open.spotify.com/playlist/0FYZkO1uQvgqguStHY1LFD?si=934d4afa01cf4289"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors text-2xl"
            >
              <FaSpotify />
            </a>
          </div>
        </div>
      </div>

      {/* Right Section - Profile Image */}
      <div className="w-full md:w-4/12 flex justify-center items-center">
        <div className="w-full max-w-[250px]">
          <FollowerPointerCard
            title="Ivan Sangueza"
            icon="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
            className="aspect-[3/4] relative"
          >
            <img
              src="https://res.cloudinary.com/dfgjenml4/image/upload/v1739334211/zqqkj0q3ti8npzli0sjg.png"
              alt="Ivan Sangueza"
              className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition duration-300 animate-[float_6s_ease-in-out_infinite]"
            />
          </FollowerPointerCard>
        </div>
      </div>
    </div>
  );
};

export default Hero;
