import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { initConsent } from './consent/consent';
import { PageViews } from './tracking/PageViews';
import './main.css';

initConsent();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <PageViews />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
