import { useEffect, useState, useCallback, useContext } from 'react';
import { SectionContext } from '../context/SectionContext';
import transitionImage from '../assets/file-rIQPEjtGRYtlrryt1B3BTjxX.png';

const sections = ['home', 'dungeon', 'slimefun', 'crates', 'quests', 'play'];

const ScrollNavigator = () => {
  const { setActiveSection } = useContext(SectionContext);
  const [scrollCounter, setScrollCounter] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isMiddleClickActive, setIsMiddleClickActive] = useState(false);

  useEffect(() => {
    setActiveSection(sections[currentSection]);
  }, [currentSection, setActiveSection]);

  // Aplica el efecto de zoom en la sección actual
  const applyZoomEffect = useCallback(() => {
    const section = document.getElementById(sections[currentSection]);
    if (section) {
      const scaleValue = 1.1 + Math.abs(scrollCounter) * 0.15;
      section.style.transition = 'transform 0.3s ease-out';
      section.style.transform = `scale(${scaleValue})`;
    }
  }, [currentSection, scrollCounter]);

  // Oculta la sección anterior y la resetea
  const resetAndHidePreviousSection = useCallback((prevSectionIndex) => {
    const previousSection = document.getElementById(sections[prevSectionIndex]);
    if (previousSection) {
      previousSection.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      previousSection.style.transform = 'scale(1)';
      previousSection.style.opacity = '0';
      previousSection.style.visibility = 'hidden';
    }
  }, []);

  // Muestra la sección actual con el estilo adecuado
  const showCurrentSection = useCallback(() => {
    const section = document.getElementById(sections[currentSection]);
    if (section) {
      section.style.visibility = 'visible';
      section.style.opacity = '1';
      section.style.transform = 'scale(1)';
    }
  }, [currentSection]);

  // Controla la animación de transición visual entre secciones
  const triggerTransitionAnimation = useCallback(() => {
    setShowTransition(true);
    setTimeout(() => {
      setShowTransition(false);
    }, 800);
  }, []);

  // Navega a la sección objetivo con control de transiciones
  const navigateToSection = useCallback(
    (targetSectionIndex) => {
      if (targetSectionIndex === currentSection || targetSectionIndex < 0 || targetSectionIndex >= sections.length) return;

      setIsTransitioning(true);
      setScrollEnabled(false);
      resetAndHidePreviousSection(currentSection);
      triggerTransitionAnimation();

      setTimeout(() => {
        setCurrentSection(targetSectionIndex);
        setActiveSection(sections[targetSectionIndex]);
        const nextElement = document.getElementById(sections[targetSectionIndex]);
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'auto' }); // Ajuste: Cambio a 'auto' para un scroll más rápido
          setTimeout(() => {
            showCurrentSection();
            setIsTransitioning(false);
            setScrollEnabled(true);
          }, 600);
        }
      }, 500);
    },
    [currentSection, resetAndHidePreviousSection, showCurrentSection, triggerTransitionAnimation, setActiveSection]
  );

  const handleMiddleClickScroll = useCallback(
    (event) => {
      if (isTransitioning || !scrollEnabled || !isMiddleClickActive) return;

      const movementY = event.movementY;
      if (movementY > 15) {
        setScrollCounter((prev) => Math.min(prev + 1, 2));
        if (scrollCounter === 1) {
          setScrollCounter(0);
          navigateToSection(currentSection + 1);
        }
      } else if (movementY < -15) {
        setScrollCounter((prev) => Math.max(prev - 1, -2));
        if (scrollCounter === -1) {
          setScrollCounter(0);
          navigateToSection(currentSection - 1);
        }
      }
    },
    [scrollEnabled, isTransitioning, scrollCounter, navigateToSection, currentSection, isMiddleClickActive]
  );

  useEffect(() => {
    const handleScroll = (event) => {
      if (isTransitioning || !scrollEnabled) return;
      if (event.ctrlKey) return;
      if ((currentSection === 0 && event.deltaY < 0) || (currentSection === sections.length - 1 && event.deltaY > 0)) return;

      if (event.deltaY > 0) setScrollCounter((prev) => Math.min(prev + 1, 2));
      else setScrollCounter((prev) => Math.max(prev - 1, -2));

      applyZoomEffect();

      if (scrollCounter === 1 && event.deltaY > 0) {
        setScrollCounter(0);
        navigateToSection(currentSection + 1);
      }

      if (scrollCounter === -1 && event.deltaY < 0) {
        setScrollCounter(0);
        navigateToSection(currentSection - 1);
      }
    };

    const disableScroll = (e) => e.preventDefault();
    const handleMouseDown = (e) => {
      if (e.button === 1) {
        setIsMiddleClickActive(true);
      }
    };
    const handleMouseUp = (e) => {
      if (e.button === 1) {
        setIsMiddleClickActive(false);
      }
    };
    

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMiddleClickScroll);
    window.addEventListener('scroll', disableScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMiddleClickScroll);
      window.removeEventListener('scroll', disableScroll);
    };
  }, [scrollCounter, currentSection, isTransitioning, scrollEnabled, applyZoomEffect, navigateToSection, handleMiddleClickScroll]);

  useEffect(() => {
    window.navigateToSection = navigateToSection;
  }, [navigateToSection]);

  return (
    <>
      {showTransition && (
        <div className="transition-overlay">
          <img src={transitionImage} alt="Transición" className="transition-image" />
        </div>
      )}
    </>
  );
};

export default ScrollNavigator;
