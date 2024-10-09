import React from 'react';
import './Mascotas.css'; // Crea un archivo CSS específico si necesitas personalizarlo
import ConnectWalletButton from '../ConnectWalletButton';
import centerImage from '../../../assets/center.png';

const Mascotas = () => {
  return (
    <div className="marketplace-container">
      {/* Navbar global que se mantendrá visible */}
      <header className="secondary-navbar">
        <div className="collect-text">
          <span className="flan-logo">FLANCRAFT®</span>
          <span className="collect-logo">
            <span>C</span>
            <span>o</span>
            <span>l</span>
            <span>l</span>
            <span>e</span>
            <span>c</span>
            <span>t</span>
          </span>
        </div>

        {/* Imagen central del navbar */}
        <img src={centerImage} alt="Center Logo" className="center-navbar-logo" />

        {/* Botón de conectar wallet */}
        <ConnectWalletButton />
      </header>

      {/* Contenido de la Sección */}
      <div className="section-content">
        <h1>Mascotas</h1>
        <p>Explora las mascotas exclusivas disponibles en FlanCraft® Collect.</p>
      </div>
    </div>
  );
};

export default Mascotas;
