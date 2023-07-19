import React from 'react';
import { createRoot } from 'react-dom/client'
import Media from './components/Media/Media';
import { ImageContextProvider } from './AppContext';

export default function App() {
  return (
    <ImageContextProvider>
      <Media />
    </ImageContextProvider>
  );
}

if (document.getElementById('root')) {
  createRoot(document.getElementById('root')).render(<App />)
}