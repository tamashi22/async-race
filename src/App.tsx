import React, { useState } from 'react';
import Garage from './pages/Garage/Garage';
import Winners from './pages/Winners/Winners';
import { AppHeader } from '@components/AppHeader';
import './styles/global.scss';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'garage' | 'winners'>(
    'garage',
  );

  return (
    <div className="container">
      <AppHeader currentView={currentView} setCurrentView={setCurrentView} />
      <div style={{ display: currentView === 'garage' ? 'block' : 'none' }}>
        <Garage />
      </div>
      <div style={{ display: currentView === 'winners' ? 'block' : 'none' }}>
        <Winners currentView={currentView} />
      </div>
    </div>
  );
};

export default App;
