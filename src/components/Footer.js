import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.footer
      className={`footer ${isHovered ? 'open' : 'closed'}`}
      initial={{ y: '100%' }}
      animate={{ y: isHovered ? '0%' : '80%' }}
      transition={{ type: 'tween', duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="footer-background"></div> {/* Fondo con la imagen */}
<div className="footer-content">
  <p className="rights-text">
    <strong>&copy; 2024 FlanCraft. Todos los derechos reservados. La moneda del futuro, hoy.</strong>
  </p>
  <div className="footer-links">
    <a href="/flancraft-universo"><strong>Explora el Universo</strong></a>
    <a href="/faq"><strong>FAQ</strong></a>
    <a href="/soporte"><strong>Soporte</strong></a>
  </div>
</div>
    </motion.footer>
  );
};

export default Footer;
