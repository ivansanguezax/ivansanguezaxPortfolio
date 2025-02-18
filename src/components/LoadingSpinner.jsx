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

  // Definimos los keyframes en un estilo global
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spinclockwise {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes spincounterclockwise {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className={twMerge('spinning-text', className)}
      style={containerStyle}
    >
      {characters.map((char, i) => {
        const angle = angleStep * i;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
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
    </div>
  );
};

// LoadingSpinner.jsx permanece igual
const LoadingSpinner = () => {
  const text = 'Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • ';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="absolute">
        <SpinningText
          radius={8}
          fontSize={0.9}
          className="font-medium leading-none text-gray-900"
        >
          {text}
        </SpinningText>
      </div>
      
      <div className="z-10 w-40 h-40 flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dfgjenml4/image/upload/v1721000470/ujz3ew4m573pawhcamhi.png"
          alt="Loading"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;