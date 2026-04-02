import React from 'react';

export default function Configure() {
  return (
    <div>
      <h2 className="page-title">Configuration Settings</h2>
      <div className="panel-card">
        <h3 className="panel-title">Preferences Engine</h3>
        <p>Manage connection limits, threshold triggers, and database indexing sequences securely here.</p>
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
          <label style={{display: 'block', marginBottom: '15px'}}>
            <strong>Critical Alert Threshold (CPU %):</strong><br/>
            <input type="range" min="50" max="100" defaultValue="80" style={{width: '300px', marginTop: '10px'}}/>
          </label>
          <label style={{display: 'block', marginBottom: '15px'}}>
            <strong>Data Retention (Days):</strong><br/>
            <input type="number" defaultValue="30" style={{width: '100px', marginTop: '10px', padding: '5px'}}/>
          </label>
          <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Save Config</button>
        </div>
      </div>
    </div>
  );
}
