import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faStore, faMap, faLock, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faTelegram, faYoutube, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { SectionContext } from '../context/SectionContext';
import './Navbar.css';

const Navbar = () => {
  const { setActiveSection } = useContext(SectionContext);

  // Función para manejar la navegación a Home y actualizar la sección activa
  const handleHomeClick = () => {
    if (window.navigateToSection) {
      window.navigateToSection(0); // Navegar a la primera sección (Home)
      setActiveSection('home'); // Actualizar el contexto de la sección activa a 'home'
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
        <a href="https://discord.gg/uNNuwckR" target="_blank" rel="noopener noreferrer">
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
        {/* Usar NavLink con onClick para Home */}
        <NavLink
          to="/"
          className="desktop-navbar-link"
          onClick={() => {
            handleHomeClick(); // Invocar la función de navegación a Home
          }}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink to="/news" className="desktop-navbar-link">
          <FontAwesomeIcon icon={faNewspaper} /> News
        </NavLink>
        <NavLink to="/store" className="desktop-navbar-link desktop-store-button">
          <FontAwesomeIcon icon={faStore} /> Store
        </NavLink>
        {/* Cambiar el NavLink de Map a una etiqueta <a> para abrir un enlace externo */}
        <a
          href="http://play.flancraft.com:8123"
          className="desktop-navbar-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faMap} /> Map
        </a>
        <NavLink to="/flan" className="desktop-navbar-link desktop-flan-button">
          <FontAwesomeIcon icon={faSackDollar} /> Flan
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
