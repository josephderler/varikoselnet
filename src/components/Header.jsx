import { SITE } from "../site.js";

const NAV = [
  { href: "/varikosel-nedir", label: "Varikosel nedir?" },
  { href: "/varikosel-belirtileri", label: "Belirtiler" },
  { href: "/varikosel-tedavisi", label: "Tedavi" },
  { href: "/sik-sorulan-sorular", label: "SSS" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="/" className="flex items-center gap-2" aria-label="varikosel.net ana sayfa">
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            varikosel<span className="text-primary">.net</span>
          </span>
          <span className="hidden rounded-full border border-primary/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary sm:inline">
            satılık
          </span>
        </a>
        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Teklif ver
        </a>
      </div>
    </header>
  );
}
