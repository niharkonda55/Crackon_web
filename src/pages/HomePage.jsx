import { motion } from "framer-motion";
import { useMemo } from "react";
import { CountdownTimer } from "../components/CountdownTimer.jsx";
import { CategoryBar } from "../components/CategoryBar.jsx";
import { challenges } from "../data/challenges.js";
import { config } from "../data/config.js";
import { organizers } from "../data/organizers.js";
import { sponsors } from "../data/sponsors.js";
import { RUNE_PATHS, RuneGlyph } from "../components/DarkCTFIntro.jsx";

export function HomePage() {
  const categoryCounts = useMemo(() => {
    const map = {};
    challenges.forEach((c) => {
      map[c.category] = (map[c.category] || 0) + 1;
    });
    return map;
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-bg text-text">
      {/* Hero */}
      <motion.section
        id="hero"
        className="min-h-[90vh] flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative text-center space-y-4">
          <motion.p
            className="font-display text-xs tracking-[0.5em] text-muted uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            T H E  C Y C L E  B E G I N S
          </motion.p>
          <motion.h1
            className="font-display text-[10vw] sm:text-[5vw] tracking-[0.55em] text-white uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            T H E  K N O T
          </motion.h1>
          <motion.h2
            className="font-display text-[8vw] sm:text-[4vw] tracking-[0.55em] text-white/70 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            I S  T I E D
          </motion.h2>
          <motion.p
            className="font-display text-xs sm:text-sm tracking-[0.4em] text-accent uppercase mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            A R E  Y O U  R E A D Y ?
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <a
              href="#domains"
              className="inline-flex items-center border border-white/60 px-6 py-3 no-radius font-display text-[0.65rem] tracking-[0.4em] uppercase hover:border-white hover:text-white transition-colors"
            >
              E N T E R  T H E  L O O P
            </a>
          </motion.div>
        </div>

        <div className="mt-16 h-px w-40 bg-white/20" />
        <p className="mt-3 text-[0.6rem] tracking-[0.35em] text-muted uppercase">
          S C R O L L
        </p>
      </motion.section>

      {/* Countdown */}
      <motion.section
        id="event"
        className="border-y border-border py-12 px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.35 }}
      >
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <p className="font-display text-[0.7rem] tracking-[0.4em] text-muted uppercase">
            T I M E  R E M A I N I N G
          </p>
          <CountdownTimer target={config.startTime} />
          <p className="text-[0.7rem] text-muted">
            CTF starts: {new Date(config.startTime).toUTCString()} / ends:{" "}
            {new Date(config.endTime).toUTCString()}
          </p>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        className="py-10 px-4"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-4 text-center">
            {[
              { label: "TEAMS REGISTERED", value: 128 },
              { label: "DOMAINS", value: Object.keys(categoryCounts).length },
              { label: "CHALLENGES", value: challenges.length },
              { label: "PRIZE POOL", value: "$ XXXX" }
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="font-mono text-2xl text-white">{stat.value}</p>
                <p className="font-display text-[0.6rem] tracking-[0.35em] text-muted uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CategoryBar categories={categoryCounts} />
          </div>
        </div>
      </motion.section>

      {/* About / Concept merged */}
      <motion.section
        id="about"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xs tracking-[0.4em] text-accent uppercase mb-4">
              W H A T  I S  T H I S
            </h2>
            <p className="font-mono text-xs leading-7 text-text mb-4">
              DARK CTF is a Capture The Flag competition woven into the
              mythology of time, paradox, and the eternal knot. Every
              challenge is a thread. Pull the wrong one and the loop
              tightens.
            </p>
            <p className="font-mono text-xs leading-7 text-text mb-4">
              Instead of bright dashboards and loud colors, the interface
              pulls you into a quiet, humming anomaly. Flags feel like
              artifacts. Logs, binaries, and packets become echoes from other
              timelines.
            </p>
            <p className="font-mono text-xs leading-7 text-text">
              You will move between web flaws, cryptographic fractures, binary
              ghosts, and open-source traces — all bound together by a single,
              entangled story: the loop never breaks on its own.
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
                  <p className="font-display text-xs tracking-[0.35em] uppercase text-white">
                    {title}
                  </p>
                  <p className="font-mono text-[0.65rem] text-muted mt-1">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Domains instead of challenges */}
      <motion.section
        id="domains"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-2">
              D O M A I N S
            </h2>
            <p className="text-[0.7rem] text-muted">
              Threads you can pull inside the loop.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["WEB", "Unstable web stacks, forgotten panels, misbound sessions."],
              ["PWN", "Processes from another year waiting to be bent to your will."],
              ["CRYPTO", "Ciphers stretched across timelines, keys reused by mistake."],
              ["FORENSICS", "Logs, disks and memory that remember more than they should."],
              ["REVERSE", "Binaries that hide intent behind layers of compiled history."],
              ["OSINT", "Traces left in the open, scattered across networks and time."]
            ].map(([name, desc]) => (
              <motion.article
                key={name}
                className="border border-border bg-surface px-4 py-4 no-radius"
                whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.2)" }}
              >
                <p className="font-display text-xs tracking-[0.35em] text-accent uppercase mb-2">
                  {name}
                </p>
                <p className="font-mono text-[0.7rem] text-muted">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sponsors section (summary) */}
      <motion.section
        id="sponsors"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-2">
            S P O N S O R S
          </h2>
          <p className="text-[0.7rem] text-muted mb-6">
            Those who hold the thread.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {sponsors.map((s) => (
              <motion.article
                key={s.id}
                className="border border-border bg-surface px-4 py-6 no-radius flex flex-col items-center"
                whileHover={{
                  y: -4,
                  borderColor: "rgba(255,255,255,0.3)",
                  boxShadow: "0 0 30px rgba(255,255,255,0.08)"
                }}
              >
                <div className="w-32 h-16 mb-3 bg-[#080808] flex items-center justify-center overflow-hidden no-radius">
                  <span className="text-xs text-white/70">{s.name}</span>
                </div>
                <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-white mb-1">
                  {s.tier.toUpperCase()} SPONSOR
                </p>
                <p className="text-[0.7rem] text-muted font-mono">
                  {s.tagline}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Organizers summary */}
      <motion.section
        id="team"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 text-center">
            <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-2">
              T H E  O R G A N I Z E R S
            </h2>
            <p className="text-[0.7rem] text-muted">
              The ones who tied the knot.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {organizers.map((org) => (
              <motion.article
                key={org.id}
                className="border border-border bg-surface px-4 py-4 no-radius flex flex-col"
                whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.2)" }}
              >
                <div className="w-full aspect-square border border-border no-radius mb-3 flex items-center justify-center relative overflow-hidden">
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
                </div>
                <h3 className="font-display text-xs tracking-[0.25em] uppercase text-white">
                  {org.name}
                </h3>
                <p className="font-mono text-[0.65rem] text-accent tracking-[0.3em] uppercase mt-1">
                  {org.role}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Rules summary */}
      <motion.section
        id="rules"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-4 text-center">
            R U L E S  O F  T H E  K N O T
          </h2>
          <div className="mx-auto max-w-3xl border-l border-accent pl-5 space-y-4">
            {[
              "THE KNOT FORBIDS: sharing flags across timelines (teams).",
              "AUTOMATED TOOLS THAT ATTACK THE LOOP ITSELF are forbidden.",
              "EVERY THREAD YOU PULL MUST BE YOUR OWN — no copying writeups during the event.",
              "ABUSE OF INFRASTRUCTURE OUTSIDE THE LOOP is not allowed."
            ].map((rule, idx) => (
              <div key={idx} className="text-xs text-text">
                <span className="font-display block text-[0.7rem] tracking-[0.3em] text-muted uppercase mb-1">
                  R U L E  {String(idx + 1).padStart(2, "0")}
                </span>
                <p>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact summary */}
      <motion.section
        id="contact"
        className="py-14 px-4 border-t border-border"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[3fr,2fr]">
          <div>
            <h2 className="font-display text-xs tracking-[0.4em] text-white uppercase mb-4">
              C O N T A C T
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-1">
                  N A M E
                </label>
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-1">
                  E M A I L
                </label>
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-1">
                  M E S S A G E
                </label>
                <textarea
                  rows={4}
                  placeholder="YOUR MESSAGE"
                  className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-white/60 px-4 py-3 no-radius font-display text-[0.6rem] tracking-[0.4em] uppercase text-white/80 hover:border-white hover:text-white"
              >
                S E N D  T H R O U G H  T H E  L O O P
              </button>
            </form>
          </div>
          <div className="space-y-3 text-xs text-muted font-mono">
            <p>
              Email:{" "}
              <a
                href={`mailto:${config.contactEmail}`}
                className="text-text hover:text-white"
              >
                {config.contactEmail}
              </a>
            </p>
            <p>
              Discord:{" "}
              <a
                href={config.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="text-text hover:text-white"
              >
                {config.discordUrl}
              </a>
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

