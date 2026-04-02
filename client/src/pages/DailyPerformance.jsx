import React from 'react';
import { fetchDailyMetrics } from '../services/api';
import useMetricPolling from '../hooks/useMetricPolling';

export default function DailyPerformance() {
  const { data: dailyData, loading, error } = useMetricPolling(fetchDailyMetrics, 60000); // Daily updates every minute

  return (
    <div>
      <h2 className="page-title">Daily Performance Logs</h2>
      <div className="panel-card">
        <h3 className="panel-title">Historical Daily Averages</h3>
        <p style={{ color: '#64748b' }}>This metric table illustrates the aggregated data calculated directly by the MongoDB Time-Series collection from the past days.</p>
        
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>Analytics Error: {error}</p>}
        {loading && dailyData.length === 0 ? (
          <p style={{ marginTop: '2rem' }}>Gathering analytics buffer...</p>
        ) : dailyData.length > 0 ? (
          <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '2rem'}}>
            <thead>
              <tr style={{borderBottom: '2px solid #e2e8f0', color: '#1e293b'}}>
                <th style={{paddingBottom: '10px'}}>Date</th>
                <th style={{paddingBottom: '10px'}}>Avg CPU</th>
                <th style={{paddingBottom: '10px'}}>Avg Temp</th>
                <th style={{paddingBottom: '10px'}}>Total Visitors</th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map((d, i) => (
                <tr key={i} style={{borderBottom: '1px solid #f1f5f9'}}>
                  <td style={{padding: '15px 0'}}>{d._id.year}-{String(d._id.month).padStart(2,'0')}-{String(d._id.day).padStart(2,'0')}</td>
                  <td>{d.avgCpu.toFixed(1)}%</td>
                  <td>{d.avgTemp.toFixed(1)}°C</td>
                  <td>{d.totalVisitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p style={{ marginTop: '2rem' }}>Gathering analytics buffer...</p>}
      </div>
    </div>
  );
}
