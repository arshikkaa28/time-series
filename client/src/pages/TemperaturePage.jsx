import React from 'react';
import { fetchRealtimeMetrics } from '../services/api';
import useMetricPolling from '../hooks/useMetricPolling';
import TemperatureChart from '../components/TemperatureChart';

export default function TemperaturePage() {
  const { data: metrics, loading, error } = useMetricPolling(fetchRealtimeMetrics);

  return (
    <div>
      <h2 className="page-title">Temperature Tracker</h2>
      <div className="panel-card">
        <h3 className="panel-title">Isolated Heat Analysis</h3>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>Focused tracking specifically aimed at thermal dynamics of the cluster to prevent hardware failure.</p>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Thermal Sensor Error: {error}</p>}
        {loading && metrics.length === 0 ? (
          <p>Scanning thermal distribution...</p>
        ) : (
          <TemperatureChart data={metrics} />
        )}
      </div>
    </div>
  );
}
