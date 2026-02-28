import { Link } from "react-router-dom";
import { config } from "../data/config.js";
import { TriquetraIcon } from "../components/TriquetraIcon.jsx";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* Left */}
        <div className="space-y-4">
          <a href="#hero">
          <div className="flex items-center gap-3">
            <img
              src="/triangle.png"
              alt="Triquetra"
              className="w-12 h-12 object-contain rounded-full p-1 bg-white/10"
            />
            <span className="font-display text-base tracking-[0.35em] uppercase leading-none">
              DAЯK <span className="text-white/40 pl-2">CTF</span>
            </span>
          </div>
          </a>

          <p className="text-sm text-muted">
            Every end is a beginning.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted">
            <a
              href={config.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Discord
            </a>
            <a
              href={config.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Center */}
        <div>
          <h3 className="font-display text-xs tracking-[0.35em] text-muted uppercase mb-4">
            N A V I G A T E
          </h3>

          <nav className="flex flex-col gap-3 text-sm text-muted">
            <a href="#about" className="hover:text-white transition">ABOUT</a>
            <a href="#domains" className="hover:text-white transition">DOMAINS</a>
            <a href="#sponsors" className="hover:text-white transition">SPONSORS</a>
            <a href="#team" className="hover:text-white transition">TEAM</a>
            <a href="#contact" className="hover:text-white transition">CONTACT</a>
          </nav>
        </div>

        {/* Right */}
        <div>
          <h3 className="font-display text-xs tracking-[0.35em] text-muted uppercase mb-4">
            T H E K N O T
          </h3>

          <div className="space-y-2 text-sm text-muted">
            <p>Start: {new Date(config.startTime).toUTCString()}</p>
            <p>End: {new Date(config.endTime).toUTCString()}</p>
            <p>Flag format: {config.flagFormat}</p>
            <p className="text-xs text-white/40 pt-2">
              Powered by your CTF backend.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 sm:px-6 py-4 text-xs text-muted flex items-center justify-between">
        <span>© 2026 DARK CTF. ALL RIGHTS RESERVED.</span>
        <span>BUILT IN THE LOOP</span>
      </div>
    </footer>
  );
}