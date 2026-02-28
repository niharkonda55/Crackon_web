import { useEffect, useState } from "react";

function getRemaining(targetIso) {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, finished: false };
}

export function CountdownTimer({ target, onFinish }) {
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => {
      const next = getRemaining(target);
      setRemaining(next);
      if (next.finished) {
        clearInterval(id);
        if (onFinish) onFinish();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target, onFinish]);

  const parts = [
    { label: "DAYS", value: remaining.days },
    { label: "HOURS", value: remaining.hours },
    { label: "MINS", value: remaining.minutes },
    { label: "SECS", value: remaining.seconds }
  ];

  const format = (v) => (v < 10 ? `0${v}` : String(v));

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4 sm:gap-6">
        {parts.map((part) => (
          <div
            key={part.label}
            className="flex flex-col items-center gap-1"
          >
            <div className="min-w-[4.5rem] border border-border px-3 sm:px-4 py-2 sm:py-3 no-radius flex justify-center overflow-hidden">
              <span className="font-mono text-4xl sm:text-5xl md:text-6xl text-white leading-none tracking-normal">
                {format(part.value)}
              </span>
            </div>
            <span className="mt-2 text-[0.6rem] tracking-[0.1em] text-muted uppercase">
              {part.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

