import { useState } from "react";
import { motion } from "framer-motion";
import { InfinityLoader } from "./DarkCTFIntro.jsx";

export function TerminalInput({ onSubmit, placeholder = "ENTER FLAG" }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("idle"); // idle | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim() || !onSubmit) return;
    setLoading(true);
    setState("idle");
    try {
      const ok = await onSubmit(value.trim());
      setState(ok ? "success" : "error");
    } finally {
      setLoading(false);
      if (state !== "success") {
        setTimeout(() => setState("idle"), 800);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mt-4 border border-border bg-surface no-radius px-3 py-2 flex items-center gap-2"
      animate={
        state === "error"
          ? {
            x: [0, -8, 8, -4, 4, 0]
          }
          : { x: 0 }
      }
      transition={{ duration: 0.4 }}
    >
      <span className="font-mono text-xs text-muted">{">_"}</span>
      <input
        className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-text placeholder:text-muted"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Flag submission input"
      />
      <button
        type="submit"
        disabled={loading}
        className="border border-white/40 text-[0.6rem] tracking-[0.12em] uppercase px-4 py-1.5 no-radius font-display text-white hover:border-white transition-colors disabled:opacity-60"
      >
        {loading ? <InfinityLoader size={24} duration={1200} /> : "SUBMIT"}
      </button>
    </motion.form>
  );
}

