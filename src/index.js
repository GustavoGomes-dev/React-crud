import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualizado para importar o novo método
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Cria a raiz da aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
