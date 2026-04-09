import { AnimatePresence, motion } from 'framer-motion';
import { Search, RefreshCw, Terminal, AlertCircle } from 'lucide-react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import LeaderboardRow from './LeaderboardRow';

const Leaderboard = () => {
  const { data, loading, error, searchQuery, setSearchQuery, lastUpdated } = useLeaderboard();

  // Set to null to disable highlighting any specific team
  const CURRENT_TEAM = null;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-danger/20 bg-danger/5">
        <AlertCircle className="w-12 h-12 text-danger mb-4" />
        <h2 className="text-xl font-bold text-danger mb-2">ACCESS_DENIED</h2>
        <p className="text-muted text-sm font-mono max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 border border-danger/40 text-danger hover:bg-danger/10 transition-colors font-mono text-xs uppercase"
        >
          Initialize Retry Sequence
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/20">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Terminal className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-[0.2em]">Operational Dashboard</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
            Global <span className="text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">Scoreboard</span>
          </h1>
          <p className="text-muted text-sm font-mono">
            Updated: {lastUpdated.toLocaleTimeString()} <RefreshCw className="inline w-3 h-3 animate-spin mx-1 opacity-50" />
          </p>
        </div>

        {/* Search Controller */}
        <div className="relative group w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search Target..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface/50 border border-border/30 rounded-none focus:outline-none focus:border-accent/50 focus:bg-surface transition-all font-mono text-sm placeholder:opacity-30"
          />
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-focus-within:w-full" />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="relative overflow-hidden rounded-sm border border-border/20 bg-surface/30 backdrop-blur-md">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
        <div className="scanline" />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md border-b border-border/40">
              <tr>
                <th className="py-5 px-6 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-muted w-24">Rank</th>
                <th className="py-5 px-6 text-left text-[10px] font-mono uppercase tracking-[0.2em] text-muted">Affiliation / Team</th>
                <th className="py-5 px-6 text-right text-[10px] font-mono uppercase tracking-[0.2em] text-muted w-32">Points_v1.0</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/5">
              {loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><div className="h-4 bg-white/5 rounded w-8 mx-auto" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-white/5 rounded w-48" /></td>
                    <td className="py-4 px-6"><div className="h-4 bg-white/5 rounded w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {data.map((item) => (
                    <LeaderboardRow 
                      key={item.team} 
                      item={item} 
                      isCurrentUser={item.team === CURRENT_TEAM} 
                    />
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
          
          {!loading && data.length === 0 && (
            <div className="p-20 text-center font-mono text-xs text-muted uppercase tracking-widest">
              Zero results found in database...
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-muted/50 px-2 uppercase tracking-widest">
        <span>&gt; Connection: Secure_Websocket_v4</span>
        <span>&gt; Total_Nodes: {data.length}</span>
      </div>
    </div>
  );
};

export default Leaderboard;
