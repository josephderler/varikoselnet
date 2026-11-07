import { SITE } from "../site.js";

export default function SaleCta({ compact = false }) {
  return (
    <section
      aria-labelledby="satilik-baslik"
      className={`relative overflow-hidden rounded-2xl border border-border bg-card ${compact ? "p-6" : "p-8 md:p-12"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,color-mix(in_oklch,var(--color-primary)_25%,transparent),transparent_60%)]"
      />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
            Alan adı satılık
          </p>
          <h2
            id="satilik-baslik"
            className={`mt-2 font-serif font-medium tracking-tight text-foreground ${compact ? "text-2xl" : "text-3xl md:text-4xl"}`}
          >
            varikosel.net sizin olabilir
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Fiyat teklifle belirlenir. Teklifinizi WhatsApp üzerinden{" "}
            {SITE.whatsappHandle} hesabına iletin.
          </p>
        </div>
        <a
          href={SITE.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:self-auto"
        >
          WhatsApp ile teklif ver
        </a>
      </div>
    </section>
  );
}
