import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  } catch (err) {
    console.error("Render failed:", err);
    rootElement.innerHTML = `<div style="color: white; padding: 20px;">Render Error: ${err.message}</div>`;
  }
}