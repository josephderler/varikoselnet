import { ARTICLES } from "../content/articles.js";
import { SITE } from "../site.js";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <a href="/" className="font-serif text-lg font-semibold text-foreground">
            varikosel<span className="text-primary">.net</span>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Bu alan adı satılıktır. Teklif için WhatsApp:{" "}
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              {SITE.whatsappHandle}
            </a>
          </p>
        </div>
        <nav aria-label="Varikosel rehberi">
          <p className="text-sm font-semibold text-foreground">Varikosel rehberi</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
            {ARTICLES.map((a) => (
              <li key={a.slug}>
                <a href={`/${a.slug}`} className="transition hover:text-foreground">
                  {a.navTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-foreground">Önemli not</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Bu sitedeki bilgiler genel bilgilendirme amaçlıdır ve tıbbi tanı ya da
            tedavinin yerine geçmez. Bu site bir sağlık kuruluşu değildir.
            Şikayetleriniz için bir üroloji uzmanına başvurun.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground">
          © 2026 varikosel.net · Son güncelleme: {SITE.updatedText}
        </p>
      </div>
    </footer>
  );
}
