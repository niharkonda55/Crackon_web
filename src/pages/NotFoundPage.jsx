import { RuneGlyph, RUNE_PATHS } from "../components/DarkCTFIntro.jsx";

export function NotFoundPage() {
  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text flex flex-col items-center justify-center text-center space-y-4">
      <div className="mb-4">
        <RuneGlyph pathD={RUNE_PATHS[5]} size={40} opacity={0.8} />
      </div>
      <h1 className="font-display text-sm sm:text-base text-white uppercase flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-2">
        <div className="flex items-center gap-x-3 tracking-[0.1em]">
          <span>THIS</span><span>TIMELINE</span>
        </div>
        <div className="flex items-center gap-x-3 tracking-[0.1em]">
          <span>DOES</span><span>NOT</span><span>EXIST</span>
        </div>
      </h1>
      <p className="text-xs text-muted">
        The path you followed unravels into nothing.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex border border-white/60 px-8 py-4 no-radius font-display text-[0.65rem] uppercase hover:border-white hover:text-white transition-all group"
      >
        <div className="flex items-center justify-center gap-x-3 tracking-[0.12em]">
          <span>RETURN</span><span>TO</span><span>THE</span><span>LOOP</span>
        </div>
      </a>
    </div>
  );
}

