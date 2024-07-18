import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './auth/AuthProvider';
import { FlashMessageProvider } from './context/FlashMessageContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <FlashMessageProvider>
          <Router>
            <App />
          </Router>
        </FlashMessageProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
