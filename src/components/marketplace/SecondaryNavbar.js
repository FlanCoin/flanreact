// src/components/marketplace/SecondaryNavbar.js
import React from 'react';
import centerImage from '../../assets/center.png';
import ConnectWalletButton from './ConnectWalletButton';
import './SecondaryNavbar.css';


const SecondaryNavbar = () => {
  return (
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
  );
};

export default SecondaryNavbar;
