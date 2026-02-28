import { motion } from "framer-motion";

export function AboutPage() {
  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-12">
        <motion.h1
          className="font-display text-[8vw] sm:text-[5vw] text-white uppercase flex items-center justify-center gap-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span>A</span><span>B</span><span>O</span><span>U</span><span>T</span>
        </motion.h1>
      </header>

      {/* Hero quote */}
      <section className="mx-auto max-w-4xl mb-14 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="font-mono text-sm text-text leading-8 max-w-2xl">
          “The beginning is the end. The end is the beginning.”
        </p>
        <div className="mt-4 h-px w-32 bg-white/15" />
        <p className="mt-2 text-[0.7rem] text-muted">— DARK, NETFLIX</p>
      </section>

      {/* Concept + Numbers */}
      <section className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 mb-14">
        <div>
          <h2 className="font-display text-[0.65rem] tracking-[0.08em] text-accent uppercase mb-5">
            <div className="flex items-center gap-x-3">
              <span>WHAT</span><span>IS</span><span>THIS</span>
            </div>
          </h2>
          <p className="font-mono text-xs leading-7 text-text mb-4">
            DARK CTF is a Capture The Flag competition woven into the mythology of
            time, paradox, and the eternal knot. Every challenge is a thread. Pull the
            wrong one and the loop tightens.
          </p>
          <p className="font-mono text-xs leading-7 text-text mb-4">
            Instead of bright dashboards and loud colors, the interface pulls you into
            a quiet, humming anomaly. Flags feel like artifacts. Logs, binaries, and
            packets become echoes from other timelines.
          </p>
          <p className="font-mono text-xs leading-7 text-text">
            You will move between web flaws, cryptographic fractures, binary ghosts,
            and open-source traces — all bound together by a single, entangled story:
            the loop never breaks on its own.
          </p>
        </div>

        <div className="space-y-4">
          {[
            ["01", "72 HOURS", "DURATION"],
            ["02", "50+ CHALLENGES", "ACROSS 7 CATEGORIES"],
            ["03", "OPEN TO ALL", "INDIVIDUALS & TEAMS"],
            ["04", "ONLINE", "COMPETE FROM ANYWHERE"]
          ].map(([num, title, sub]) => (
            <div key={num} className="flex gap-4 border-l border-accent pl-4">
              <div className="font-mono text-[0.65rem] text-muted mt-[2px]">
                {num}
              </div>
              <div>
                <p className="font-display text-[0.7rem] tracking-[0.1em] uppercase text-white">
                  {title}
                </p>
                <p className="font-mono text-[0.65rem] text-muted mt-1">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl">
        <h2 className="font-display text-[0.65rem] tracking-[0.08em] text-white uppercase mb-8">
          <div className="flex items-center gap-x-3">
            <span>THE</span><span>CYCLE</span>
          </div>
        </h2>
        <div className="relative">
          <div className="h-px w-full bg-white/10" />
          {[
            ["REGISTRATION OPENS", "Feb 1"],
            ["CTF BEGINS", "Mar 1 · 10:00 UTC"],
            ["CTF ENDS", "Mar 3 · 10:00 UTC"],
            ["WINNERS ANNOUNCED", "Mar 4"]
          ].map((node, idx) => (
            <div
              key={node[0]}
              className="absolute"
              style={{ left: `${(idx / 3) * 100}%`, transform: "translateX(-50%)" }}
            >
              <div
                className="w-1 h-1 bg-white rounded-none"
                style={{ marginBottom: idx % 2 === 0 ? "0.75rem" : "-0.75rem" }}
              />
              <div
                className={`text-[0.6rem] text-muted whitespace-nowrap ${idx % 2 === 0 ? "mb-4" : "mt-4"
                  }`}
              >
                <div className="tracking-[0.12em] uppercase">{node[0]}</div>
                <div>{node[1]}</div>
              </div>
            </div>
          ))}
          {/* Current position dot */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1.5">
            <div className="w-2 h-2 bg-accent rounded-none animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}

