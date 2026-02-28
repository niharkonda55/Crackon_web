import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { challenges as allChallenges } from "../data/challenges.js";
import { TerminalInput } from "../components/TerminalInput.jsx";

const CATEGORIES = ["ALL", "WEB", "PWN", "CRYPTO", "FORENSICS", "REVERSE", "MISC", "OSINT"];

export function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [solvedIds, setSolvedIds] = useState(() => {
    const raw = localStorage.getItem("darkctf_solved");
    return raw ? JSON.parse(raw) : [];
  });

  const filtered = useMemo(() => {
    if (activeCategory === "ALL") return allChallenges;
    return allChallenges.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const handleSubmitFlag = (challenge) => async (flag) => {
    const ok = flag === challenge.flag;
    if (ok && !solvedIds.includes(challenge.id)) {
      const next = [...solvedIds, challenge.id];
      setSolvedIds(next);
      localStorage.setItem("darkctf_solved", JSON.stringify(next));
    }
    return ok;
  };

  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="font-display text-[1.4rem] sm:text-2xl text-white uppercase flex items-center justify-center gap-x-3 tracking-[0.1em]">
          <span>C</span><span>H</span><span>A</span><span>L</span><span>L</span><span>E</span><span>N</span><span>G</span><span>E</span><span>S</span>
        </h1>
      </header>

      {/* Filter bar */}
      <div className="mx-auto max-w-5xl mb-8 overflow-x-auto">
        <div className="inline-flex border border-border no-radius">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[0.65rem] font-display tracking-[0.12em] uppercase border-r border-border last:border-r-0 transition-all ${active
                    ? "text-white border-white bg-white/10"
                    : "text-muted hover:text-white hover:bg-white/[0.02]"
                  }`}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <main className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="col-span-full border border-border px-4 py-12 text-[0.7rem] text-muted no-radius flex justify-center">
            <div className="uppercase tracking-[0.06em] flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>THE</span><span>KNOT</span><span>IS</span><span>EMPTY</span>
              <span className="mx-1 tracking-normal opacity-70">—</span>
              <span>NO</span><span>THREADS</span><span>TO</span><span>PULL</span>
            </div>
          </div>
        )}

        {filtered.map((chall) => {
          const solved = solvedIds.includes(chall.id);
          return (
            <motion.article
              key={chall.id}
              className={`border border-border bg-surface px-4 py-4 no-radius flex flex-col justify-between ${solved ? "border-l-[2px] border-l-success" : ""
                }`}
              whileHover={{
                y: -2,
                borderColor: "rgba(255,255,255,0.15)"
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[0.6rem]">
                  <span className="font-display tracking-[0.12em] text-accent uppercase">
                    {chall.category}
                  </span>
                  <span className="font-mono text-muted">{chall.points} pts</span>
                </div>
                <h2 className="font-display text-sm tracking-[0.08em] uppercase text-white">
                  {chall.title}
                </h2>
                <p className="mt-2 text-xs text-muted line-clamp-4">
                  {chall.description}
                </p>

                {/* Difficulty bar */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[0.6rem] text-muted tracking-[0.1em] uppercase">
                    DIFF
                  </span>
                  <div className="flex gap-1 flex-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-[2px] flex-1 ${i < chall.difficulty
                            ? "bg-accent"
                            : "bg-white/10"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Solved stamp */}
                {solved && (
                  <div className="mt-3 text-[0.6rem] tracking-[0.12em] text-success font-display uppercase border border-success/30 px-2 py-0.5 inline-block no-radius">
                    SOLVED
                  </div>
                )}
              </div>

              {/* Flag input */}
              <TerminalInput onSubmit={handleSubmitFlag(chall)} />
            </motion.article>
          );
        })}
      </main>
    </div>
  );
}

