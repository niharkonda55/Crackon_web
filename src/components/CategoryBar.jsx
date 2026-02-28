export function CategoryBar({ categories }) {
  const total = Object.values(categories || {}).reduce(
    (sum, v) => sum + v,
    0
  );

  // ---------------- EMPTY STATE ----------------
  if (!total) {
    return (
      <div className="border border-border px-4 py-3 text-[0.7rem] text-muted no-radius">
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

  const entries = Object.entries(categories);

  // ---------------- CATEGORY BAR ----------------
  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="flex h-2 w-full border border-border no-radius overflow-hidden">
        {entries.map(([key, value], index) => {
          const width = (value / total) * 100;

          const shades = [
            "rgba(200,184,154,0.6)",
            "rgba(180,180,180,0.5)",
            "rgba(120,120,120,0.5)",
            "rgba(140,140,140,0.5)",
            "rgba(100,100,100,0.5)",
            "rgba(160,160,160,0.5)",
            "rgba(220,220,220,0.5)"
          ];

          return (
            <div
              key={key}
              style={{
                width: `${width}%`,
                backgroundColor: shades[index % shades.length]
              }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.65rem] text-muted">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="inline-block h-px w-4 bg-accent" />

            <div className="uppercase tracking-[0.08em] flex items-center">
              <span>{key}</span>

              <span className="mx-2 tracking-normal opacity-60">/</span>

              <span className="tracking-normal">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}