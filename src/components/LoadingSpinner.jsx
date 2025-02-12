// src/components/LoadingSpinner.jsx
import React from 'react';
import { SpinningText } from './core/spinning-text';

const LoadingSpinner = () => {
  const text = 'Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • ';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="absolute">
      <SpinningText
  radius={8} // reduce el tamaño del círculo
  fontSize={0.9} // ajusta el tamaño del texto
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