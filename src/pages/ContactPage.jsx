import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfinityLoader } from "../components/DarkCTFIntro.jsx";
import { config } from "../data/config.js";

const SUBJECTS = [
  "GENERAL INQUIRY",
  "SPONSORSHIP",
  "CHALLENGE SUBMISSION",
  "BUG REPORT",
  "OTHER"
];

const faqs = [
  {
    q: "Can I participate solo?",
    a: "Yes. The loop welcomes solo travelers and full teams alike."
  },
  {
    q: "What skill level is required?",
    a: "You should be comfortable with basic security concepts, but there will be threads for beginners and experts."
  },
  {
    q: "Will there be writeups after the CTF?",
    a: "Yes. Once the loop closes, we encourage detailed writeups from organizers and players."
  },
  {
    q: "How is scoring calculated?",
    a: "Dynamic scoring: each solve slightly weakens the value of that thread over time."
  }
];

export function ContactPage() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("idle"); // idle | success | error
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setState("idle");
    setTimeout(() => {
      setLoading(false);
      setState("success");
      setTimeout(() => setState("idle"), 1200);
    }, 1000);
  };

  return (
    <div className="pt-24 px-4 pb-16 min-h-screen bg-bg text-text">
      <header className="mx-auto max-w-4xl text-center mb-10">
        <h1 className="font-display text-[1.4rem] sm:text-2xl text-white uppercase flex items-center justify-center gap-x-3">
          <span>C</span><span>O</span><span>N</span><span>T</span><span>A</span><span>C</span><span>T</span>
        </h1>
        <p className="mt-3 text-xs tracking-tight text-muted uppercase">SEND A MESSAGE THROUGH THE LOOP</p>
      </header>

      <main className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[3fr,2fr]">
        {/* Form */}
        <section>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-2">
                NAME
              </label>
              <input
                type="text"
                required
                placeholder="YOUR NAME"
                className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-2">
                EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="YOUR EMAIL"
                className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-2">
                SUBJECT
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none appearance-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="absolute right-1 top-2 text-xs text-muted pointer-events-none">
                  ˅
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-2">
                MESSAGE
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="YOUR MESSAGE"
                className="w-full bg-bg border-b border-white/20 px-1 py-2 text-xs font-mono text-text outline-none resize-none"
              />
              <div className="mt-1 text-[0.6rem] text-muted text-right">
                {message.length} / 1000
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full border border-white/60 px-4 py-4 no-radius font-display text-[0.6rem] uppercase text-white/80 hover:border-white hover:text-white disabled:opacity-60 transition-all group"
            >
              <div className="flex items-center justify-center gap-x-3 tracking-[0.12em]">
                {loading ? (
                  <InfinityLoader size={24} duration={1200} />
                ) : state === "success" ? (
                  <span>MESSAGE SENT</span>
                ) : (
                  <>
                    <span>SEND</span><span>THROUGH</span><span>THE</span><span>LOOP</span>
                  </>
                )}
              </div>
            </motion.button>
            <p className="text-[0.7rem] text-muted">
              We usually respond within 24–48 hours.
            </p>
          </form>
        </section>

        {/* Info + FAQ */}
        <section className="space-y-6">
          <div className="space-y-3">
            <InfoBlock label="E M A I L" value={config.contactEmail} href={`mailto:${config.contactEmail}`} />
            <InfoBlock label="D I S C O R D" value={config.discordUrl} href={config.discordUrl} />
            <InfoBlock label="T W I T T E R" value="@darkctf" href={config.twitterUrl} />
            <InfoBlock label="C T F T I M E" value="Event page" href={config.ctftimeUrl} />
          </div>

          <div className="border-t border-border pt-4">
            <h2 className="font-display text-[0.6rem] tracking-[0.08em] text-muted uppercase mb-4">
              FREQUENT QUESTIONS
            </h2>
            <div className="space-y-2">
              {faqs.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={item.q} className="border-b border-border pb-2">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-xs text-text"
                    >
                      <span>{item.q}</span>
                      <span className="text-muted text-sm">
                        {open ? "×" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.p
                          className="mt-1 text-[0.7rem] text-muted"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {item.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoBlock({ label, value, href }) {
  return (
    <div className="border-l border-accent pl-3">
      <p className="font-display text-[0.6rem] tracking-[0.12em] text-muted uppercase mb-1">
        {label.replace(/\s+/g, "")}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-text hover:text-white"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs font-mono text-text">{value}</p>
      )}
    </div>
  );
}

