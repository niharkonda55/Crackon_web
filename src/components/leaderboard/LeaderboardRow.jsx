import { motion } from 'framer-motion';
import { Trophy, Medal, Hash } from 'lucide-react';
import clsx from 'clsx';

const LeaderboardRow = ({ item, isCurrentUser }) => {
  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]';
      case 2:
        return 'text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.5)]';
      case 3:
        return 'text-amber-600 drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]';
      default:
        return 'text-gray-500';
    }
  };

  const getRowStyle = (rank) => {
    if (isCurrentUser) return 'bg-cyan-500/10 border-y border-cyan-500/30';
    if (rank === 1) return 'bg-yellow-400/5';
    return '';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5" />;
    if (rank <= 3) return <Medal className="w-5 h-5" />;
    return <span className="text-xs font-mono opacity-50">#</span>;
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
      className={clsx(
        'group relative border-b border-border/10 hover:bg-white/5 transition-colors duration-200',
        getRowStyle(item.rank)
      )}
    >
      <td className="py-4 px-6 text-center">
        <div className={clsx('flex items-center justify-center gap-2 font-bold', getRankStyle(item.rank))}>
          {getRankIcon(item.rank)}
          <span className="text-sm font-mono">{item.rank}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <span className={clsx(
            'text-sm font-semibold tracking-wider transition-all duration-300',
            isCurrentUser ? 'text-accent' : 'text-text group-hover:text-accent'
          )}>
            {item.team}
          </span>
          {isCurrentUser && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 animate-pulse">
              YOU
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6 text-right font-mono font-bold text-accent-tertiary">
        {item.score.toLocaleString()}
      </td>
    </motion.tr>
  );
};

export default LeaderboardRow;
