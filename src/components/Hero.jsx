// Tasarım uyarlaması: "Coming Soon 2" (Hirael, MIT, Mohammad Shehadeh)
// https://hirael.com/blocks/not-found/coming-soon-02 — 21st.dev üzerinden.
// motion yerine CSS animasyonu kullanıldı; böylece metin önceden üretilen
// HTML'de görünür kalır ve arama motorları için JS gerektirmez.
import Sparkles from "./Sparkles.jsx";
import { SITE } from "../site.js";

// Her satılık alan adı ayrı satırda (soluk), en altta "satılık" (vurgulu).
function Headline() {
  const words = [
    ...SITE.domainsForSale.map((w) => ({ w, muted: true })),
    { w: "satılık", muted: false },
  ];
  return (
    <h1 className="max-w-2xl font-serif text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
      {words.flatMap(({ w, muted }, i) => {
        const el = (
          <span
            key={`${w}-${i}`}
            className={`anim-word inline-block ${muted ? "text-muted-foreground" : "text-foreground"}`}
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            {w}
          </span>
        );
        return i < words.length - 1 ? [el, " ", <br key={`br-${i}`} />] : [el];
      })}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col items-center justify-center overflow-hidden pt-28">
      <div className="anim-fade-up relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-6 text-center md:px-10">
        <span
          className="anim-pop inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm"
          style={{ animationDelay: "300ms" }}
        >
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          İki alan adı satışta · Teklife açık
        </span>

        <Headline />

        <p
          className="anim-fade-in mt-2 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "800ms" }}
        >
          Hastalığın adıyla birebir eşleşen iki alan adı: .net ve Türkiye'ye özel
          .tr uzantısı. Üroloji ve androloji klinikleri, hastaneler ve sağlık
          yayıncıları için. Fiyat sabit değildir, teklifinizi WhatsApp üzerinden
          iletin.
        </p>

        <div
          className="anim-fade-up mt-4 flex flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "1000ms" }}
        >
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--color-primary)] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            WhatsApp ile teklif ver
          </a>
          <a
            href="#rehber"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-card"
          >
            Varikosel rehberini oku
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          WhatsApp: {SITE.whatsappHandle}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,black,transparent)] after:absolute after:-start-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-border after:bg-card after:content-['']"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,color-mix(in_oklch,var(--color-primary)_40%,transparent),transparent_70%)] opacity-40" />
        <Sparkles
          density={4}
          size={1.4}
          className="[mask-image:radial-gradient(50%_50%,black,transparent_85%)]"
        />
      </div>
    </section>
  );
}
