import Hero from "../components/Hero.jsx";
import SaleCta from "../components/SaleCta.jsx";
import { ARTICLES } from "../content/articles.js";

const REASONS = [
  {
    title: "Tam eşleşen isim",
    text: "Varikosel, hastalığın Türkçedeki adının kendisidir. Hastalar ve aileleri bilgi ararken bu kelimeyi yazar.",
  },
  {
    title: "Kısa ve akılda kalıcı",
    text: "Tek kelime, yazımı kolay. Telefonda söylendiğinde ya da kartvizitte görüldüğünde karışmaz.",
  },
  {
    title: "Kimler için uygun?",
    text: "Üroloji ve androloji klinikleri, girişimsel radyoloji merkezleri, hastaneler ve sağlık içerik yayıncıları.",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section aria-labelledby="neden" className="mx-auto max-w-6xl px-5 pt-8">
        <h2 id="neden" className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Neden varikosel.net?
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {REASONS.map((r) => (
            <li key={r.title} className="rounded-2xl border border-border bg-card/60 p-6">
              <h3 className="font-medium text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="rehber" className="mx-auto max-w-6xl px-5 pt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
          Bilgilendirme
        </p>
        <h2 id="rehber" className="mt-2 scroll-mt-24 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Varikosel rehberi
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Varikosel, testisleri saran toplardamarların genişlemesidir ve erkeklerin
          yaklaşık yüzde 15'inde görülür. Çoğu zaman zararsızdır. Bazı erkeklerde ise
          ağrıya, testiste küçülmeye ya da sperm değerlerinde bozulmaya yol açabilir.
          Aşağıdaki sayfalarda varikoselin ne olduğunu, belirtilerini, tanı ve tedavi
          seçeneklerini uluslararası üroloji kılavuzlarına dayanarak sade bir dille
          anlatıyoruz.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <a
                href={`/${a.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card/60 p-6 transition hover:border-primary/50"
              >
                <h3 className="font-serif text-xl font-medium text-foreground">
                  {a.navTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {a.summary}
                </p>
                <span className="mt-4 inline-block text-sm text-primary">
                  Oku <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          Bu bilgiler genel bilgilendirme amaçlıdır ve tıbbi tanı ya da tedavinin
          yerine geçmez.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-24">
        <SaleCta />
      </div>
    </main>
  );
}
