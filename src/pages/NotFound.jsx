import React from 'react';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-b from-[#0C0E10] to-[#446182]">
      <Header />
      
      {/* Fondo negro fijo en la parte inferior */}
      <div className="fixed bottom-0 left-0 w-full h-[25vh] bg-[#0C0E10]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-[calc(100vh-80px)]">
        <div className="flex flex-col md:flex-row justify-around items-center h-full">
          {/* Left Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/5 text-center md:text-left mb-8 mt-20 md:mb-0"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 animate-glow">
              404
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-md mx-auto md:mx-0">
              Looks like the page you were looking for is no longer here.
            </p>
          </motion.div>

          {/* Right Section - SVG */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 relative z-10"
          >
            <svg className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="51.5 -15.288 385 505.565">
              <g className="bench-legs">
                <path 
                  d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111
                  v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z" 
                  className="fill-[#0C0E10]"
                />
              </g>
              <g className="top-bench">
                <path 
                  d="M396.527,397.917c0,1.534-1.243,2.777-2.777,2.777H190.972c-1.534,0-2.778-1.243-2.778-2.777v-8.333
                  c0-1.535,1.244-2.778,2.778-2.778H393.75c1.534,0,2.777,1.243,2.777,2.778V397.917z M400.694,414.583
                  c0,1.534-1.243,2.778-2.777,2.778H188.194c-1.534,0-2.778-1.244-2.778-2.778v-8.333c0-1.534,1.244-2.777,2.778-2.777h209.723
                  c1.534,0,2.777,1.243,2.777,2.777V414.583z M403.473,431.25c0,1.534-1.244,2.777-2.778,2.777H184.028
                  c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.534,1.244-2.778,2.778-2.778h216.667c1.534,0,2.778,1.244,2.778,2.778V431.25z"
                  className="stroke-[#0C0E10] stroke-1 fill-[#5B3E2B]"
                />
              </g>
              <g className="bottom-bench">
                <path 
                  d="M417.361,459.027c0,0.769-1.244,1.39-2.778,1.39H170.139c-1.533,0-2.777-0.621-2.777-1.39v-4.86
                  c0-0.769,1.244-0.694,2.777-0.694h244.444c1.534,0,2.778-0.074,2.778,0.694V459.027z" 
                  className="stroke-[#0C0E10] stroke-1 fill-[#432d20]"
                />
                <path 
                  d="M185.417,443.75H400c0,0,18.143,9.721,17.361,10.417l-250-0.696C167.303,451.65,185.417,443.75,185.417,443.75z" 
                  className="stroke-[#0C0E10] stroke-1 fill-[#5B3E2B]"
                />
              </g>
              <g id="lamp">
                <path 
                  className="fill-[#202425]"
                  d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917
                  c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z"
                />
                <path 
                  className="fill-[#2c3133]"
                  d="M128.472,93.75c0,1.534-1.244,2.778-2.778,2.778h-13.889c-1.534,0-2.778-1.244-2.778-2.778V79.861
                  c0-1.534,1.244-2.778,2.778-2.778h13.889c1.534,0,2.778,1.244,2.778,2.778V93.75z" 
                />
                <circle className="fill-[#EFEFEF]" cx="119.676" cy="44.22" r="40.51" />
                <path 
                  className="fill-[#202425]"
                  d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889
                  S149.306,67.362,149.306,71.528z"
                />
                <path 
                  className="fill-[#202425]"
                  d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869
                  c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z" 
                />
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;