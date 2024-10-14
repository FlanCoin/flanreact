import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faStore, faMap, faLock, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTelegram, faYoutube, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { SectionContext } from '../context/SectionContext';
import './Navbar.css';

const Navbar = () => {
  const { setActiveSection } = useContext(SectionContext);

  // Función para manejar la navegación a Flan (ahora será la raíz "/")
  const handleFlanClick = () => {
    if (window.navigateToSection) {
      window.navigateToSection(0); // Navegar a la sección Flan
      setActiveSection('flan'); // Actualizar el contexto de la sección activa a 'flan'
    }
  };

  // Función para manejar la navegación a Flancraft
  const handleFlancraftClick = () => {
    if (window.navigateToSection) {
      window.navigateToSection(1); // Navegar a la sección Flancraft
      setActiveSection('lobby'); // Actualizar el contexto de la sección activa a 'home'
    }
  };

  // Función para manejar el click en el botón de Marketplace
  const handleMarketplaceClick = (e) => {
    const button = e.currentTarget;
    button.classList.add('shake');
    setTimeout(() => {
      button.classList.remove('shake');
    }, 500);
  };

  return (
    <nav className="desktop-navbar">
      {/* Redes sociales */}
      <div className="desktop-navbar-socials">
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

      {/* Botones del menú central */}
      <div className="desktop-navbar-links">
        {/* Ahora Flan será la raíz "/" */}
        <NavLink
          to="/"
          className="desktop-navbar-link"
          onClick={handleFlanClick}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="/news" className="desktop-navbar-link">
          <FontAwesomeIcon icon={faNewspaper} /> News
        </NavLink>
        <NavLink to="/store" className="desktop-navbar-link desktop-store-button">
          <FontAwesomeIcon icon={faStore} /> Store
        </NavLink>
        <a
          href="http://play.flancraft.com:8123"
          className="desktop-navbar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMap} /> Map
        </a>
        {/* Home ahora será "/flancraft" */}
        <NavLink
          to="/flancraft"
          className="desktop-navbar-link desktop-flan-button"
          onClick={handleFlancraftClick}
        >
          <FontAwesomeIcon icon={faGamepad} /> Flancraft
        </NavLink>
      </div>

      {/* Botón de Marketplace */}
      <div
        className="desktop-navbar-link desktop-marketplace-button locked"
        onClick={handleMarketplaceClick}
      >
        <FontAwesomeIcon icon={faLock} /> Coming Soon
      </div>
    </nav>
  );
};

export default Navbar;
