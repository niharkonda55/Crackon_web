import { useState, useEffect } from "react";

const links = [
  // { href: "#hero", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#domains", label: "DOMAINS" },
  { href: "#sponsors", label: "SPONSORS" },
  { href: "#team", label: "TEAM" },
  { href: "#contact", label: "CONTACT" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#hero");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveHref(`#${id}`);
          }
        });
      },
      { rootMargin: "-55% 0px -40% 0px", threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => (e) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b border-white/10 ${scrolled ? "backdrop-blur-md bg-black/60" : "bg-black/85"
          }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <div className="flex h-16 items-center justify-between gap-4">

            {/* Left spacer */}
            <div className="w-12" />

            {/* Center Heading */}
            <a
              href="/"
              className="font-display text-2xl uppercase text-white leading-none"
            >
              <div className="flex items-center gap-x-4 tracking-[0.2em]">
                <span>DAЯK</span>
                <span className="text-white/70">CTF</span>
              </div>
            </a>

            {/* Logo */}
            <img
              src="/triangle.png"
              alt="Triquetra"
              className="w-12 h-12 object-contain rounded-full p-1 bg-white/10"
            />
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center justify-center gap-12 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`font-display text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-300 ${activeHref === link.href
                  ? "text-white"
                  : "text-white/50 hover:text-white"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile nav */}
      <nav className="md:hidden fixed top-16 left-0 right-0 z-30 bg-black/85 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick(link.href)}
              className={`font-display text-[0.65rem] tracking-[0.12em] uppercase ${activeHref === link.href
                  ? "text-white"
                  : "text-white/50 hover:text-white"
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}