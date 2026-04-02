import React from 'react';
import { fetchRealtimeMetrics } from '../services/api';
import useMetricPolling from '../hooks/useMetricPolling';

export default function SystemOverview() {
  const { data: metrics, loading, error } = useMetricPolling(fetchRealtimeMetrics);

  const latest = metrics.length > 0 ? metrics[metrics.length - 1] : null;

  return (
    <div>
      <h2 className="page-title">System Overview</h2>
      <div className="panel-card" style={{ marginBottom: '2rem' }}>
        <h3 className="panel-title">System Details</h3>
        <p>This section provides a high-level overview of the entire server cluster and application state.</p>
        <br />
        {error && <p style={{ color: '#ff4d4d' }}>Unable to retrieve system health: {error}</p>}
        {loading && metrics.length === 0 ? (
          <p>Analyzing system architecture and live streams...</p>
        ) : latest ? (
          <ul style={{ lineHeight: '2' }}>
            <li><strong>CPU Health:</strong> {latest.cpuUsage < 80 ? 'Good' : 'Critical'} ({latest.cpuUsage}%)</li>
            <li><strong>Active Visitors:</strong> {latest.visitors} connected streams</li>
            <li><strong>Total RAM Allocated:</strong> {latest.memoryUsage} MB used out of 16384 MB</li>
            <li><strong>Cluster Uptime:</strong> {(latest.uptime / 3600).toFixed(2)} hours online</li>
            <li><strong>Data Source:</strong> Time Series Core DB</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}
