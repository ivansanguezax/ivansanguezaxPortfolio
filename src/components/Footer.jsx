import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub, FaSpotify } from 'react-icons/fa';
import LogoCarousel from './LogoCarousel';

const Footer = () => {
  return (
    <footer id="footer" className="mt-auto py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="text-xs md:text-sm text-gray-600">
          Made with ❤️ by Ivan Sangueza
        </div>
        <div className="flex space-x-3">
          <a 
            href="https://www.instagram.com/ivansanguezax/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaInstagram size={16} />
          </a>
          <a 
            href="https://www.linkedin.com/in/ivansanguezax/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaLinkedin size={16} />
          </a>
          <a 
            href="https://github.com/ivansanguezax" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaGithub size={16} />
          </a>
          <a 
            href="https://open.spotify.com/playlist/0FYZkO1uQvgqguStHY1LFD?si=934d4afa01cf4289" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaSpotify size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;