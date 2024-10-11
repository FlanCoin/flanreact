import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';
import loadingImage from '../assets/loading.gif'; // Asegúrate de que la imagen exista y sea accesible

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Añadir la clase al body para desactivar el scroll en la pantalla de carga
    console.log("Adding loading-active to body");
    document.body.classList.add('loading-active');

    // Función para manejar la carga completa de la página
    const handleLoad = () => {
      console.log("Carga completa detectada en móvil o desktop"); // Debug para verificar la carga
      setIsLoading(false);
      document.body.classList.remove('loading-active');
    };
    
    

    // Verifica si el documento ya está listo y completamente cargado
    console.log(`Estado del documento: ${document.readyState}`);
    if (document.readyState === 'complete') {
      console.log("Documento ya cargado, ocultando loading screen");
      handleLoad();
    } else {
      console.log("Agregando event listener para window.load");
      window.addEventListener('load', handleLoad); // Detectar cuando se completa la carga
    }

    return () => {
      console.log("Cleaning up event listeners");
      window.removeEventListener('load', handleLoad); // Eliminar el evento de carga para evitar fugas de memoria
    };
    
  }, []);

  // Si la página ya está cargada, oculta la pantalla de carga
  if (!isLoading) {
    console.log("Página cargada, ocultando loading screen");
    return null;
  }

  console.log("Mostrando pantalla de carga");

  

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Imagen 8 bits con ajustes responsivos */}
        <img src={loadingImage} alt="Cargando..." className="loading-image" />
        <h1 className="loading-text">Cargando...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
