import { useState, useMemo } from 'react';
import { initialLeaderboardData } from '../data/leaderboardData';

// Helper to calculate ranks with ties
const calculateRanks = (data) => {
  const sorted = [...data].sort((a, b) => b.score - a.score);
  let currentRank = 1;
  return sorted.map((item, index) => {
    if (index > 0 && item.score < sorted[index - 1].score) {
      currentRank = index + 1;
    }
    return { ...item, rank: currentRank };
  });
};

export const useLeaderboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // In a pure frontend version, data is taken from the local file
  // Ranks are calculated dynamically to handle ties correctly
  const dataWithRanks = useMemo(() => {
    return calculateRanks(initialLeaderboardData);
  }, []);

  const filteredData = useMemo(() => {
    return dataWithRanks.filter((item) =>
      item.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dataWithRanks, searchQuery]);

  return {
    data: filteredData,
    loading: false, // No longer loading from external source
    error: null,
    searchQuery,
    setSearchQuery,
    lastUpdated: new Date() // Static for pure frontend (or actual file modified date)
  };
};
