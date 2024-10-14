import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Monturas from './components/marketplace/monturas/Monturas';
import Construcciones from './components/marketplace/construcciones/Construcciones';
import Mascotas from './components/marketplace/mascotas/Mascotas';
import SecondaryNavbar from './components/marketplace/SecondaryNavbar';
import { SectionProvider } from './context/SectionContext';
import './styles/App.css';
import './components/Sidebar.css';

// Lazy load para las secciones principales
const Lobby = React.lazy(() => import('./components/Lobby'));
const Dungeon = React.lazy(() => import('./components/Dungeon'));
const SlimeFun = React.lazy(() => import('./components/SlimeFun'));
const Crates = React.lazy(() => import('./components/Crates'));
const Quests = React.lazy(() => import('./components/Quests'));
const Play = React.lazy(() => import('./components/Play'));
const FlanPage = React.lazy(() => import('./components/flanpage/FlanPage'));
const NewsSection = React.lazy(() => import('./components/news/NewsSection'));
const Map = React.lazy(() => import('./components/map/Map'));
const Store = React.lazy(() => import('./components/store/Store'));
const Marketplace = React.lazy(() => import('./components/marketplace/Marketplace'));

// Componente para manejar el scroll hacia arriba en cada cambio de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();  // Usamos el hook dentro del Router

  useEffect(() => {
    // Forzar el scroll al principio de la página cada vez que cambie la ruta
    window.scrollTo(0, 0);
    
    // Forzar la recarga de las fuentes cuando cambie de ruta
    document.fonts.ready.then(() => {
      document.body.style.fontFamily = '"YourDefaultFont", sans-serif';
    });

  }, [pathname]);

  return null;
};

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1282);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* Este componente asegura que el scroll se restablezca al cambiar de ruta */}
      <LoadingScreen />
      <SectionProvider>
        <div className="App">
          {/* Navbar responsivo */}
          {isMobile ? <MobileNavbar /> : <Navbar />}

          {/* Sidebar solo en Flancraft */}
          <Routes>
            <Route path="/flancraft" element={<Sidebar />} />
          </Routes>

          {/* Secondary Navbar para subrutas */}
          <Routes>
            <Route path="/marketplace/*" element={<SecondaryNavbar />} />
            <Route path="/monturas" element={<SecondaryNavbar />} />
            <Route path="/construcciones" element={<SecondaryNavbar />} />
            <Route path="/mascotas" element={<SecondaryNavbar />} />
          </Routes>

          {/* Rutas principales */}
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              <Route
                path="/flancraft"
                element={
                  <div className="flancraft-container">
                    <div id="lobby" className="section">
                      <Lobby />
                    </div>
                    <div id="dungeon" className="section">
                      <Dungeon />
                    </div>
                    <div id="slimefun" className="section">
                      <SlimeFun />
                    </div>
                    <div id="crates" className="section">
                      <Crates />
                    </div>
                    <div id="quests" className="section">
                      <Quests />
                    </div>
                    <div id="play" className="section">
                      <Play />
                    </div>
                  </div>
                }
              />

              {/* Ruta raíz ahora apunta a la página de Flan */}
              <Route path="/" element={<FlanPage />} />

              {/* Rutas adicionales */}
              <Route path="/news" element={<NewsSection />} />
              <Route path="/store" element={<Store />} />
              <Route path="/map" element={<Map />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/construcciones" element={<Construcciones />} />
              <Route path="/monturas" element={<Monturas />} />
              <Route path="/mascotas" element={<Mascotas />} />
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </Suspense>

          {/* Pie de página */}
          <Footer />
        </div>
      </SectionProvider>
    </Router>
  );
}

export default App;
