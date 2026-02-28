import { useState, useEffect, useRef } from "react";

/*
  DARK CTF — Intro Sequence
  ─────────────────────────
  Phase 1: ∞ loader draws itself (0→100%)
  Phase 2: 16 hand-drawn DARK-cipher rune glyphs spin in a ring (rotating slowly)
  Phase 3: Ring collapses inward, runes vanish
  Phase 4: "DARK CTF" assembles letter by letter from center
  Phase 5: Title rises to navbar, site content fades in
*/

// ─── Each rune is an SVG path drawn in a ~40×40 viewBox ──────────────────────
// These are hand-crafted to match the looping/angular DARK cipher style
const RUNE_PATHS = [
  // Rune 0 — loop-top with legs
  "M20,8 C26,8 30,12 28,17 C26,22 20,22 20,22 C20,22 14,22 12,17 C10,12 14,8 20,8 Z M16,22 L13,32 M24,22 L27,32",
  // Rune 1 — zigzag lightning
  "M14,8 L20,14 L14,20 L22,26 L16,32",
  // Rune 2 — loop with tail
  "M20,10 C26,10 30,15 26,20 C22,25 16,23 16,23 L14,32 M26,20 L30,28",
  // Rune 3 — double loop
  "M14,10 C14,10 10,14 14,18 C18,22 22,18 22,18 C22,18 26,22 22,26 C18,30 14,26 16,28",
  // Rune 4 — angular K-like
  "M14,8 L14,32 M14,20 L24,10 M14,20 L26,32",
  // Rune 5 — loop top + cross
  "M20,8 C28,8 30,16 24,18 C18,20 14,16 16,12 M12,22 L28,22 M20,18 L20,32",
  // Rune 6 — figure with arms
  "M20,8 C25,8 28,13 24,16 C20,19 16,16 18,12 M14,16 L12,24 L20,20 L28,24 L26,16",
  // Rune 7 — reversed loop
  "M26,10 C26,10 30,14 26,18 C22,22 16,20 16,20 L12,28 M16,20 L14,32",
  // Rune 8 — cross-knot
  "M16,10 L24,10 L20,18 L28,22 L20,26 L12,22 L20,18 M20,26 L20,32",
  // Rune 9 — tall loop with feet
  "M20,6 C27,6 32,12 28,18 C24,24 16,22 16,22 L12,30 M16,22 L28,30",
  // Rune 10 — angular N
  "M13,8 L13,32 M13,8 L25,26 M25,8 L25,32",
  // Rune 11 — small loop + descender
  "M20,10 C24,10 27,14 24,17 C21,20 17,18 17,18 L15,28 C15,32 20,34 24,30",
  // Rune 12 — lollipop rune
  "M20,8 C26,8 30,14 24,18 C18,22 14,18 16,13 M20,18 L20,32 M16,28 L24,28",
  // Rune 13 — wave
  "M10,20 C14,12 18,28 22,20 C26,12 30,28 34,20",
  // Rune 14 — V with loop
  "M14,8 L20,22 L26,8 M20,22 C20,22 14,26 14,30 C14,34 20,34 20,34 C20,34 26,34 26,30 C26,26 20,22 20,22",
  // Rune 15 — angular R-like
  "M13,8 L13,32 M13,8 L25,8 C30,8 32,13 28,17 C25,20 13,20 13,20 L26,32",
];

// ─── Lemniscate (∞) Loader ───────────────────────────────────────────────────
function InfinityLoader({ size = 55, duration = 2800, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const t0 = useRef(null),
    raf = useRef(null);

  useEffect(() => {
    t0.current = performance.now();
    const tick = (now) => {
      const t = Math.min((now - t0.current) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else {
        setDone(true);
        onComplete?.();
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const W = size * 2.4,
    H = size;
  const cx = W / 2,
    cy = H / 2,
    a = size * 0.42;

  const pt = (t) => {
    const d = 1 + Math.sin(t) * Math.sin(t);
    return {
      x: cx + (a * Math.cos(t)) / d,
      y: cy + (a * Math.sin(t) * Math.cos(t)) / d,
    };
  };
  const buildPath = (end, steps) => {
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const p = pt((end * i) / steps);
      d +=
        i === 0
          ? `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
          : ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }
    return d;
  };

  const endT = Math.PI * 2 * progress;
  const dotPos = pt(endT);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: done ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ overflow: "visible" }}
      >
        <path
          d={buildPath(Math.PI * 2, 300) + " Z"}
          fill="none"
          stroke="#1e1e1e"
          strokeWidth="0.8"
        />
        {progress > 0.005 && (
          <path
            d={buildPath(endT, 300)}
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
            }}
          />
        )}
        {progress > 0.005 && progress < 0.995 && (
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
            r="2.2"
            fill="white"
            style={{
              filter: "drop-shadow(0 0 6px white)",
            }}
          />
        )}
      </svg>
      <span
        style={{
          fontFamily: "Raleway,sans-serif",
          fontWeight: 100,
          fontSize: 14,
          letterSpacing: "0.45em",
          color: "#888",
        }}
      >
        {Math.round(progress * 100)} %
      </span>
    </div>
  );
}

// ─── Single Rune SVG ─────────────────────────────────────────────────────────
function RuneGlyph({ pathD, size = 38, opacity = 0.85 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{
        overflow: "visible",
        filter: `drop-shadow(0 0 3px rgba(255,255,255,${opacity * 0.5}))`,
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={`rgba(200,200,200,${opacity})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Spinning Rune Ring ───────────────────────────────────────────────────────
function RuneRing({ onDone }) {
  const [ringAngle, setRingAngle] = useState(0);
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const raf = useRef(null);
  const t0 = useRef(performance.now());
  const DURATION = 1800;

  useEffect(() => {
    const tick = (now) => {
      const elapsed = now - t0.current;
      const t = Math.min(elapsed / DURATION, 1);

      // Ring grows in, spins, then collapses
      if (t < 0.3) {
        // grow in
        const p = t / 0.3;
        setScale(p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p);
        setOpacity(p);
        setRingAngle(elapsed * 0.04);
      } else if (t < 0.75) {
        // hold + spin
        setScale(1);
        setOpacity(1);
        setRingAngle(elapsed * 0.04);
      } else {
        // collapse
        const p = (t - 0.75) / 0.25;
        setScale(1 - p);
        setOpacity(1 - p);
        setRingAngle(elapsed * 0.04);
      }

      if (t < 1) raf.current = requestAnimationFrame(tick);
      else onDone?.();
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const COUNT = 16;
  const RADIUS = 130;

  return (
    <div
      style={{
        position: "relative",
        width: RADIUS * 2 + 80,
        height: RADIUS * 2 + 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Faint ring guide circle */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <circle
          cx="50%"
          cy="50%"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        {/* Inner ring */}
        <circle
          cx="50%"
          cy="50%"
          r={RADIUS * 0.65}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Runes placed on ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale}) rotate(${ringAngle}deg)`,
          opacity,
          transition: "none",
        }}
      >
        {Array.from({ length: COUNT }).map((_, i) => {
          const angle = (360 / COUNT) * i;
          const rad = (angle * Math.PI) / 180;
          const cx =
            50 + ((RADIUS / (RADIUS * 2 + 80)) * 100 * Math.cos(rad - Math.PI / 2));
          const cy =
            50 + ((RADIUS / (RADIUS * 2 + 80)) * 100 * Math.sin(rad - Math.PI / 2));
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${cx}%`,
                top: `${cy}%`,
                transform: `translate(-50%,-50%) rotate(${angle}deg)`,
              }}
            >
              <RuneGlyph
                pathD={RUNE_PATHS[i % RUNE_PATHS.length]}
                size={32}
                opacity={0.7 + ((i % 3) * 0.1)}
              />
            </div>
          );
        })}
      </div>

      {/* 100% counter in center while ring shows */}
      <div
        style={{
          position: "absolute",
          fontFamily: "Raleway,sans-serif",
          fontWeight: 100,
          fontSize: 11,
          letterSpacing: "0.4em",
          color: "#555",
          opacity,
        }}
      >
        100 %
      </div>
    </div>
  );
}

// ─── Main Exported Component ─────────────────────────────────────────────────
export default function DarkCTFIntro({ onComplete }) {
  const [phase, setPhase] = useState("loading"); // loading|ring|letters|rise|done
  const [loaderKey, setLoaderKey] = useState(0);
  const restart = () => {
    setPhase("loading");
    setLoaderKey((k) => k + 1);
  };

  useEffect(() => {
    if (phase === "letters") {
      const t = setTimeout(() => setPhase("rise"), 2000);
      return () => clearTimeout(t);
    }
    if (phase === "rise") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete?.();
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300&display=swap');

        .dci-wrap::after {
          content:'';
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity:0.5;
        }

        @keyframes dci-letterIn {
          0%   { opacity:0; transform:scale(3) translateY(12px); filter:blur(12px); }
          100% { opacity:1; transform:scale(1) translateY(0);    filter:blur(0); }
        }
        @keyframes dci-riseUp {
          0%   { transform:translate(-50%,-50%) scale(1); 
                 font-size: clamp(28px,5vw,52px); letter-spacing:0.5em; }
          100% { transform:translate(-50%,-500%) scale(1);
                 font-size: 14px; letter-spacing:0.45em; }
        }
        @keyframes dci-navLock {
          from { opacity:0; transform:translateX(-50%) translateY(-6px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes dci-glow {
          0%,100% { text-shadow: 0 0 30px rgba(255,255,255,0.08); }
          50%     { text-shadow: 0 0 60px rgba(255,255,255,0.18); }
        }
        @keyframes dci-blob {
          0%,100% { transform:scale(1) translate(0,0); opacity:0.07; }
          50%     { transform:scale(1.1) translate(10px,-8px); opacity:0.13; }
        }
      `}</style>

      <div
        className="dci-wrap"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          fontFamily: "Raleway,sans-serif",
        }}
      >
        {/* Ambient blobs */}
        {[
          { l: "25%", t: "15%", w: 300, h: 300, delay: "0s", dur: "14s" },
          { l: "55%", t: "50%", w: 240, h: 240, delay: "5s", dur: "18s" },
          { l: "40%", t: "65%", w: 200, h: 200, delay: "9s", dur: "12s" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.l,
              top: b.t,
              width: b.w,
              height: b.h,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(40,40,80,0.15) 0%, transparent 70%)",
              animation: `dci-blob ${b.dur} ease-in-out infinite`,
              animationDelay: b.delay,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ))}

        {/* ── Phase: loading ── */}
        {phase === "loading" && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <InfinityLoader
              key={loaderKey}
              size={60}
              duration={3000}
              onComplete={() => setTimeout(() => setPhase("ring"), 200)}
            />
          </div>
        )}

        {/* ── Phase: ring — DARK rune ring spins then collapses ── */}
        {phase === "ring" && (
          <div style={{ position: "relative", zIndex: 1 }}>
            <RuneRing onDone={() => setPhase("letters")} />
          </div>
        )}

        {/* ── Phase: letters — DARK CTF assembles ── */}
        {phase === "letters" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: "flex",
              alignItems: "baseline",
              gap: "0.6em",
              fontWeight: 100,
              fontSize: "clamp(28px,5vw,52px)",
              letterSpacing: "0.5em",
              color: "white",
              zIndex: 2,
              animation: "dci-glow 3s ease-in-out infinite",
            }}
          >
            {/* DARK letters with reversed R */}
            {"DAЯK".split("").map((l, i) => (
              <span
                key={l + i}
                style={{
                  display: "inline-block",
                  animation: `dci-letterIn 0.8s cubic-bezier(0.16,1,0.3,1) ${
                    i * 0.1
                  }s both`,
                }}
              >
                {l}
              </span>
            ))}
            {/* CTF same scale as DAЯK */}
            <span
              style={{
                letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.8)",
                marginLeft: "0.6em",
                alignSelf: "center",
                animation:
                  "dci-letterIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both",
              }}
            >
              CTF
            </span>
          </div>
        )}

        {/* ── Phase: rise — title slides up to nav ── */}
        {phase === "rise" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontWeight: 100,
              fontSize: "clamp(28px,5vw,52px)",
              letterSpacing: "0.5em",
              color: "white",
              whiteSpace: "nowrap",
              zIndex: 3,
              animation:
                "dci-riseUp 1.1s cubic-bezier(0.76,0,0.24,1) forwards",
            }}
          >
            DAЯK{" "}
            <span
              style={{
                letterSpacing: "0.5em",
                color: "rgba(255,255,255,0.8)",
                verticalAlign: "middle",
              }}
            >
              CTF
            </span>
          </div>
        )}

        {/* ── Phase: done — locked in navbar ── */}
        {phase === "done" && (
          <>
            <div
              style={{
                position: "absolute",
                top: 50,
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                left: "50%",
                fontWeight: 100,
                fontSize: 14,
                letterSpacing: "0.45em",
                color: "white",
                whiteSpace: "nowrap",
                animation: "dci-navLock 0.5s ease both",
                zIndex: 4,
              }}
            >
              DAЯK CTF
            </div>
          </>
        )}

        {/* Replay */}
        <button
          onClick={restart}
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            background: "none",
            border: "1px solid #1e1e1e",
            color: "#3a3a3a",
            fontFamily: "Raleway,sans-serif",
            fontWeight: 200,
            fontSize: 9,
            letterSpacing: "0.3em",
            padding: "7px 18px",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.3s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#555";
            e.currentTarget.style.color = "#999";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#1e1e1e";
            e.currentTarget.style.color = "#3a3a3a";
          }}
        >
          ↺ Replay
        </button>
      </div>
    </>
  );
}

// Export runes and loader for reuse in other components
export { RUNE_PATHS, InfinityLoader, RuneGlyph };

