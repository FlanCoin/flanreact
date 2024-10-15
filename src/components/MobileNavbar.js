import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faStore, faMap, faStoreAlt, faGamepad } from '@fortawesome/free-solid-svg-icons';
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
          {/* Aquí puedes añadir un logo o título si es necesario */}
        </div>

        <NavLink to="/" className="navbar-link " activeclassname="active" onClick={closeMenu}>
          <FontAwesomeIcon icon={faHome} /> Home {/* Flan ahora en la raíz */}
        </NavLink>
        
        <NavLink to="/news" className="navbar-link" activeclassname="active" onClick={closeMenu}>
          <FontAwesomeIcon icon={faNewspaper} /> News
        </NavLink>
        <NavLink to="/store" className="navbar-link mobile-store-button" activeclassname="active" onClick={closeMenu}>
          <FontAwesomeIcon icon={faStore} /> Store
        </NavLink>
        <a
          href="http://play.flancraft.com:8123"
          className="navbar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMap} /> Map
        </a>
        <NavLink to="/flancraft" className="navbar-link mobile-flan-button" activeclassname="active" onClick={closeMenu}>
          <FontAwesomeIcon icon={faGamepad} /> Flancraft {/* Actualizado a "Lobby" */}
        </NavLink>
        

        {/* Separador de Sección */}
        <div className="mobile-navbar-divider"></div>

        {/* Redes Sociales en la Parte Inferior */}
        <div className="mobile-navbar-socials">
          <a href="https://dsc.gg/flancraft" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a href="https://t.me/+5Rc8x-x9b3lmZWRk" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
          <a href="https://www.youtube.com/@Flancraft" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://x.com/flancoin_token" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.tiktok.com/@flancoin?_t=8klrqrfkedo&_r=1" target="_blank" rel="noopener noreferrer">
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
