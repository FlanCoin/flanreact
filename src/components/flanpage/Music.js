import { useState, useEffect, useRef, useCallback } from 'react';
import './Music.css';

/* Scripts para GAMEBOY */
export const Music = () => {
const songs = ['Launch', 'Himno', '100k', '500k', '1M', '5M'];
const audioRefs = useRef([
  new Audio(process.env.PUBLIC_URL + '/sounds/launch.wav'),
  new Audio(process.env.PUBLIC_URL + '/sounds/himno.wav'),
  new Audio(process.env.PUBLIC_URL + '/sounds/100k.wav'),
]);

const [currentSong, setCurrentSong] = useState(0);
const [playing, setPlaying] = useState(false);
const [playingSong, setPlayingSong] = useState(null);
const [progress, setProgress] = useState(0);
const [animationSpeed, setAnimationSpeed] = useState(15);
const [errorIndex, setErrorIndex] = useState(null); // Estado para la canción con error
const audioContextRef = useRef(null);
const sourceNodeRef = useRef(null);

useEffect(() => {
  if (playingSong !== null) {
    const audio = audioRefs.current[playingSong];

    const updateProgress = () => {
      setProgress(audio.currentTime);
      if (audio.ended) {
        setPlaying(false);
        setPlayingSong(null);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }
}, [playingSong]);

const stopAllAudios = () => {
  audioRefs.current.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};

const startAudioAnalysis = useCallback(() => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }

  const analyser = audioContextRef.current.createAnalyser();
  analyser.fftSize = 256;

  if (!sourceNodeRef.current) {
    sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRefs.current[playingSong]);
    sourceNodeRef.current.connect(analyser);
    analyser.connect(audioContextRef.current.destination);
  }

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const bufferLength = analyser.frequencyBinCount;

  const analyzeAudio = () => {
    if (!playing) return;

    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

    const newSpeed = Math.max(5, 20 - avg / 10);
    setAnimationSpeed(newSpeed);
    requestAnimationFrame(analyzeAudio);
  };

  requestAnimationFrame(analyzeAudio);
  audioRefs.current[playingSong].play();
}, [playing, playingSong]);

const stopAudioAnalysis = useCallback(() => {
  if (playingSong !== null && audioRefs.current[playingSong]) {
    audioRefs.current[playingSong].pause();
    audioRefs.current[playingSong].currentTime = 0;
    setAnimationSpeed(15);
  }
}, [playingSong]);

useEffect(() => {
  const battleSection = document.querySelector('.battle-music-section');
  if (playing) {
    battleSection.classList.add('playing');
    startAudioAnalysis();
  } else {
    battleSection.classList.remove('playing');
    stopAudioAnalysis();
  }
}, [playing, startAudioAnalysis, stopAudioAnalysis]);

useEffect(() => {
  const battleSection = document.querySelector('.battle-music-section');
  battleSection.style.setProperty('--animationSpeed', `${animationSpeed}s`);
}, [animationSpeed]);

const handleKeyPress = (key) => {
  if (key === 'up' && currentSong > 0) {
    setCurrentSong(currentSong - 1);
  } else if (key === 'down' && currentSong < songs.length - 1) {
    setCurrentSong(currentSong + 1);
  } else if (key === 'A') {
    if (currentSong < 3) {
      if (playingSong !== null && currentSong === playingSong) {
        // Si la canción actual se está reproduciendo, alternar Play/Pause
        if (playing) {
          setPlaying(false);
          audioRefs.current[playingSong].pause();
        } else {
          setPlaying(true);
          audioRefs.current[playingSong].play();
        }
      } else {
        // Si se selecciona una nueva canción
        stopAllAudios();
        setPlaying(true);
        setPlayingSong(currentSong);
        audioRefs.current[currentSong].play();
      }
    } else {
      // Activar animación de error en la canción bloqueada
      setErrorIndex(currentSong);
      setTimeout(() => setErrorIndex(null), 500); // Quitar animación después de 500ms
    }
  } else if (key === 'B') {
    setPlaying(false);
    setPlayingSong(null);
    stopAllAudios();
  }
};

const handlePlayPause = () => {
  if (playingSong !== null) {
    if (playing) {
      setPlaying(false);
      audioRefs.current[playingSong].pause();
    } else {
      setPlaying(true);
      audioRefs.current[playingSong].play();
    }
  }
};

// Manejador de la barra de progreso
const handleSeek = (e) => {
  if (playingSong !== null) {
    const newTime = parseFloat(e.target.value);
    audioRefs.current[playingSong].currentTime = newTime;
    setProgress(newTime);
  }
};

return (
    <div className="Music">
    
{/* Battle Music Section */}
<section className="battle-music-section" style={{ '--animationSpeed': `${animationSpeed}s` }}>
{Array.from({ length: 30 }).map((_, i) => (
  <span
    key={i}
    className="note"
    style={{
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 5}s`,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    }}
  >
    ♫
  </span>
))}
  <div className="gameboy">
    {/* Pantalla de la consola */}
    <div className="gameboy-screen">
<div className="screen-content">
<h2 className="screen-title">
          {Array.from('SpotyFlan').map((char, index) => (
            <span key={index} style={{ '--index': index }}>{char}</span>
          ))}
        </h2>
        <ul className="song-list">
          {songs.map((song, index) => (
            <li
              key={index}
              className={`song-item ${index === currentSong ? 'selected' : ''} ${index > 2 ? 'locked' : ''} ${playing && index === playingSong ? 'playing-song' : ''} ${errorIndex === index ? 'error-animation' : ''}`}
              onAnimationEnd={() => setErrorIndex(null)}
            >
              {song}
    {playing && index === playingSong && (
      <div className="audio-spectrum">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
      </div>
    )}
    {index > 2 && (
      <span className="lock-icon">🔒</span>
    )}
    {/* Botón Play cuando la canción no está en reproducción */}
    {index === currentSong && !playing && index < 3 && (
      <span
        className="play-pause-button"
        onClick={() => {
          setPlaying(true);
          setPlayingSong(index);
          audioRefs.current[index].play();
        }}
      >
        {'\u25B6'} {/* ▶️ */}
      </span>
    )}
    {/* Botón Pause cuando la canción está en reproducción */}
    {playing && index === playingSong && (
      <span
        className="play-pause-button"
        onClick={handlePlayPause} // Usar la función de manejo Play/Pause
      >
        {'||'}
      </span>
    )}
  </li>
))}
</ul>
{/* Barra de progreso */}
{playingSong !== null && (
  <div className="progress-container">
    <input
      type="range"
      className="progress-bar"
      min="0"
      max={audioRefs.current[playingSong]?.duration || 0}
      value={progress}
      onChange={handleSeek}
    />
    <div className="progress-time">
      {Math.floor(progress / 60) + ":" + ("0" + Math.floor(progress % 60)).slice(-2)}
    </div>
  </div>
)}
</div>
</div>
    <div className="gameboy-title">BattleMusic</div>
    <div className="control-panel">
      <div className="dpad">
        <div className="cross">
          <div className="vertical">
            <div className="up-area" onClick={() => handleKeyPress('up')}></div>
            <div className="down-area" onClick={() => handleKeyPress('down')}></div>
          </div>
          <div className="horizontal">
            <div className="left-area"></div>
            <div className="right-area"></div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <div className="button A" onClick={() => handleKeyPress('A')}>A</div>
        <div className="button B" onClick={() => handleKeyPress('B')}>B</div>
      </div>
    </div>
    <div className={`speaker ${playing ? 'active' : ''}`}>
      <div className="speaker-line"></div>
      <div className="speaker-line"></div>
      <div className="speaker-line"></div>
    </div>
  </div>
</section>
</div>
);
};

export default Music;