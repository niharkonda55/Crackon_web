import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // In production, restrict this to your frontend URL
    methods: ['GET', 'POST']
  }
});

let leaderboardData = [
  { "team": "localhost96", "score": 82 },
  { "team": "zero Lag", "score": 79 },
  { "team": "cur5ed protocol", "score": 77 },
  { "team": "fs0ci3ty", "score": 72 },
  { "team": "Syntax Squad", "score": 72 },
  { "team": "Phreakers", "score": 71 },
  { "team": "hackstrom", "score": 70 },
  { "team": "Deadlock Cartel", "score": 69 },
  { "team": "Catware", "score": 67 },
  { "team": "b1t0ps", "score": 65 },
  { "team": "cybersec", "score": 64 },
  { "team": "zer0d4y", "score": 64 },
  { "team": "z3r0", "score": 61 },
  { "team": "code killers", "score": 60 },
  { "team": "Z3r0d4y", "score": 58 },
  { "team": "RootRulers", "score": 55 },
  { "team": "hackopsgitam", "score": 55 },
  { "team": "0xshouryangas", "score": 51 },
  { "team": "dynamites", "score": 50 },
  { "team": "Phantoms", "score": 48 },
  { "team": "RAMAYATRI", "score": 48 },
  { "team": "foo fighters firewall", "score": 46 },
  { "team": "rootx", "score": 45 },
  { "team": "404 team not found", "score": 44 }
];

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

app.get('/api/leaderboard', (req, res) => {
  res.json(calculateRanks(leaderboardData));
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send initial data
  socket.emit('leaderboardUpdate', calculateRanks(leaderboardData));

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

/* 
// Simulation: Randomly update scores every 10 seconds
setInterval(() => {
  const randomIndex = Math.floor(Math.random() * leaderboardData.length);
  leaderboardData[randomIndex].score += Math.floor(Math.random() * 5) + 1;
  
  // Broadcast update to all clients
  io.emit('leaderboardUpdate', calculateRanks(leaderboardData));
}, 10000);
*/

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
