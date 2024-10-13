import React, { useState, useEffect, memo} from 'react';

import './WhoIsFlan.css';
import './Flannomics.css';
import './FlanFarming.css';
import './BannerSection.css';
import './HowToBuy.css';
import './Separador.css';
import StaffCarousel from './StaffCarousel';
import RoadmapSection from './RoadmapSection'; // Importa el nuevo componente
import AvatarGenerator from "./AvatarGenerator";
import Music from "./Music";
import FlanPageSection from './FlanPageSection'; // Importa el nuevo componente
import flanAniquilator from '../../assets/espada1.gif';
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
     {/* Nueva Sección: FlanPage */}
     <section className="flan-page-section">       
          <FlanPageSection />
      </section>

{/* Banner Section */}
<section className="flan-banner">
  <div className="banner-text-container">
    <div className="banner-text">{Array(90).fill("$FLAN ").join('')}</div>
  </div>
</section>


{/* Roadmap Section */}
<RoadmapSection />


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

        <StaffCarousel /> {/* Coloca la nueva sección aquí */}

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