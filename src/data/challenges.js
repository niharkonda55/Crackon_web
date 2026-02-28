export const challenges = [
  {
    id: "chall_001",
    title: "The Knot",
    category: "WEB",
    difficulty: 3,
    points: 500,
    description:
      "A fragile web service entangled across timelines. Trace the request, follow the session, and unbind the knot.",
    files: ["the-knot.zip"],
    hints: [
      { id: 1, text: "Look at how the session persists between requests.", cost: 50 },
      { id: 2, text: "The flag is guarded by a misplaced check.", cost: 100 }
    ],
    flag: "DARK{example_flag_knot}",
    solved_by: 12,
    solved: false
  },
  {
    id: "chall_002",
    title: "Echoes in the Log",
    category: "FORENSICS",
    difficulty: 2,
    points: 300,
    description:
      "System logs from two different years overlap. Only one sequence of events could have happened.",
    files: ["echoes.pcap"],
    hints: [{ id: 1, text: "Filter by time, then by anomaly.", cost: 40 }],
    flag: "DARK{log_time_paradox}",
    solved_by: 5,
    solved: false
  },
  {
    id: "chall_003",
    title: "Three Worlds",
    category: "CRYPTO",
    difficulty: 4,
    points: 600,
    description:
      "Three ciphertexts, three worlds, one shared weakness. Align them and the structure reveals itself.",
    files: ["three-worlds.txt"],
    hints: [
      { id: 1, text: "Compare differences between worlds.", cost: 60 },
      { id: 2, text: "Key reuse is its own paradox.", cost: 120 }
    ],
    flag: "DARK{crypto_anomaly}",
    solved_by: 3,
    solved: false
  }
];

