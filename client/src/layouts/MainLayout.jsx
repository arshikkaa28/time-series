import React from 'react';

export default function MainLayout({ children, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'TimeSeries', icon: '📊', label: 'Time Series Data' },
    { id: 'SystemOverview', icon: '○', label: 'System Overview' },
    { id: 'Configure', icon: '⚙️', label: 'Configure' },
    { id: 'DailyPerformance', icon: '📅', label: 'Daily Performance' },
    { id: 'Humidity', icon: '📈', label: 'Humidity' },
    { id: 'Temperature', icon: '🌡', label: 'Temperature' },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">~</div>
          Time Series Data Handler
        </div>
        <nav className="nav-menu">
          {navItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="icon">{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
      </aside>
      
      <main className="main-content">
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
