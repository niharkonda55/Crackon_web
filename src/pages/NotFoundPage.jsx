import { RuneGlyph, RUNE_PATHS } from "../components/DarkCTFIntro.jsx";

export function NotFoundPage() {
  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text flex flex-col items-center justify-center text-center space-y-4">
      <div className="mb-4">
        <RuneGlyph pathD={RUNE_PATHS[5]} size={40} opacity={0.8} />
      </div>
      <h1 className="font-display text-sm sm:text-base tracking-[0.4em] uppercase text-white">
        T H I S  T I M E L I N E  D O E S  N O T  E X I S T
      </h1>
      <p className="text-xs text-muted">
        The path you followed unravels into nothing.
      </p>
      <a
        href="#hero"
        className="mt-4 inline-flex border border-white/60 px-6 py-3 no-radius font-display text-[0.65rem] tracking-[0.4em] uppercase hover:border-white hover:text-white"
      >
        R E T U R N  T O  T H E  L O O P
      </a>
    </div>
  );
}

