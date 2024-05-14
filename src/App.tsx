import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners/Winners';
import { AppHeader } from '@components/AppHeader';
import './styles/global.scss';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <AppHeader />
      </div>
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="winners" element={<Winners />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
