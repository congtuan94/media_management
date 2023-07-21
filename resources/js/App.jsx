import React from 'react';
import { createRoot } from 'react-dom/client';
import Media from './components/Media/Media';
import AppContextProvider from './AppContext';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <AppContextProvider>
        <Media />
      </AppContextProvider>
    </Router>
  );
}

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}