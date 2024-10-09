import React, { useState, useEffect } from 'react';
import background from '../assets/background.gif';
import flanespada from '../assets/flanespada.gif';
import logo from '../assets/logo.png';
import './Home.css';

const Home = () => {
  // Estado para manejar si la IP fue copiada
  const [copied, setCopied] = useState(false);
  
  // Estado para manejar el estado del servidor y el número de jugadores online
  const [serverStatus, setServerStatus] = useState("offline");
  const [playersOnline, setPlayersOnline] = useState(0);

  // Función para copiar la IP del servidor al portapapeles
  const copyIP = () => {
    navigator.clipboard.writeText('play.flancraft.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Fetch de la API para obtener el estado del servidor y jugadores online
  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch('https://api.mcsrvstat.us/2/play.flancraft.com');
        const data = await response.json();

        // Verifica el estado del servidor y el número de jugadores conectados
        setServerStatus(data.online ? "online" : "offline");
        setPlayersOnline(data.players ? data.players.online : 0);
      } catch (error) {
        console.error("Error fetching server status:", error);
        setServerStatus("offline");
        setPlayersOnline(0);
      }
    };

    // Llamada inicial para obtener el estado del servidor
    fetchServerStatus();

    // Intervalo para actualizar el estado del servidor cada 60 segundos
    const interval = setInterval(fetchServerStatus, 60000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div className="hero-background">
      <div className="background-container">
        {/* Imagen de fondo */}
        <img src={background} alt="Background" className="background-image" />

        {/* Contenedor del logo y la sección de información */}
        <div className="logo-and-info-container">
          {/* Logo principal */}
          <img src={logo} alt="Logo" className="hero-logo" />

          {/* Sección de información del servidor */}
          <div className="text-container">
            <h1 className="server-title">The Minecraft Blockchain Economy</h1>
            <div className="server-subtitle">Play and earn with the unique Minecraft experience!</div>
            <div className="decorative-line-container">
              <div className="decorative-line left"></div>
              <div className="decorative-point"></div>
              <div className="decorative-line right"></div>
            </div>

            {/* Información del servidor */}
            <div className={`server-info ${serverStatus}`}>
              {`play.flancraft.com - Players Online: ${playersOnline}`}
              <div className={`server-status-indicator ${serverStatus}`}></div>
            </div>

            {/* Botón de "Comienza a jugar" */}
            <button className={`play-button ${copied ? 'copied' : ''}`} onClick={copyIP}>
              {copied ? 'IP Copied!' : 'Play Now'}
            </button>
          </div>
        </div>

        {/* Espada animada */}
        <img src={flanespada} alt="Flan Espada" className="flan-espada" />
      </div>
    </div>
  );
};

export default Home;
