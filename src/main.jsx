import React from 'react';
import { createRoot } from 'react-dom/client';
/*import { Provider } from 'react-redux';*/
import { BrowserRouter } from 'react-router-dom';
import App from './App';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>,
);
