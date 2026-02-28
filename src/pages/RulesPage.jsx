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
        <h1 className="font-display text-[1.4rem] sm:text-2xl tracking-[0.6em] uppercase text-white">
          R U L E S
        </h1>
      </header>

      <main className="mx-auto max-w-4xl border-l border-accent pl-6 space-y-6">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="mt-1">
              <RuneGlyph pathD={RUNE_PATHS[idx % RUNE_PATHS.length]} size={26} opacity={0.6} />
            </div>
            <div>
              <h2 className="font-display text-xs tracking-[0.35em] uppercase text-white mb-1">
                R U L E  {String(idx + 1).padStart(2, "0")}
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

