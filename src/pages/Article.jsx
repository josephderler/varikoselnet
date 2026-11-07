import ArticleBody from "../components/ArticleBody.jsx";
import SaleCta from "../components/SaleCta.jsx";
import { ARTICLES } from "../content/articles.js";
import { SITE, SOURCES, slugify } from "../site.js";

function readingMinutes(article) {
  const text = article.blocks
    .map((b) =>
      b.text ??
      (b.items
        ? b.items.map((x) => (typeof x === "string" ? x : `${x.q} ${x.a}`)).join(" ")
        : (b.rows ?? []).flat().join(" ")),
    )
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 180));
}

export default function Article({ article }) {
  const headings = article.blocks.filter((b) => b.type === "h2");
  const related = article.related
    .map((s) => ARTICLES.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-5 pb-8 pt-28">
      <nav aria-label="Konum" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <a href="/" className="hover:text-foreground">
              Ana sayfa
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {article.navTitle}
          </li>
        </ol>
      </nav>

      <article className="mt-8">
        <header>
          <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-5xl">
            {article.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {article.lead}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Son güncelleme:{" "}
            <time dateTime={SITE.updatedISO}>{SITE.updatedText}</time> · Okuma
            süresi yaklaşık {readingMinutes(article)} dakika
          </p>
        </header>

        {headings.length >= 3 ? (
          <nav
            aria-label="Bu sayfada"
            className="mt-8 rounded-2xl border border-border bg-card/60 p-5"
          >
            <p className="text-sm font-semibold text-foreground">Bu sayfada</p>
            <ul className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
              {headings.map((h) => (
                <li key={h.text}>
                  <a href={`#${slugify(h.text)}`} className="hover:text-foreground">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <ArticleBody blocks={article.blocks} />

        <aside
          role="note"
          className="mt-12 rounded-xl border border-border bg-card/60 p-5 text-sm leading-relaxed text-muted-foreground"
        >
          <strong className="text-foreground">Tıbbi bilgilendirme notu: </strong>
          Bu sayfa genel bilgilendirme amaçlıdır ve tıbbi tanı ya da tedavinin
          yerine geçmez. İçerik, aşağıdaki kaynaklardaki genel bilgilerin sade bir
          özetidir ve kişiye özel bir hekim değerlendirmesi değildir. Şikayetleriniz
          için bir üroloji uzmanına başvurun.
        </aside>

        <section aria-labelledby="kaynaklar" className="mt-8">
          <h2 id="kaynaklar" className="text-sm font-semibold text-foreground">
            Kaynaklar
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {article.sources.map((k) => (
              <li key={k}>
                <a
                  href={SOURCES[k].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  {SOURCES[k].label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <div className="mt-14">
        <SaleCta compact />
      </div>

      {related.length ? (
        <section aria-labelledby="ilgili" className="mt-14">
          <h2 id="ilgili" className="font-serif text-2xl font-medium text-foreground">
            İlgili konular
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <a
                  href={`/${r.slug}`}
                  className="block h-full rounded-2xl border border-border bg-card/60 p-5 transition hover:border-primary/50"
                >
                  <span className="font-medium text-foreground">{r.navTitle}</span>
                  <span className="mt-2 block text-sm text-muted-foreground">
                    {r.summary}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
