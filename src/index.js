import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'development') {
  // Solo se conecta al WebSocket en modo desarrollo
  try {
    const socket = new WebSocket('ws://localhost:3002/ws');
    socket.onopen = () => console.log('Conexión establecida con WebSocket');
    socket.onerror = (err) => console.error('Error en WebSocket:', err);
    socket.onclose = () => console.log('Conexión WebSocket cerrada');
  } catch (error) {
    console.error('No se pudo conectar al WebSocket:', error);
  }
}

reportWebVitals();
