import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; // Estilo CSS separado
import loadingImage from '../assets/loading2bit.webp'; // Añade una imagen 8 bits si la tienes

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detecta cuándo la página está completamente cargada
    const handleLoad = () => setIsLoading(false);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null; // Oculta el componente si no está cargando

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Aquí puedes usar imágenes 8 bits personalizadas */}
        <img src={loadingImage} alt="Cargando..." className="loading-image" />
        <h1 className="loading-text">Cargando...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
