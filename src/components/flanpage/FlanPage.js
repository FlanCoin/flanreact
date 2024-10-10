import React, { useState, useEffect, useRef, memo} from 'react';
import './FlanPage.css';
import './WhoIsFlan.css';
import './Flannomics.css';
import './FlanFarming.css';
import './BannerSection.css';
import './Roadmap.css';
import './HowToBuy.css';
import './Separador.css';

import AvatarGenerator from "./AvatarGenerator";
import Music from "./Music";
import starsImg from '../../assets/stars.png';
import flanAniquilator from '../../assets/espada1.gif';
import cloud1 from '../../assets/cloud1.webp';
import cloud2 from '../../assets/cloud2.webp';
import cloud3 from '../../assets/cloud3.webp';
import cloud4 from '../../assets/cloud4.webp';
import cloud5 from '../../assets/cloud5.webp';
import cloud6 from '../../assets/cloud6.webp';
import cloud7 from '../../assets/cloud7.webp';
import coinImg from '../../assets/coin.png';
import farmingVideo from '../../assets/farming.mp4';
import separador5 from '../../assets/separador5.png';


const FlanPage = () => {
  const steps = [
    {
      title: "Step 1: Set up a Solana Wallet",
      description: "You'll need a Solana-compatible wallet like Phantom or Sollet.",
      img: require('../../assets/wallet.gif'),
    },
    {
      title: "Step 2: Get SOL",
      description: "Buy SOL from an exchange like Binance or Coinbase.",
      img: require('../../assets/solana.gif'),
    },
    {
      title: "Step 3: Swap for $FLAN",
      description: "Use our swap to convert SOL into $FLAN. Just connect your wallet and swap.",
      img: require('../../assets/swap.gif'),
    },
    {
      title: "Step 4: Hold or Trade $FLAN",
      description: "Hold, trade, or use $FLAN within our FlanCraft ecosystem!",
      img: require('../../assets/trade.gif'),
    }
  ];

  // Estado para almacenar y mostrar el contador de clics global
  const [totalClicks, setTotalClicks] = useState(0);
  const coinRefs = useRef([]); // Referencia para almacenar las monedas que se van a mostrar en la animación
  const coinSounds = useRef([
    new Audio(process.env.PUBLIC_URL + '/sounds/coin1.wav'),
    new Audio(process.env.PUBLIC_URL + '/sounds/coin2.wav'),
    new Audio(process.env.PUBLIC_URL + '/sounds/coin3.wav'),
  ]);

  // Cargar el número total de clics de `localStorage` al cargar la página
  useEffect(() => {
    const storedClicks = localStorage.getItem("flanTotalClicks");
    if (storedClicks) {
      setTotalClicks(parseInt(storedClicks, 10));
    }
  }, []);

  // Guardar en `localStorage` cada vez que el valor de los clics cambie
  useEffect(() => {
    localStorage.setItem("flanTotalClicks", totalClicks);
  }, [totalClicks]);

  // Animación de los números 7 del farming
  const [plusSevenElements, setPlusSevenElements] = useState([]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      addPlusSevenEffect();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const addPlusSevenEffect = () => {
    const newElement = {
      id: Date.now(),
      x: Math.random() * 150,
      y: Math.random() * 10,
    };
    setPlusSevenElements((prevElements) => [...prevElements, newElement]);

    setTimeout(() => {
      setPlusSevenElements((prevElements) =>
        prevElements.filter((element) => element.id !== newElement.id)
      );
    }, 2000);
  };

  // Función para manejar el clic en el título (flan-title)
  const handleTitleClick = () => {
    // Actualizar el contador global
    setTotalClicks((prev) => prev + 1);

    // Reproducir un sonido aleatorio de moneda
    const randomSound = coinSounds.current[Math.floor(Math.random() * 3)];
    randomSound.currentTime = 0; // Reiniciar sonido
    randomSound.play();

    // Crear una animación de monedas que caen
    const coinId = Date.now();
    const newCoin = {
      id: coinId,
      x: Math.random() * 50 + 50, // Posición horizontal aleatoria
      y: 0,
    };

    // Añadir la moneda al array de referencias
    coinRefs.current = [...coinRefs.current, newCoin];

    // Remover la moneda después de la animación
    setTimeout(() => {
      coinRefs.current = coinRefs.current.filter((coin) => coin.id !== coinId);
    }, 1000);
    
  };

  // Animación del scroll para las tarjetas del roadmap
  useEffect(() => {
    const cards = document.querySelectorAll('.roadmap-card');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Se activa cuando la tarjeta esté al 60% visible
    };

    const callback = (entries) => {
      entries.forEach(entry => {
        const index = [...cards].indexOf(entry.target);

        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Mostrar la tarjeta cuando entre en el viewport
          entry.target.style.zIndex = 10 + index; // Ajustar el z-index para superposición
        } else {
          entry.target.classList.remove('visible'); // Ocultar cuando no esté visible
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    cards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  // Estado para detectar el tamaño de la pantalla
  const [isMobile, setIsMobile] = useState(false);

  // Detectar el tamaño de la pantalla y actualizar el estado
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Comprobar el tamaño al cargar y cada vez que se cambia el tamaño de la ventana
    handleResize();
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize);
  }, []);

return (
  <div className="flan-page">
    {/* Flan Page */}
    <section className="flan-page-section">
      <div className="flan-background"></div>

      <div className="flan-content-wrapper">
        {/* Título principal */}
        <h1 className="flan-title" onClick={handleTitleClick}>
          $FLAN
        </h1>

        {/* Contenedor para subtítulo y botón en columna */}
        <div className="play2earn-column">
          <div className="play2earn">
            #Play2earn
            {/* Contador de clics de flanes */}
            <div className="flan-counter">
              +{totalClicks} Flanes Clicks <img src={coinImg} alt="Flan Icon" className="flan-icon" />
            </div>
          </div>

          {/* Botón de compra debajo del subtítulo */}
          <div className="buy-button-container">
            <a
              href="https://jup.ag/swap/SOL-Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf"
              target="_blank"
              rel="noopener noreferrer"
              className="buy-flan-link"
            >
              <button className="buy-flan-button">BUY $FLAN</button>
            </a>
            <img src={starsImg} alt="Stars" className="stars-img" />
          </div>
        </div>
      </div>

      {/* Monedas que caen al hacer clic en el título */}
      {coinRefs.current.map((coin) => (
        <div
          key={coin.id}
          className="falling-coin"
          style={{
            left: `${coin.x}%`,
            animation: `coinFall 1s linear`,
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

{/* Banner Section */}
<section className="flan-banner">
  <div className="banner-text-container">
    <div className="banner-text">{Array(90).fill("$FLAN ").join('')}</div>
  </div>
</section>


{/* Roadmap Section */}
<section className="roadmap-section">
    <h2 className="roadmap-header">Roadmap</h2>
    <div className="roadmap-timeline">
        <div className="roadmap-card card-1">
            <h3>Phase 1: FlanCoin Foundations</h3>
            <img src={require('../../assets/card1.gif')} alt="Imagen de Fase 1" />
            <p>
                The journey began with the official launch of $FLAN, linked to our FlanCraft server,
                where players could start using the currency within the ecosystem.
                The launch has enabled the building of a solid user base and trust within the community.
            </p>
        </div>

        <div className="roadmap-card card-2">
            <h3>Phase 2: Expansion of the $FLAN Ecosystem</h3>
            <img src={require('../../assets/card2.gif')} alt="Imagen de Fase 2" />
            <p>
                After the initial launch, we will expand the use of $FLAN beyond the game,
                allowing users to acquire exclusive digital goods such as skins and art within the FlanCraft universe.
                Additionally, the first staking system functionalities will be enabled,
                encouraging users to hold their $FLAN in exchange for rewards within the server.
            </p>
        </div>

        <div className="roadmap-card card-3">
            <h3>Phase 3: Launch of FlanMarket</h3>
            <img src={require('../../assets/card3.gif')} alt="Imagen de Fase 3" />
            <p>
                It's time to launch FlanMarket! An NFT platform where users can buy, sell, and create unique NFTs using $FLAN.
                This marketplace will be fully integrated with our currency,
                incentivizing the use of $FLAN within the NFT ecosystem.
                Additionally, we will launch exclusive promotions for early participants and community artists.
            </p>
        </div>

        <div className="roadmap-card card-4">
            <h3>Phase 4: Expansion and Listing on CEX</h3>
            <img src={require('../../assets/card4.gif')} alt="Imagen de Fase 4" />
            <p>
                The expansion continues with a focus on listing $FLAN on a centralized exchange (CEX),
                opening new opportunities for liquidity and access to external investors.
                We are in contact with several mid-sized exchanges and will work on the necessary collaborations
                to get $FLAN listed on a CEX, while also expanding adoption outside of the server. The future is full of opportunities!
            </p>
        </div>

        <div className="roadmap-card card-5">
            <h3>Phase 5: Strategic Partnerships and Global Expansion</h3>
            <img src={require('../../assets/card5.gif')} alt="Imagen de Fase 5" />
            <p>
                We are seeking partnerships with other cryptocurrency and NFT projects that complement the $FLAN ecosystem.
                This phase will focus on creating strategic alliances to expand the reach of our currency and
                increase its utility in other ecosystems. Additionally, we will continue to expand the marketplace with new
                artists and creators, generating value for $FLAN holders.
            </p>
        </div>
    </div>
</section>


      {/* Who is Flan Section */}
      <section className="who-is-flan">
        <img src={flanAniquilator} alt="Flan Aniquilator" className="flan-aniquilator" />
        <div className="button-wrapper">
          <a href="https://jup.ag/swap/SOL-Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf" target="_blank" rel="noopener noreferrer">

          </a>
        </div>
        <div className="text-content">
          <h2>WHO THE F*CK IS $FLAN?</h2>
          <p><span>$</span>pectacular and daring, $FLAN is here to revolutionize the digital world with its delicious charm.</p>
  <p><span>F</span>earless in its approach, $FLAN leads the way in bringing play-to-earn and NFTs together like never before.</p>
  <p><span>L</span>egendary in status, $FLAN has transformed from a simple treat into a memecoin phenomenon that no one can resist.</p>
  <p><span>A</span>ccelerating fast, $FLAN continues to grow, offering its community endless possibilities and unique ways to interact.</p>
  <p><span>N</span>ow is the time to join the $FLAN bandwagon, because when it comes to fun and fortune, $FLAN is the true king of digital delights!</p>
        </div>
      </section>

      

{/* Flannomics Section */}
<section className="flannomics">
      {/* Header con la moneda y el título */}
      <div className="flannomics-header">
        <div className="flannomics-text-coin">
          <img src={coinImg} alt="Flan Coin" className="flannomics-coin" />
          <h2>FlanCoin Economy</h2>
        </div>
      </div>

      {/* Sección izquierda: descripción y wallets */}
      <div className="flannomics-left">
        <p>497 million Flans, 497 million tokens ready to conquer the world.</p>
        <div className="wallet-buttons">
          <a href="https://solscan.io/account/4gEAsRFfJgKi7DNpVQEGxJnEjhUtBWGUmABebrbPRn5G" target="_blank" rel="noopener noreferrer">
            <button className="wallet-button">👥 TEAM: 4gEAsRFfJgKi7DNpVQEGxJnEjhUtBWGUmABebrbPRn5G</button>
          </a>
          <a href="https://solscan.io/account/8VYQSz1QYY3msZqBStFj5Ce8Q6JpN5WCZYP4LKAweQkp" target="_blank" rel="noopener noreferrer">
            <button className="wallet-button">🖌 Marketing: 8VYQSz1QYY3msZqBStFj5Ce8Q6JpN5WCZYP4LKAweQkp</button>
          </a>
          <a href="https://solscan.io/account/8PdR1z6Hv8sHbapvrGsVf645eUPtUrJ67i5iayECGRdh" target="_blank" rel="noopener noreferrer">
            <button className="wallet-button">👾 Game Rewards: 8PdR1z6Hv8sHbapvrGsVf645eUPtUrJ67i5iayECGRdh</button>
          </a>
          <a href="https://solscan.io/account/C9uwgEfZieHsoxphJiQxuFR8EWAyr2aNxscRk75GmJf5" target="_blank" rel="noopener noreferrer">
            <button className="wallet-button">🏦 FlanCraft Vault: C9uwgEfZieHsoxphJiQxuFR8EWAyr2aNxscRk75GmJf5</button>
          </a>
        </div>
      </div>

      {/* Sección derecha: descripción adicional, ticker y suministro */}
      <div className={`flannomics-right ${isMobile ? 'mobile' : ''}`}>
        <div className="flannomics-description">
        Use $FLAN in our new Marketplace and in the store with a 50% discount. Get unique NFTs and other exclusive benefits!
        </div>
        <div className="flannomics-ticker">Ticker</div>
        <div className="flannomics-ticker-flan">
          {['$', 'F', 'L', 'A', 'N'].map((char, index) => (
            <span key={index} style={{ '--i': index + 1 }}>{char}</span>
          ))}
        </div>
        <div className="flannomics-supply">Supply</div>
        <div className="flannomics-supply-total">
          {'497.000.000'.split('').map((char, index) => (
            <span key={index} style={{ '--i': index + 1 }}>{char}</span>
          ))}
        </div>
      </div>
    </section>

{/* FlanFarming Section */}
<section className="flan-farming">
  {/* Contenedor de la imagen de fondo */}
  <div className="pixel-background-container"></div>

  <div className="farming-content">
    <h2>FlanFarming</h2>
    <p>Grow your success with FlanFarming and earn rewards in $FLAN while you rest!</p>
  </div>

  <div className="farming-content-columns">
    <div className="farming-video-container">
      <video className="farming-video" autoPlay loop muted>
        <source src={farmingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {plusSevenElements.map((element) => (
        <span
          key={element.id}
          className="plus-seven"
          style={{ top: `${element.y}%`, left: `${element.x}%` }}
        >
          +7$ FLAN
        </span>
      ))}
    </div>

    <div className="farming-description">
      <p>
      FlanFarming is an easy and fun way to earn $FLAN! Simply join our AFK pool and earn 7 $FLAN every 10 minutes. Use the command <strong>/afk</strong> and let your character collect rewards while you take a break. Withdraw your Flans and use them for whatever you want!
      </p>
    </div>
  </div>

  <div className="farming-footer">
    <p>Become a true Flan farmer and accumulate digital riches!</p>
  </div>
</section>

{/* Nueva Sección Separador */}
<section className="separador-section">
        <img src={separador5} alt="Separador 5" className="separador-img" />
      </section>

{/* How to Buy Section */}
<section className="how-to-buy-section">
  <h2 className="how-to-buy-header">How to Buy $FLAN</h2>
  
  {/* Steps */}
  <div className="how-to-buy-steps">
    {steps.map((step, index) => (
      <div className="how-to-buy-step" key={index}>
        <img src={step.img} alt={step.title} />
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    ))}
  </div>
  
  {/* Iframe JUP */}
  <div className="jup-iframe-container">
    <iframe
      src="https://jup.ag/swap/SOL-Fn5TpxS4H3jwV5jwD9HYoEDvxnNxDyEknwKaq2Mn3fbf"
      className="jup-iframe"
      title="Jupiter Swap"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>
</section>

{/* Nueva Sección: Flan Generator */}
<section className="flan-generator-section">       
          <AvatarGenerator />
      </section>


 {/* Nueva Sección: Musica */}
<section className="Music">       
          <Music />
      </section>
    </div>
  );
};

export default memo(FlanPage);