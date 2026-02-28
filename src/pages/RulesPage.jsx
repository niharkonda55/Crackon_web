import { RUNE_PATHS, RuneGlyph } from "../components/DarkCTFIntro.jsx";

const rules = [
  "THE KNOT FORBIDS: sharing flags across timelines (teams).",
  "AUTOMATED TOOLS THAT ATTACK THE LOOP ITSELF are forbidden.",
  "EVERY THREAD YOU PULL MUST BE YOUR OWN — no copying writeups during the event.",
  "ABUSE OF INFRASTRUCTURE OUTSIDE THE LOOP is not allowed.",
  "IF YOU BREAK THE TIMELINE, TELL THE KEEPERS: report vulnerabilities responsibly."
];

export function RulesPage() {
  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="font-display text-[1.4rem] sm:text-2xl text-white uppercase flex items-center justify-center gap-x-3 tracking-[0.1em]">
          <span>R</span><span>U</span><span>L</span><span>E</span><span>S</span>
        </h1>
      </header>

      <main className="mx-auto max-w-4xl border-l border-accent pl-6 space-y-6">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-1">
              <RuneGlyph pathD={RUNE_PATHS[idx % RUNE_PATHS.length]} size={26} opacity={0.6} />
            </div>
            <div>
              <h2 className="font-display text-[0.7rem] tracking-[0.1em] uppercase text-white mb-2">
                RULE {String(idx + 1).padStart(2, "0")}
              </h2>
              <p className="text-xs text-text">
                {rule}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

