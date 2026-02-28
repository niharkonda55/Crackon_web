import { sponsors } from "../data/sponsors.js";

export function SponsorsPage() {
  const title = sponsors.filter((s) => s.tier === "title");
  const gold = sponsors.filter((s) => s.tier === "gold");
  const supporter = sponsors.filter((s) => s.tier === "supporter");

  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-8">
        <h1 className="font-display text-[1.4rem] sm:text-2xl tracking-[0.6em] uppercase text-white">
          S P O N S O R S
        </h1>
        <p className="mt-2 text-xs text-muted">THOSE WHO HOLD THE THREAD</p>
      </header>

      <main className="mx-auto max-w-5xl space-y-10">
        {/* Title sponsor */}
        {title.length > 0 && (
          <section>
            <h2 className="font-display text-xs tracking-[0.4em] text-accent uppercase mb-4">
              T I T L E  S P O N S O R
            </h2>
            <div className="border-y border-accent/40 py-6 flex flex-col items-center gap-4">
              {title.map((s) => (
                <div key={s.id} className="text-center">
                  <div className="mb-3">
                    <div className="inline-flex">
                      <div className="px-4 py-3 border border-white/40 no-radius">
                        <span className="text-xl text-white/80">
                          {s.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted font-mono">{s.tagline}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gold sponsors */}
        {gold.length > 0 && (
          <section>
            <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-4">
              G O L D  S P O N S O R S
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {gold.map((s) => (
                <div key={s.id} className="text-center border border-border px-4 py-6 no-radius">
                  <div className="text-sm text-white/80 mb-2">{s.name}</div>
                  <p className="text-[0.7rem] text-muted font-mono">{s.tagline}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Supporters */}
        {supporter.length > 0 && (
          <section>
            <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-4">
              S U P P O R T E R S
            </h2>
            <div className="grid gap-4 sm:grid-cols-5 text-center text-[0.7rem] text-muted">
              {supporter.map((s) => (
                <div key={s.id} className="border border-border px-2 py-3 no-radius">
                  {s.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Become sponsor */}
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-2 text-center">
            J O I N  T H E  K N O T
          </h2>
          <p className="text-xs text-muted text-center mb-6">
            Support the next generation of security researchers entangled in the loop.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="text-xs text-text font-mono leading-6">
              DARK CTF brings together students, professionals, and explorers from multiple
              timelines. Your support keeps the loop alive — funding infrastructure, prizes,
              and the stories that bind each challenge together.
            </p>
            <div className="text-xs text-muted font-mono space-y-2">
              <div className="grid grid-cols-3 gap-y-1">
                <span>Title</span>
                <span>High</span>
                <span>Branding, talks, full visibility</span>
                <span>Gold</span>
                <span>Medium</span>
                <span>Brand presence, challenge slots</span>
                <span>Supporter</span>
                <span>Lower</span>
                <span>Logo placement, thanks in closing</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href="/contact"
              className="inline-flex border border-white/60 px-6 py-3 no-radius font-display text-[0.65rem] tracking-[0.4em] uppercase hover:border-white hover:text-white"
            >
              C O N T A C T  U S  T O  S P O N S O R
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

