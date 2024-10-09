import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SectionContext } from '../context/SectionContext';
import inicioIcon from '../assets/sidebar/botoninicio.png';
import dungeonsIcon from '../assets/sidebar/botondungeons.png';
import slimeIcon from '../assets/sidebar/botonslime.png';
import cratesIcon from '../assets/sidebar/botoncrates.png';
import questsIcon from '../assets/sidebar/botonmisiones.png';
import playIcon from '../assets/sidebar/botonplay.png';
import './Sidebar.css';

function Sidebar() {
  const { activeSection } = useContext(SectionContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const scrollToSection = (sectionId) => {
    const sections = ['home', 'dungeon', 'slimefun', 'crates', 'quests', 'play'];
    const index = sections.indexOf(sectionId);
    if (index !== -1 && window.navigateToSection) {
      window.navigateToSection(index, true);
    }
  };

  const handleArrowClick = (direction) => {
    const sections = ['home', 'dungeon', 'slimefun', 'crates', 'quests', 'play'];
    const currentIndex = sections.indexOf(activeSection);

    if (direction === 'up' && currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1]);
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1]);
    }
  };

  const isTopArrowDisabled = activeSection === 'home';
  const isBottomArrowDisabled = activeSection === 'play';

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}></div>
      <div className="sidebar-nav">
        {/* Eliminamos el href y usamos solo onClick para evitar cambiar la URL */}
        <div className={`sidebar-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')} data-tooltip="Inicio">
          <img src={inicioIcon} alt="Inicio" className="sidebar-icon" />
        </div>
        <div className={`sidebar-link ${activeSection === 'dungeon' ? 'active' : ''}`} onClick={() => scrollToSection('dungeon')} data-tooltip="Dungeon">
          <img src={dungeonsIcon} alt="Dungeon" className="sidebar-icon" />
        </div>
        <div className={`sidebar-link ${activeSection === 'slimefun' ? 'active' : ''}`} onClick={() => scrollToSection('slimefun')} data-tooltip="Slimefun">
          <img src={slimeIcon} alt="Slimefun" className="sidebar-icon" />
        </div>
        <div className={`sidebar-link ${activeSection === 'crates' ? 'active' : ''}`} onClick={() => scrollToSection('crates')} data-tooltip="Crates">
          <img src={cratesIcon} alt="Crates" className="sidebar-icon" />
        </div>
        <div className={`sidebar-link ${activeSection === 'quests' ? 'active' : ''}`} onClick={() => scrollToSection('quests')} data-tooltip="Quests">
          <img src={questsIcon} alt="Quests" className="sidebar-icon" />
        </div>
        <div className={`sidebar-link ${activeSection === 'play' ? 'active' : ''}`} onClick={() => scrollToSection('play')} data-tooltip="Play">
          <img src={playIcon} alt="Play" className="sidebar-icon" />
        </div>
      </div>
      {/* Flechas de navegación */}
      <div className={`sidebar-arrow top ${isTopArrowDisabled ? 'disabled' : ''}`} onClick={() => !isTopArrowDisabled && handleArrowClick('up')}>
        <FontAwesomeIcon icon={faChevronUp} />
      </div>
      <div className={`sidebar-arrow bottom ${isBottomArrowDisabled ? 'disabled' : ''}`} onClick={() => !isBottomArrowDisabled && handleArrowClick('down')}>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </div>
  );
}

export default Sidebar;
