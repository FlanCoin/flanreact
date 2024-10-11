import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';
import loadingImage from '../assets/loading2bit.webp';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Añadir la clase al body para desactivar el scroll
    document.body.classList.add('loading-active');

    // Comprueba si la página ya está lista
    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        setIsLoading(false);
        document.body.classList.remove('loading-active');
      }
    };

    // Maneja el evento de carga completa
    const handleLoad = () => {
      setIsLoading(false);
      document.body.classList.remove('loading-active');
    };

    // Verifica si la página ya está completamente cargada
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      document.addEventListener('readystatechange', checkPageLoaded);
    }

    // Cleanup de eventos
    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('readystatechange', checkPageLoaded);
      document.body.classList.remove('loading-active');
    };
  }, []);

  if (!isLoading) return null; // Oculta el componente si no está cargando

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src={loadingImage} alt="Cargando..." className="loading-image" />
        <h1 className="loading-text">Cargando...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
