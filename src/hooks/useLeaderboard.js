import { useState, useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';
const API_URL = 'http://localhost:3001/api/leaderboard';

export const useLeaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Initial Fetch
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch leaderboard');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

    // WebSocket Connection
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to leaderboard socket');
    });

    socket.on('leaderboardUpdate', (newData) => {
      setData(newData);
      setLastUpdated(new Date());
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return {
    data: filteredData,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    lastUpdated
  };
};
