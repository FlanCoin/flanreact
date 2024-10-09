// src/components/marketplace/Marketplace.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Marketplace.css';
import { FaBuilding, FaDragon, FaPaw } from 'react-icons/fa';
import construccionesImage from '../../assets/construcciones.jpg';
import monturasImage from '../../assets/monturas.jpg';
import mascotasImage from '../../assets/mascotas.jpg';

const Marketplace = () => {
  // Estados para controlar el shake de las secciones bloqueadas
  const [shakeConstrucciones, setShakeConstrucciones] = useState(false);
  const [shakeMascotas, setShakeMascotas] = useState(false);

  // Funciones para activar el efecto shake
  const handleShakeConstrucciones = () => {
    setShakeConstrucciones(true);
    setTimeout(() => setShakeConstrucciones(false), 500); // Resetear el shake después de 500ms
  };

  const handleShakeMascotas = () => {
    setShakeMascotas(true);
    setTimeout(() => setShakeMascotas(false), 500);
  };

  return (
    <div className="marketplace-container">
    
      {/* Contenido de Categorías */}
      <div className="marketplace-categories">
        {/* Construcciones (bloqueada) */}
        <div
          className={`category-card blocked-category ${shakeConstrucciones ? 'shake' : ''}`}
          onClick={handleShakeConstrucciones}
        >
          <img src={construccionesImage} alt="Construcciones" className="category-image" />
          <div className="category-content">
            <FaBuilding className="category-icon construcciones" />
            <span className="category-title">Construcciones</span>
          </div>
        </div>

        {/* Monturas (desbloqueada) */}
        <div className="category-card">
          <Link to="/monturas">
            <img src={monturasImage} alt="Monturas" className="category-image" />
            <div className="category-content">
              <FaDragon className="category-icon monturas" />
              <span className="category-title">Monturas</span>
            </div>
          </Link>
        </div>

        {/* Mascotas (bloqueada) */}
        <div
          className={`category-card blocked-category ${shakeMascotas ? 'shake' : ''}`}
          onClick={handleShakeMascotas}
        >
          <img src={mascotasImage} alt="Mascotas" className="category-image" />
          <div className="category-content">
            <FaPaw className="category-icon mascotas" />
            <span className="category-title">Mascotas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
