// src/components/flanpage/RoadmapSection.js
import React, { useEffect } from 'react';
import './Roadmap.css'; // Asegúrate de tener los estilos en este archivo.

const RoadmapSection = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.roadmap-card');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Se activa cuando la tarjeta esté al 60% visible
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
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

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className="roadmap-section">
      <h2 className="roadmap-header">Roadmap</h2>
      <div className="roadmap-timeline">
        <div className="roadmap-card card-1">
          <h3>Phase 1: FlanCoin Foundations</h3>
          <img src={require('../../assets/card1.gif')} alt="Imagen de Fase 1" />
          <p>
            The journey began with the official launch of $FLAN, linked to our FlanCraft server,
            where players could start using the currency within the ecosystem. The launch has enabled the building of a solid user base and trust within the community.
          </p>
        </div>

        <div className="roadmap-card card-2">
          <h3>Phase 2: Expansion of the $FLAN Ecosystem</h3>
          <img src={require('../../assets/card2.gif')} alt="Imagen de Fase 2" />
          <p>
            After the initial launch, we will expand the use of $FLAN beyond the game, allowing users to acquire exclusive digital goods such as skins and art within the FlanCraft universe. Additionally, the first staking system functionalities will be enabled, encouraging users to hold their $FLAN in exchange for rewards within the server.
          </p>
        </div>

        <div className="roadmap-card card-3">
          <h3>Phase 3: Launch of FlanMarket</h3>
          <img src={require('../../assets/card3.gif')} alt="Imagen de Fase 3" />
          <p>
            It's time to launch FlanMarket! An NFT platform where users can buy, sell, and create unique NFTs using $FLAN. This marketplace will be fully integrated with our currency, incentivizing the use of $FLAN within the NFT ecosystem. Additionally, we will launch exclusive promotions for early participants and community artists.
          </p>
        </div>

        <div className="roadmap-card card-4">
          <h3>Phase 4: Expansion and Listing on CEX</h3>
          <img src={require('../../assets/card4.gif')} alt="Imagen de Fase 4" />
          <p>
            The expansion continues with a focus on listing $FLAN on a centralized exchange (CEX), opening new opportunities for liquidity and access to external investors. We are in contact with several mid-sized exchanges and will work on the necessary collaborations to get $FLAN listed on a CEX, while also expanding adoption outside of the server.
          </p>
        </div>

        <div className="roadmap-card card-5">
          <h3>Phase 5: Strategic Partnerships and Global Expansion</h3>
          <img src={require('../../assets/card5.gif')} alt="Imagen de Fase 5" />
          <p>
            We are seeking partnerships with other cryptocurrency and NFT projects that complement the $FLAN ecosystem. This phase will focus on creating strategic alliances to expand the reach of our currency and increase its utility in other ecosystems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
