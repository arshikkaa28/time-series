import React from 'react';

export default function AlertPanel({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-panel">
      {alerts.map((msg, idx) => (
        <div key={idx} className="alert-item">
          <div className="alert-icon">!</div>
          <span>{msg}</span>
        </div>
      ))}
    </div>
  );
}
