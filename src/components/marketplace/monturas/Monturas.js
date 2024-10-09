import React, { useState, useEffect } from 'react';
import './Monturas.css';
import ModalMonturas from './ModalMonturas';
import nft16 from '../../../assets/nft16.png';
import nft17 from '../../../assets/nft17.png';
import nft18 from '../../../assets/nft18.png';
import nft19 from '../../../assets/nft19.png';
import nft20 from '../../../assets/nft20.png';
import nft21 from '../../../assets/nft21.png';
import nft22 from '../../../assets/nft22.png';
import nft23 from '../../../assets/nft23.png';
import nft24 from '../../../assets/nft24.png';
import nft25 from '../../../assets/nft25.png';
import nft26 from '../../../assets/nft26.png';
import nft27 from '../../../assets/nft27.png';
import nft28 from '../../../assets/nft28.png';
import nft29 from '../../../assets/nft29.png';
import nft30 from '../../../assets/nft30.png'; // Dragón

// Definición de los NFTs
const nftsData = [
  { id: 16, name: 'Cerdo', rarity: 'común', img: nft16, price: 40000, stock: 5 },
  { id: 17, name: 'Vaca', rarity: 'común', img: nft17, price: 40000, stock: 5 },
  { id: 18, name: 'Oveja', rarity: 'común', img: nft18, price: 40000, stock: 5 },
  { id: 19, name: 'Lobo', rarity: 'común', img: nft19, price: 40000, stock: 5 },
  { id: 20, name: 'Pollo', rarity: 'común', img: nft20, price: 40000, stock: 5 },
  { id: 21, name: 'Caballo Zombie', rarity: 'poco común', img: nft21, price: 80000, stock: 4 },
  { id: 22, name: 'Esqueleto', rarity: 'poco común', img: nft22, price: 80000, stock: 4 },
  { id: 23, name: 'Creeper', rarity: 'poco común', img: nft23, price: 80000, stock: 4 },
  { id: 24, name: 'Mula', rarity: 'poco común', img: nft24, price: 80000, stock: 4 },
  { id: 25, name: 'Wither Esqueleto', rarity: 'raro', img: nft25, price: 160000, stock: 3 },
  { id: 26, name: 'Axolote', rarity: 'raro', img: nft26, price: 160000, stock: 3 },
  { id: 27, name: 'VacaSeta', rarity: 'raro', img: nft27, price: 160000, stock: 3 },
  { id: 28, name: 'Wither', rarity: 'épico', img: nft28, price: 250000, stock: 2 },
  { id: 29, name: 'Warden', rarity: 'épico', img: nft29, price: 250000, stock: 2 },
  { id: 30, name: 'Dragón', rarity: 'legendario', img: nft30, price: 500000, stock: 1 },
];

const Monturas = () => {
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedNFT, setSelectedNFT] = useState(null);
  

  // Asegurar que el navbar se mantenga visible en la subruta
  useEffect(() => {
    const navbar = document.querySelector('.secondary-navbar');
    if (navbar) navbar.style.display = 'flex';
  }, []);

  // Filtrar por rareza y actualizar estado
  const handleRarityFilter = (rarity) => setSelectedRarity(rarity);

  // Aplicar el filtro de rareza al listado de NFTs
  const filteredNFTs = selectedRarity ? nftsData.filter((nft) => nft.rarity === selectedRarity) : nftsData;

  return (
    <div className="monturas-container">
      <h1 className="title-section">Monturas NFT's</h1>
      <div className="content-container">
        <div className="rareza-sidebar">
          <h3>Filtrar por Rareza</h3>
          <button onClick={() => handleRarityFilter('común')} className="rareza-button common">Común</button>
          <button onClick={() => handleRarityFilter('poco común')} className="rareza-button uncommon">Poco Común</button>
          <button onClick={() => handleRarityFilter('raro')} className="rareza-button rare">Raro</button>
          <button onClick={() => handleRarityFilter('épico')} className="rareza-button epic">Épico</button>
          <button onClick={() => handleRarityFilter('legendario')} className="rareza-button legendary">Legendario</button>
          <button onClick={() => handleRarityFilter('')} className="rareza-button all">Todos</button>
        </div>
        {/* Listado de NFTs */}
        <div className="nft-list">
        {filteredNFTs.map((nft) => (
  <div
    key={nft.id}
    className={`nft-card rarity-${nft.rarity.replace(' ', '-').toLowerCase()}`} 
    onClick={() => setSelectedNFT(nft)}
  >
    <img src={nft.img} alt={nft.name} className="nft-image" />
    <div className="nft-details">
      <h4>{nft.name}</h4>
      <p>{nft.price.toLocaleString()} FLAN</p>
      <p>Disponibles: {nft.stock}</p>
      <button className="buy-now-button" onClick={() => setSelectedNFT(nft)}>
        Buy Now!
      </button>
    </div>
  </div>
))}
        </div>
      </div>
      {selectedNFT && <ModalMonturas nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
    </div>
  );
};

export default Monturas;
