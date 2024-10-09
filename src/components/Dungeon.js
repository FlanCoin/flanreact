import React, { useEffect, useRef } from 'react';
import './Dungeon.css';
import dungeonImage from '../assets/dungeon.png';
import trailerVideo from '../assets/trailer.mp4'; // Importar el video
import Plyr from 'plyr'; // Importar Plyr

const Dungeon = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Inicializa Plyr en el componente
    const player = new Plyr('#player');

    // Forzar autoplay y mute por programación
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Asegura que esté silenciado
      video.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }

    return () => {
      // Limpia Plyr cuando el componente se desmonte
      player.destroy();
    };
  }, []);

  return (
    <section className="dungeon-section">
      <img src={dungeonImage} alt="Dungeon" className="dungeon-image" />

      {/* Contenedor del video */}
      <div className="dungeon-video-container">
        <video
          id="player"
          className="dungeon-video"
          controls
          loop
          ref={videoRef} // Usamos ref para manipular el video en el useEffect
        >
          <source src={trailerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="light-beam"></div>
      <div className="dungeon-content">
        <h1 className="dungeon-title">Dungeon Adventures</h1>
        <h2 className="dungeon-subtitle">¡Explora y conquista mazmorras épicas!</h2>
        <p className="dungeon-description">
          Únete a la aventura en nuestra nueva implementación de Dungeon en Flancraft.
          Entra con tus amigos y explora mazmorras llenas de sorpresas y recompensas épicas.
        </p>
        <div className="dungeon-features">
          <ul>
            <h4>Explora mazmorras únicas y desafiantes</h4>
            <h4>Encuentra tesoros escondidos</h4>
            <h4>Compite con tus amigos en emocionantes batallas</h4>
            <h4>Gana recompensas épicas y exclusivas</h4>
          </ul>
        </div>
      </div>
      <div className="snowflakes">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.5,
              transform: `scale(${Math.random() + 0.5})`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Dungeon;
