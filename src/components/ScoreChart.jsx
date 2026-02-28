import { useMemo } from "react";

// Simple SVG multi-line chart for top teams
export function ScoreChart({ teams }) {
  const { points, maxScore } = useMemo(() => {
    const pts = [];
    let max = 0;
    teams.forEach((team, idx) => {
      (team.scoreHistory || []).forEach((p) => {
        if (p.score > max) max = p.score;
        pts.push({ ...p, teamIndex: idx });
      });
    });
    return { points: pts, maxScore: max || 1 };
  }, [teams]);

  if (!points.length) {
    return (
      <div className="border border-border px-4 py-6 text-[0.7rem] text-muted no-radius">
        <div className="uppercase tracking-[0.06em] flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>THE</span>
          <span>KNOT</span>
          <span>IS</span>
          <span>EMPTY</span>

          <span className="mx-1 tracking-normal opacity-70">—</span>

          <span>NO</span>
          <span>THREADS</span>
          <span>TO</span>
          <span>PULL</span>
        </div>
      </div>
    );
  }

  const width = 600;
  const height = 220;

  // Build per-team paths
  const teamPaths = teams.map((team, index) => {
    const history = team.scoreHistory || [];
    if (!history.length) return null;
    const len = history.length - 1 || 1;
    const d = history
      .map((p, i) => {
        const x = (i / len) * (width - 40) + 20;
        const y = height - 30 - (p.score / maxScore) * (height - 60);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
    return { d, index };
  });

  const palette = [
    "rgba(200,184,154,0.95)",
    "rgba(180,180,180,0.9)",
    "rgba(120,120,120,0.9)",
    "rgba(160,160,160,0.8)",
    "rgba(100,100,100,0.9)"
  ];

  return (
    <div className="border border-border bg-surface px-4 py-4 no-radius">
      <h3 className="font-display text-[0.65rem] tracking-[0.08em] text-muted uppercase mb-4">
        <div className="flex items-center gap-x-3">
          <span>SCORE</span>
          <span>TIMELINE</span>
        </div>
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-56"
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="#050505"
        />
        {/* grid lines */}
        {[0.25, 0.5, 0.75].map((p) => {
          const y = height - 30 - p * (height - 60);
          return (
            <line
              key={p}
              x1="20"
              x2={width - 20}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}

        {teamPaths.map(
          (path, i) =>
            path && (
              <path
                key={teams[i].id}
                d={path.d}
                fill="none"
                stroke={palette[i % palette.length]}
                strokeWidth="1.2"
              />
            )
        )}
      </svg>
    </div>
  );
}

