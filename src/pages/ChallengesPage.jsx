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
        <h1 className="font-display text-[1.4rem] sm:text-2xl tracking-[0.6em] uppercase text-white">
          C H A L L E N G E S
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
                className={`px-4 py-2 text-[0.6rem] font-display tracking-[0.35em] uppercase border-r border-border last:border-r-0 ${
                  active
                    ? "text-white border-white bg-white/5"
                    : "text-muted hover:text-white"
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
          <p className="col-span-full text-center text-xs text-muted">
            THE KNOT IS EMPTY — NO THREADS TO PULL
          </p>
        )}

        {filtered.map((chall) => {
          const solved = solvedIds.includes(chall.id);
          return (
            <motion.article
              key={chall.id}
              className={`border border-border bg-surface px-4 py-4 no-radius flex flex-col justify-between ${
                solved ? "border-l-[2px] border-l-success" : ""
              }`}
              whileHover={{
                y: -2,
                borderColor: "rgba(255,255,255,0.15)"
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[0.6rem]">
                  <span className="font-display tracking-[0.32em] text-accent uppercase">
                    {chall.category}
                  </span>
                  <span className="font-mono text-muted">{chall.points} pts</span>
                </div>
                <h2 className="font-display text-sm tracking-[0.22em] uppercase text-white">
                  {chall.title}
                </h2>
                <p className="mt-2 text-xs text-muted line-clamp-4">
                  {chall.description}
                </p>

                {/* Difficulty bar */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[0.6rem] text-muted tracking-[0.25em] uppercase">
                    D I F F
                  </span>
                  <div className="flex gap-1 flex-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-[2px] flex-1 ${
                          i < chall.difficulty
                            ? "bg-accent"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Solved stamp */}
                {solved && (
                  <div className="mt-3 text-[0.6rem] tracking-[0.25em] text-success uppercase">
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

