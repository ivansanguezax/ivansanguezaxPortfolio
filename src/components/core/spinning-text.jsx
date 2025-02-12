// src/components/core/spinning-text.jsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const SpinningText = ({
  children,
  className,
  radius = 10,
  fontSize = 1,
  direction = 'clockwise',
}) => {
  const characters = children.split('');
  const angleStep = (2 * Math.PI) / characters.length;

  const containerStyle = {
    width: `${radius * 2}rem`,
    height: `${radius * 2}rem`,
    position: 'relative',
    animation: `spin${direction} 20s linear infinite`,
  };

  return (
    <div
      className={twMerge('spinning-text', className)}
      style={containerStyle}
    >
      {characters.map((char, i) => {
        const angle = angleStep * i;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        // Ajustamos la rotación para que el texto se lea correctamente
        const textRotation = (angle * 180) / Math.PI + 90;


        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              fontSize: `${fontSize}rem`,
              transform: `translate(-50%, -50%) translate(${x}rem, ${y}rem) rotate(${textRotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            {char}
          </span>
        );
      })}
      <style jsx>{`
        @keyframes spinclockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};