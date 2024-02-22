import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot
import './index.css';
import App from './App';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
