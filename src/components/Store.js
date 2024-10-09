import React from 'react';
import './Store.css'; // Añade los estilos que necesites

const Store = () => {
  return (
    <div className="store-container">
      <iframe
        src="https://store.flancraft.com/category/keys" // URL de la tienda
        title="FlanCraft Store"
        className="store-iframe"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </div>
  );
};

export default Store;
