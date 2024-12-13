import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeDatabase } from './config/initDatabase';

// Initialize database
console.log('Starting application initialization...');

const startApp = async () => {
  try {
    console.log('Initializing database...');
    const success = await initializeDatabase();
    if (success) {
      console.log('Database initialized successfully');
    } else {
      console.log('Database initialization skipped (already initialized)');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};

startApp();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
