// src/components/MobileNavbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faStore, faMap, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTelegram, faYoutube, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './MobileNavbar.css';

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Botón de menú responsive */}
      {!menuOpen && (
        <button className="menu-button" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faStoreAlt} /> Menu
        </button>
      )}

      {/* Menú lateral responsive */}
      <div className={`mobile-navbar ${menuOpen ? 'show' : ''}`}>
        <div className="mobile-navbar-header">
        </div>

        <NavLink to="/" className="navbar-link" activeclassname="active" onClick={closeMenu}>
  <FontAwesomeIcon icon={faHome} /> Home
</NavLink>
<NavLink to="/news" className="navbar-link" activeclassname="active" onClick={closeMenu}>
  <FontAwesomeIcon icon={faNewspaper} /> News
</NavLink>
<NavLink to="/store" className="navbar-link mobile-store-button" activeclassname="active" onClick={closeMenu}>
  <FontAwesomeIcon icon={faStore} /> Store
</NavLink>
<NavLink to="/map" className="navbar-link" activeclassname="active" onClick={closeMenu}>
  <FontAwesomeIcon icon={faMap} /> Map
</NavLink>
<NavLink to="/flan" className="navbar-link mobile-flan-button" activeclassname="active" onClick={closeMenu}>
  Flan
</NavLink>



        {/* Separador de Sección */}
        <div className="mobile-navbar-divider"></div>

        {/* Redes Sociales en la Parte Inferior */}
        <div className="mobile-navbar-socials">
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>

      {/* Overlay que cubre la página cuando el menú lateral está abierto */}
      <div className={`navbar-overlay ${menuOpen ? 'show' : ''}`} onClick={closeMenu}></div>
    </>
  );
};

export default MobileNavbar;
