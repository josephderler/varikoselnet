import { ARTICLES, findArticle } from "./content/articles.js";
import { SITE } from "./site.js";

export const NOT_FOUND_PATH = "/404";
export const ROUTES = ["/", ...ARTICLES.map((a) => `/${a.slug}`)];

const HOME = {
  title: "varikosel.net ve varikosel.tr satılık · Varikosel bilgi rehberi",
  description:
    "varikosel.net ve varikosel.tr alan adları satılıktır, teklifinizi WhatsApp ile iletin. Varikosel nedir, belirtileri, tanısı ve tedavisi hakkında kaynaklı, sade bilgilendirme.",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
}

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: `${SITE.url}/`,
  inLanguage: "tr-TR",
  description: HOME.description,
};

export function buildHead(path) {
  if (path === NOT_FOUND_PATH) {
    return [
      "<title>Sayfa bulunamadı · varikosel.net</title>",
      '<meta name="robots" content="noindex" />',
    ].join("\n    ");
  }

  const article = path === "/" ? null : findArticle(path.slice(1));
  const title = article ? `${article.title} · varikosel.net` : HOME.title;
  const description = article ? article.description : HOME.description;
  const canonical = article ? `${SITE.url}/${article.slug}` : `${SITE.url}/`;

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<meta property="og:type" content="${article ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    '<meta property="og:locale" content="tr_TR" />',
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ];

  const graph = [WEBSITE];
  if (article) {
    graph.push({
      "@type": "MedicalWebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: article.title,
      headline: article.h1,
      description,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${SITE.url}/#website` },
      dateModified: SITE.updatedISO,
      about: {
        "@type": "MedicalCondition",
        name: "Varikosel",
        alternateName: "Varicocele",
      },
    });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: article.navTitle, item: canonical },
      ],
    });
    const faq = article.blocks.find((b) => b.type === "faq");
    if (faq) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
  }
  tags.push(jsonLd({ "@context": "https://schema.org", "@graph": graph }));
  return tags.join("\n    ");
}
