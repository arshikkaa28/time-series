import axios from 'axios';

const API_BASE = '/api/metrics';

export const fetchRealtimeMetrics = async () => {
  const { data } = await axios.get(`${API_BASE}/realtime`);
  return data.data;
};

export const fetchHourlyMetrics = async () => {
  const { data } = await axios.get(`${API_BASE}/hourly`);
  return data.data;
};

export const fetchDailyMetrics = async () => {
  const { data } = await axios.get(`${API_BASE}/daily`);
  return data.data;
};
