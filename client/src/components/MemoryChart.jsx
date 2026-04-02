import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function MemoryChart({ data }) {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 0, 400);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.5)'); // secondary accent
      grad.addColorStop(1, 'rgba(14, 165, 233, 0.0)');
      setGradient(grad);
    }
  }, []);

  const chartData = {
    labels: data.map(m => new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})),
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: data.map(m => m.memoryUsage),
        borderColor: '#0ea5e9',
        backgroundColor: gradient || 'rgba(14, 165, 233, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#0ea5e9',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { size: 14, family: "'Outfit', sans-serif" },
        bodyFont: { size: 14, family: "'Outfit', sans-serif" },
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        displayColors: false,
      }
    },
    scales: {
      y: {
        min: 0,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8', font: { family: "'Outfit', sans-serif" } },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: "'Outfit', sans-serif" }, maxTicksLimit: 8 },
        border: { display: false }
      }
    }
  };

  return <div style={{ height: '300px' }}><Line ref={chartRef} data={chartData} options={options} /></div>;
}
