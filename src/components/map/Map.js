import React from 'react';
import './Map.css'; // Asegúrate de que este archivo exista

const Map = () => {
  return (
    <div className="map-container">
      <iframe
        src="http://play.flancraft.com:8123/?worldname=planetasrv&mapname=flat&zoom=4&x=6008&y=64&z=-1701" 
        title="Dynmap"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
