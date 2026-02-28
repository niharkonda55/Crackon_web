export function CategoryBar({ categories }) {
  const total = Object.values(categories || {}).reduce(
    (sum, v) => sum + v,
    0
  );
  if (!total) {
    return (
      <div className="border border-border px-4 py-3 text-xs text-muted no-radius">
        THE KNOT IS EMPTY — NO THREADS TO PULL
      </div>
    );
  }

  const entries = Object.entries(categories);

  return (
    <div className="space-y-2">
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
      <div className="flex flex-wrap gap-3 text-[0.6rem] text-muted">
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <span className="inline-block h-px w-4 bg-accent" />
            <span className="tracking-[0.25em] uppercase">
              {key} / {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

