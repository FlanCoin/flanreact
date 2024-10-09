import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Monturas from './components/marketplace/monturas/Monturas';
import Construcciones from './components/marketplace/construcciones/Construcciones';
import Mascotas from './components/marketplace/mascotas/Mascotas';
import SecondaryNavbar from './components/marketplace/SecondaryNavbar';
import ScrollNavigator from './components/ScrollNavigator';
import { SectionProvider } from './context/SectionContext'; // Importar el contexto del SectionProvider

import './styles/App.css';
import './components/Sidebar.css';

// Lazy load para las secciones principales
const Home = React.lazy(() => import('./components/Home'));
const Dungeon = React.lazy(() => import('./components/Dungeon'));
const SlimeFun = React.lazy(() => import('./components/SlimeFun'));
const Crates = React.lazy(() => import('./components/Crates'));
const Quests = React.lazy(() => import('./components/Quests'));
const Play = React.lazy(() => import('./components/Play'));
const FlanPage = React.lazy(() => import('./components/flanpage/FlanPage'));
const NewsSection = React.lazy(() => import('./components/news/NewsSection'));
const Map = React.lazy(() => import('./components/map/Map'));
const Store = React.lazy(() => import('./components/store/Store')); // Mantener el Store como Lazy Load
const Marketplace = React.lazy(() => import('./components/marketplace/Marketplace'));

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1282);
    };
    handleResize(); // Ejecutar la primera vez para comprobar el tamaño inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <SectionProvider> {/* Envolver toda la aplicación en el SectionProvider */}
        <div className="App">
          {/* Mostrar el navbar correspondiente según el tamaño de la pantalla */}
          {isMobile ? <MobileNavbar /> : <Navbar />}

          {/* Incluir el Sidebar solo en la página Home */}
          <Routes>
          <Route path="/" element={<Sidebar />} /> {/* Esta puede causar conflicto */}
          <Route path="/" element={<Home />} />     {/* Solo debe haber una ruta "/" */}
          </Routes>

          {/* Incluir el SecondaryNavbar para subrutas específicas */}
          <Routes>
            <Route path="/marketplace/*" element={<SecondaryNavbar />} />
            <Route path="/monturas" element={<SecondaryNavbar />} />
            <Route path="/construcciones" element={<SecondaryNavbar />} />
            <Route path="/mascotas" element={<SecondaryNavbar />} />
          </Routes>

          {/* Definir las rutas principales */}
          <Suspense fallback={<div>Cargando...</div>}>
            <Routes>
              {/* Rutas con ScrollNavigator activo */}
              <Route
                path="/"
                element={
                  <div className="main-sections-container"> {/* Contenedor principal con scroll controlado */}
                    <ScrollNavigator /> {/* Integrar el ScrollNavigator solo en la ruta principal */}
                    <div id="home" className="section">
                      <Home />
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

              {/* Rutas adicionales fuera del ScrollNavigator */}
              <Route path="/flan" element={<FlanPage />} />
              <Route path="/news" element={<NewsSection />} />
              <Route path="/store" element={<Store />} /> {/* Ruta para la tienda */}
              <Route path="/map" element={<Map />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/construcciones" element={<Construcciones />} />
              <Route path="/monturas" element={<Monturas />} />
              <Route path="/mascotas" element={<Mascotas />} />
              <Route path="*" element={<div>Página no encontrada</div>} /> {/* Ruta de catch-all */}
            </Routes>
          </Suspense>

          {/* Pie de página en todas las secciones */}
          <Footer />
        </div>
      </SectionProvider>
    </Router>
  );
}

export default App;
