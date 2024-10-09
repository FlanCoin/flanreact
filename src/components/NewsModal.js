// src/components/NewsModal.js
import React from 'react';
import './NewsModal.css';

const NewsModal = ({ isOpen, onClose, news }) => {
  if (!isOpen || !news) return null;

  // Divide el cuerpo de la noticia en párrafos
  const formattedText = news.body.split('\n\n').map((paragraph, index) => (
    <p key={index} className="modal-paragraph">{paragraph}</p>
  ));

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <img src={news.image} alt={news.title} className="modal-image"/>
        <h3 className="modal-title">{news.title}</h3>
        <p className="modal-date">{news.date}</p>
        <hr className="modal-separator" />
        {/* Renderiza el texto formateado */}
        <div className="modal-text">{formattedText}</div>
      </div>
    </div>
  );
};

export default NewsModal;
