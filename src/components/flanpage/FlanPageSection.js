// src/components/flanpage/FlanPageSection.js
import React, { useState, useEffect, useRef } from 'react';
import './FlanPage.css';
import { ref, onValue, runTransaction } from "firebase/database";
import { database } from '../../firebase';
import cloud1 from '../../assets/cloud1.webp';
import cloud2 from '../../assets/cloud2.webp';
import cloud3 from '../../assets/cloud3.webp';
import cloud4 from '../../assets/cloud4.webp';
import cloud5 from '../../assets/cloud5.webp';
import cloud6 from '../../assets/cloud6.webp';
import cloud7 from '../../assets/cloud7.webp';
import coinImg from '../../assets/coin.png';

const FlanPageSection = () => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [copyMessage, setCopyMessage] = useState("");
  const coinRefs = useRef([]);
  const audioContext = useRef(null);
  const soundBuffers = useRef([]);
  const gainNode = useRef(null);

  const contractAddress = "Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf";

  // Configurar el contexto de audio y cargar los sonidos
  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    gainNode.current.gain.value = 0.05; // Volumen ajustado para todos los sonidos

    const soundFiles = [
      '/sounds/coin1.wav',
      '/sounds/coin2.wav',
      '/sounds/coin3.wav',
    ];

    soundFiles.forEach((file, index) => {
      fetch(process.env.PUBLIC_URL + file)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.current.decodeAudioData(data))
        .then(buffer => {
          soundBuffers.current[index] = buffer;
        })
        .catch(error => console.error(`Error al cargar el sonido ${file}:`, error));
    });
  }, []);

  useEffect(() => {
    const clickCountRef = ref(database, "clickCount");
    onValue(clickCountRef, (snapshot) => {
      const data = snapshot.val();
      setTotalClicks(data || 0);
    });

    return () => onValue(clickCountRef, () => {});
  }, []);

  const handleTitleClick = () => {
    const clickCountRef = ref(database, "clickCount");
    runTransaction(clickCountRef, (currentClicks) => {
      return (currentClicks || 0) + 1;
    });

    playSound();

    const coinId = Date.now();
    const titleElement = document.querySelector(".flan-title");
    if (!titleElement) return;

    const { left, top, width } = titleElement.getBoundingClientRect();
    const titleLeft = left + window.scrollX;
    const titleTop = top + window.scrollY;

    const newCoin = { id: coinId, x: titleLeft + Math.random() * width, y: titleTop };
    coinRefs.current = [...coinRefs.current, newCoin];

    setTimeout(() => {
      coinRefs.current = coinRefs.current.filter((coin) => coin.id !== coinId);
    }, 1500);
  };

  // Función para reproducir el sonido con control de AudioContext
  const playSound = () => {
    try {
      // Asegurarse de que el contexto esté activo antes de reproducir el sonido
      if (audioContext.current.state === 'suspended') {
        audioContext.current.resume().then(() => {
          playRandomSound();
        });
      } else {
        playRandomSound();
      }
    } catch (error) {
      console.error("Error al intentar reproducir el sonido:", error);
    }
  };

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * soundBuffers.current.length);
    const soundBuffer = soundBuffers.current[randomIndex];

    if (!soundBuffer || !audioContext.current) return;

    try {
      const source = audioContext.current.createBufferSource();
      source.buffer = soundBuffer;
      source.connect(gainNode.current);
      gainNode.current.connect(audioContext.current.destination);
      source.start(0);
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopyMessage("¡Contrato copiado!");
      setTimeout(() => setCopyMessage(""), 2000);
    });
  };

  return (
    <section className="flan-page-section">
      <div className="flan-background"></div>

      <div className="flan-content-wrapper">
        {/* Título principal */}
        <h1 className="flan-title" onClick={handleTitleClick}>
          $FLAN
        </h1>

        {/* Recuadro estilo retro con el contrato */}
        <div className="contract-box">
          <span className="contract-text">
            {contractAddress}
          </span>
          <button className="copy-button" onClick={handleCopyContract}>
            Copy
          </button>
        </div>

        {/* Mensaje de copia con estilo */}
        {copyMessage && <div className="copy-message">{copyMessage}</div>}

        {/* Reubicación del contador con el botón de compra */}
        <div className="flan-counter-wrapper">
          <div className="flan-counter">
            +{totalClicks} Flan Clicks <img src={coinImg} alt="Flan Icon" className="flan-icon" />
          </div>

          {/* Botón de compra al lado del contador */}
          <a
            href="https://jup.ag/swap/SOL-Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf"
            target="_blank"
            rel="noopener noreferrer"
            className="buy-flan-link"
          >
            <button className="buy-flan-button">BUY $FLAN</button>
          </a>
        </div>
      </div>

      {/* Monedas que surgen desde el título */}
      {coinRefs.current.map((coin) => (
        <div
          key={coin.id}
          className="falling-coin"
          style={{
            position: 'absolute',
            left: `${coin.x}px`,
            top: `${coin.y}px`,
            animation: `coinJump 1.5s ease-out forwards`,
          }}
        >
          <img src={coinImg} alt="Coin" className="coin-img" />
        </div>
      ))}

      {/* Cloud Images */}
      <img src={cloud1} alt="Cloud 1" className="cloud cloud1" />
      <img src={cloud2} alt="Cloud 2" className="cloud cloud2" />
      <img src={cloud3} alt="Cloud 3" className="cloud cloud3" />
      <img src={cloud4} alt="Cloud 4" className="cloud cloud4" />
      <img src={cloud5} alt="Cloud 5" className="cloud cloud5" />
      <img src={cloud6} alt="Cloud 6" className="cloud cloud6" />
      <img src={cloud7} alt="Cloud 7" className="cloud cloud7" />
    </section>
  );
};

export default FlanPageSection;
