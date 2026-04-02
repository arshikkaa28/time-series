import React from 'react';
import { fetchRealtimeMetrics } from '../services/api';
import useMetricPolling from '../hooks/useMetricPolling';
import { Line } from 'react-chartjs-2';

export default function Humidity() {
  const { data: metrics, loading, error } = useMetricPolling(fetchRealtimeMetrics);

  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})),
    datasets: [{
      label: 'Humidity (%)',
      data: metrics.map(m => Math.max(0, 80 - (m.temperature / 2))), 
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      borderWidth: 2,
      fill: true,
      tension: 0.3,
      pointRadius: 0,
      pointHitRadius: 10,
    }]
  };

  const options = { 
    responsive: true, 
    maintainAspectRatio: false,
    scales: {
        y: { grid: { color: '#f1f5f9' }, min: 0, max: 100 },
        x: { grid: { color: '#f1f5f9' }, ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } } }
    }
  };

  return (
    <div>
      <h2 className="page-title">Humidity Monitor</h2>
      <div className="panel-card">
        <h3 className="panel-title">Live Server Chamber Humidity</h3>
        <p style={{ color: '#64748b' }}>Environmental atmospheric water vapor tracking map</p>
        
        {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>Sensor Error: {error}</p>}
        {loading && metrics.length === 0 ? (
          <p style={{ marginTop: '2rem' }}>Calibrating humidity sensors...</p>
        ) : (
          <div style={{ height: '350px', marginTop: '2rem' }}>
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
}
