import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SystemOverview from './pages/SystemOverview';
import Configure from './pages/Configure';
import DailyPerformance from './pages/DailyPerformance';
import Humidity from './pages/Humidity';
import TemperaturePage from './pages/TemperaturePage';
import MainLayout from './layouts/MainLayout';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('TimeSeries');

  const renderContent = () => {
    switch (activeTab) {
      case 'TimeSeries': return <Dashboard />;
      case 'SystemOverview': return <SystemOverview />;
      case 'Configure': return <Configure />;
      case 'DailyPerformance': return <DailyPerformance />;
      case 'Humidity': return <Humidity />;
      case 'Temperature': return <TemperaturePage />;
      default: return <Dashboard />;
    }
  };

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
