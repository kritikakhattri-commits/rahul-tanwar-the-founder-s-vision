import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Ventures" },
  { href: "#journey", label: "Journey" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/70 shadow-[0_12px_36px_-30px_var(--secondary-dark)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-150 group-hover:bg-accent-warm" />
          <span className="font-display text-2xl leading-none">Rahul Tanwar</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-[11px] font-medium tracking-[0.14em] uppercase text-ink-soft hover:text-primary transition-colors group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-warm transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex ghost-btn !py-2.5 !px-4 text-[10px]">
          <span>Get in touch</span>
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 bg-background border-b border-border shadow-[0_18px_46px_-36px_var(--secondary-dark)] ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-8 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl leading-none"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
