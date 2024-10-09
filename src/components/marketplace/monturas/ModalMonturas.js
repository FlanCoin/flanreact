// src/components/marketplace/monturas/MonturasModal.js
import React from 'react';
import './ModalMonturas.css';
import compraImg from '../../../assets/compra.png';

const MonturasModal = ({ nft, onClose }) => {
  if (!nft) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <h2>{nft.name}</h2>
          <img src={nft.img} alt={nft.name} className="modal-nft-image" />
          <p>Rareza: <span className={`rarity-label ${nft.rarity.toLowerCase()}`}>{nft.rarity}</span></p>
          <p>Precio: {nft.price} FLAN</p>
          <p>Disponibles: {nft.stock}</p>
          <button className="buy-button">
            <img src={compraImg} alt="Compra" />
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonturasModal;
