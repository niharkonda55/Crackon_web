import { organizers } from "../data/organizers.js";
import { RuneGlyph, RUNE_PATHS } from "../components/DarkCTFIntro.jsx";

export function OrganizersPage() {
  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-8">
        <h1 className="font-display text-[1.4rem] sm:text-2xl text-white uppercase flex items-center justify-center gap-x-3">
          <span>THE</span><span>ORGANIZERS</span>
        </h1>
        <p className="mt-2 text-xs text-muted">THE ONES WHO TIED THE KNOT</p>
      </header>

      <main className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {organizers.map((org) => (
            <article
              key={org.id}
              className="border border-border bg-surface px-4 py-4 no-radius flex flex-col"
            >
              <div className="w-full aspect-square border border-border no-radius mb-3 flex items-center justify-center relative overflow-hidden">
                {org.photo ? (
                  <img
                    src={org.photo}
                    alt={org.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-3 opacity-20">
                      <RuneGlyph
                        pathD={RUNE_PATHS[org.rune % RUNE_PATHS.length]}
                        size={80}
                        opacity={0.4}
                      />
                    </div>
                    <span className="relative font-display text-sm tracking-[0.3em] text-white">
                      {org.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </span>
                  </>
                )}
              </div>
              <h2 className="font-display text-[0.65rem] tracking-[0.1em] uppercase text-white">
                {org.name}
              </h2>
              <p className="font-mono text-[0.6rem] text-accent tracking-[0.12em] uppercase mt-1">
                {org.role}
              </p>
              <div className="mt-2 flex gap-3 text-[0.75rem] text-muted">
                {org.github && (
                  <a href={org.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {org.linkedin && (
                  <a href={org.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                )}
                {org.twitter && (
                  <a href={org.twitter} target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                )}
              </div>
              <div className="mt-3 border-t border-border pt-2 text-[0.7rem] text-muted font-mono">
                {org.bio}
              </div>
            </article>
          ))}
        </div>

        <section className="text-center mt-10">
          <p className="font-display text-[0.65rem] tracking-[0.08em] text-white uppercase mb-3">
            <div className="flex items-center justify-center gap-x-3">
              <span>WANT</span><span>TO</span><span>CONTRIBUTE?</span>
            </div>
          </p>
          <p className="text-[0.7rem] text-muted mb-4">
            Reach out if you want to author challenges or help organize the next loop.
          </p>
          <a
            href="/contact"
            className="inline-flex border border-white/60 px-8 py-4 no-radius font-display text-[0.6rem] uppercase hover:border-white hover:text-white transition-all group"
          >
            <div className="flex items-center justify-center gap-x-3 tracking-[0.12em]">
              <span>GET</span><span>IN</span><span>TOUCH</span>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}

