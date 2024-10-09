import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación interna
import './Crates.css';
import llaveIcon from '../assets/llave.png'; // Importa la imagen desde src/assets

const createParticle = () => {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${Math.random() * 100}vw`;
  particle.style.animationDuration = `${Math.random() * 3 + 5}s`;
  return particle;
};

const Crates = () => {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate(); // Hook para manejar la navegación

  const toggleRewards = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  useEffect(() => {
    const particleContainer = document.querySelector('.particle-container');
    for (let i = 0; i < 50; i++) {
      const particle = createParticle();
      particleContainer.appendChild(particle);
    }

    return () => {
      particleContainer.innerHTML = '';
    };
  }, []);

  return (
    <section className="crates-section">
      <div className="crates-background"></div>
      <div className="crates-content">
        <h2 className="crates-title">Crates Mágicas</h2>
        <div className="crates-description">
          ¡Elige tu crate y obtén las mejores recompensas de FlanCraft! Las oportunidades son limitadas, así que actúa rápido.
          <button 
            className="buy-key-button" 
            onClick={() => navigate('/store')} // Navegar internamente a la ruta de la tienda
          >
            <img src={llaveIcon} alt="Buy Key" className="key-icon" />
          </button>
        </div>

        <div className="crates-grid">
          {['Vote Key', 'Legend Key', 'Mythic Key', 'Omega Key'].map((key, index) => (
            <div
              className={`crate-card ${activeCard === index ? 'flipped' : ''}`}
              key={index}
              onClick={() => toggleRewards(index)}
            >
              <div className="crate-card-inner">
                {/* Front Side */}
                <div className="crate-card-front">
                  <h3>{key}</h3>
                  <p>
                    {index === 0 && 'Empieza tu aventura con recompensas básicas pero valiosas. ¡Cada Vote Key te da la posibilidad de conseguir $FLAN!'}
                    {index === 1 && 'Recompensas épicas te esperan. La Legend Key te brinda la oportunidad de ganar $FLAN y objetos raros.'}
                    {index === 2 && 'La Mythic Key ofrece acceso a las recompensas más deseadas. ¿Te atreves a descubrir lo que contiene?'}
                    {index === 3 && 'La Omega Key es la llave definitiva. Accede a objetos divinos y cantidades masivas de $FLAN.'}
                  </p>
                </div>
                {/* Back Side */}
                <div className="crate-card-back">
                  <h3>Recompensas</h3>
                  <p>
                    {index === 0 && (
                      <>
                        ⚔️ Armaduras comunes<br />
                        🔧 Herramientas útiles<br />
                        🔑 Objetos de apoyo<br />
                        💰 Pequeñas cantidades de $FLAN
                      </>
                    )}
                    {index === 1 && (
                      <>
                        🛡️ Armaduras raras<br />
                        ⚒️ Herramientas mejoradas<br />
                        🌟 Objetos especiales<br />
                        💰 Cantidades moderadas de $FLAN
                      </>
                    )}
                    {index === 2 && (
                      <>
                        👑 Armaduras míticas<br />
                        🗡️ Armas especiales<br />
                        ⚔️ Objetos legendarios<br />
                        💰 Grandes cantidades de $FLAN
                      </>
                    )}
                    {index === 3 && (
                      <>
                        🔱 Objetos divinos<br />
                        🌌 Armas ultra legendarias<br />
                        ⚒️ Equipamiento único<br />
                        💰 Cantidades masivas de $FLAN
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="particle-container"></div>
      </div>
    </section>
  );
};

export default Crates;
