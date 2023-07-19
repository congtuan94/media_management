import React from 'react';
import { createRoot } from 'react-dom/client';
import Media from './components/Media/Media';
import AppContextProvider from './AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <Media />
    </AppContextProvider>
  );
}

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />);
}