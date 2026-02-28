import { motion } from "framer-motion";
import { CountdownTimer } from "../components/CountdownTimer.jsx";
import { config } from "../data/config.js";

export function EventDetailsPage() {
  return (
    <div className="pt-20 min-h-screen bg-bg text-text">
      {/* Live countdown hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 border-b border-border">
        <motion.p
          className="font-display text-[0.7rem] tracking-[0.4em] text-muted uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          T H E  L O O P  C L O S E S  I N
        </motion.p>
        <CountdownTimer target={config.endTime} />
      </section>

      {/* Details grid */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
          {/* Format */}
          <motion.div
            className="border border-border bg-surface px-6 py-8 no-radius"
            whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="font-display text-xs tracking-[0.35em] text-white uppercase mb-3">
              F O R M A T
            </h3>
            <ul className="space-y-2 text-xs text-text font-mono">
              <li>Competition Type: Online Jeopardy CTF</li>
              <li>Flag Format: {config.flagFormat}</li>
              <li>Scoring: Dynamic (decreases as more teams solve)</li>
              <li>Team Size: 1–{config.maxTeamSize} members</li>
            </ul>
          </motion.div>

          {/* Schedule */}
          <motion.div
            className="border border-border bg-surface px-6 py-8 no-radius"
            whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="font-display text-xs tracking-[0.35em] text-white uppercase mb-3">
              S C H E D U L E
            </h3>
            <ul className="space-y-2 text-xs text-text font-mono">
              <li>Registration Closes: {new Date(config.registrationCloses).toUTCString()}</li>
              <li>Competition Start: {new Date(config.startTime).toUTCString()}</li>
              <li>Competition End: {new Date(config.endTime).toUTCString()}</li>
              <li>Results: {new Date(config.winnersAnnounced).toUTCString()}</li>
            </ul>
          </motion.div>

          {/* Prizes */}
          <motion.div
            className="border border-border bg-surface px-6 py-8 no-radius"
            whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.1)" }}
          >
            <h3 className="font-display text-xs tracking-[0.35em] text-white uppercase mb-3">
              P R I Z E S
            </h3>
            <ul className="space-y-2 text-xs text-text font-mono border-l border-accent pl-3">
              <li>1st Place: Trophy + swag</li>
              <li>2nd Place: Swag</li>
              <li>3rd Place: Swag</li>
              <li>Special Awards: Best Writeup, First Blood per category</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

