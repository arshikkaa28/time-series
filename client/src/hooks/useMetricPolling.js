import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for polling metrics at a regular interval.
 * @param {Function} fetchFunc - The API service function to call.
 * @param {number} intervalMs - Polling interval in milliseconds (default 5000).
 * @returns {Object} { data, loading, error }
 */
export default function useMetricPolling(fetchFunc, intervalMs = 5000) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const loadData = async () => {
    try {
      const result = await fetchFunc();
      setData(result);
      setError(null);
    } catch (err) {
      console.error('Polling error:', err);
      setError(err.message || 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // Initial load
    
    intervalRef.current = setInterval(loadData, intervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchFunc, intervalMs]);

  return { data, loading, error, refresh: loadData };
}
