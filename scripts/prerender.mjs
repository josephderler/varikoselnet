// Build sonrası her rota için statik HTML üretir; sitemap.xml ve robots.txt yazar.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html şablon işaretleri bulunamadı");
}

const { render, buildHead, ROUTES, NOT_FOUND_PATH, SITE } = await import(
  pathToFileURL(path.join(root, ".ssr", "entry-server.js")).href
);

const SITE_URL = SITE.url;
const LASTMOD = SITE.updatedISO;

function page(route) {
  return template
    .replace("<!--app-head-->", buildHead(route))
    .replace("<!--app-html-->", render(route));
}

for (const route of ROUTES) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), page(route));
  console.log("prerender", route, "->", file);
}

fs.writeFileSync(path.join(dist, "404.html"), page(NOT_FOUND_PATH));
console.log("prerender 404 -> 404.html");

const urls = ROUTES.map((r) => {
  const loc = r === "/" ? `${SITE_URL}/` : `${SITE_URL}${r}`;
  return `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod></url>`;
}).join("\n");

fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
console.log("sitemap.xml + robots.txt yazıldı");
