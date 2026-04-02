import React from 'react';
import { fetchRealtimeMetrics } from '../services/api';
import useMetricPolling from '../hooks/useMetricPolling';
import CpuChart from '../components/CpuChart';
import TemperatureChart from '../components/TemperatureChart';

export default function Dashboard() {
  const { data: metrics, loading, error } = useMetricPolling(fetchRealtimeMetrics);

  const latest = metrics.length > 0 ? metrics[metrics.length - 1] : null;

  return (
    <div>
      <h2 className="page-title">Time Series Data Handler</h2>
      
      {loading && metrics.length === 0 && <p className="loading-text">Synchronizing with live data stream...</p>}
      {error && <p className="error-text">Connection Error: {error}</p>}
      
      <div className="charts-wrapper">
        <div className="panel-card">
          <h3 className="panel-title">CPU Usage (%)</h3>
          <CpuChart data={metrics} />
        </div>
        
        <div className="panel-card">
          <h3 className="panel-title">Temperature (°C)</h3>
          <TemperatureChart data={metrics} />
        </div>
      </div>
      
      <div className="stats-row">
        <div className="stat-chip">
          <span className="stat-chip-label">Current Memory</span>
          <span className="stat-chip-value">{latest ? `${latest.memoryUsage} MB` : '--'}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-label">Active Visitors</span>
          <span className="stat-chip-value">{latest ? latest.visitors : '--'}</span>
        </div>
        <div className="stat-chip">
          <span className="stat-chip-label">System Uptime</span>
          <span className="stat-chip-value">{latest ? `${(latest.uptime / 3600).toFixed(1)}h` : '--'}</span>
        </div>
      </div>
    </div>
  );
}
