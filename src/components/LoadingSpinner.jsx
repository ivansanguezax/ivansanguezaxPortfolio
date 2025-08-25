import React, { useState } from 'react';
import { SpinningText } from './core/spinning-text';

const LoadingSpinner = () => {
  const text = 'Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • Ivan Sangueza • ';
  const imageSrc = "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1756088629/logoWTH_fta3at.png";
  
  // Estado para manejar la carga de la imagen
  const [imageError, setImageError] = useState(false);

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
        {!imageError ? (
          <img
            src={imageSrc}
            alt="Loading"
            className="w-full h-full object-contain"
            loading="eager" // Se carga rápido ya que es esencial para el LCP
            onError={() => setImageError(true)} // Manejamos error de imagen
          />
        ) : (
          <span className="text-gray-500">⚠️ Imagen no encontrada</span>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
