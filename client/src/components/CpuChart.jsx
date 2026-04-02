import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function CpuChart({ data }) {
  const chartData = {
    labels: data.map(m => {
      const d = new Date(m.timestamp);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}Z`;
    }),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: data.map(m => m.cpuUsage),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: true,
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'start',
        labels: { boxWidth: 20, usePointStyle: true, pointStyle: 'rect' }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b' }
      },
      x: {
        grid: { color: '#f1f5f9' },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: { size: 10 },
          color: '#64748b'
        }
      }
    }
  };

  return <div style={{ height: '280px' }}><Line data={chartData} options={options} /></div>;
}
