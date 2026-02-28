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
              <span className="font-display text-base uppercase leading-none">
                <div className="flex items-center gap-x-3 tracking-[0.2em]">
                  <span>DAЯK</span>
                  <span className="text-white/40">CTF</span>
                </div>
              </span>
            </div>
          </a>

          <p className="text-sm text-white/70">
            Every end is a beginning.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/70">
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
          <h3 className="font-display text-[0.65rem] tracking-[0.1em] text-white/70 uppercase mb-5">
            <div className="flex items-center gap-x-2">
              <span>N</span><span>A</span><span>V</span><span>I</span><span>G</span><span>A</span><span>T</span><span>E</span>
            </div>
          </h3>

          <nav className="flex flex-col gap-3 text-sm text-white/70">
            <a href="#about" className="hover:text-white transition">ABOUT</a>
            <a href="#domains" className="hover:text-white transition">DOMAINS</a>
            <a href="#sponsors" className="hover:text-white transition">SPONSORS</a>
            <a href="#contact" className="hover:text-white transition">CONTACT</a>
          </nav>
        </div>

        {/* Right */}
        <div>
          <h3 className="font-display text-[0.65rem] tracking-[0.1em] text-white/70 uppercase mb-5">
            <div className="flex items-center gap-x-3">
              <span>THE</span>
              <span>KNOT</span>
            </div>
          </h3>

          <div className="space-y-2 text-sm text-white/70">
            <p>Start: {new Date(config.startTime).toUTCString()}</p>
            <p>End: {new Date(config.endTime).toUTCString()}</p>
            <p>Flag format: {config.flagFormat}</p>
            <p className="text-xs text-white/40 pt-2">
              Powered by your CTF backend.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 sm:px-6 py-4 text-[0.6rem] text-white/70 flex items-center justify-between">
        <span className="tracking-[0.05em]">© 2026 DARK CTF. ALL RIGHTS RESERVED.</span>
        <span className="tracking-[0.1em]">BUILT IN THE LOOP</span>
      </div>
    </footer>
  );
}