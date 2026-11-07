# varikosel.net

"Bu alan adı satılık" sayfası ve varikosel bilgilendirme rehberi.
Vite + React + Tailwind 4. Build sırasında her sayfa statik HTML olarak üretilir
(arama motorları içeriği JavaScript beklemeden okur).

## Komutlar

```bash
npm install
npm run dev      # geliştirme
npm run build    # dist/ içine statik site + sitemap.xml + robots.txt
npm run preview  # build çıktısını yerelde aç
```

## Yapı

- `src/content/articles.js` — tüm bilgilendirme sayfalarının metni. Yeni sayfa eklemek
  için diziye bir nesne ekle; rota, sitemap, menü ve ana sayfa kartı otomatik oluşur.
- `src/site.js` — alan adı, WhatsApp linki, kaynak listesi, güncelleme tarihi.
- `src/seo.js` — title, description, canonical, Open Graph ve JSON-LD.
- `scripts/prerender.mjs` — build sonrası HTML, `404.html`, `sitemap.xml`, `robots.txt`.
- `src/components/Hero.jsx` — 21st.dev "Coming Soon 2" (Hirael, MIT) tasarımından uyarlandı.

## Vercel

Repo Vercel'e bağlanınca ayar gerekmez (`vercel.json` build komutunu ve `dist`
klasörünü belirtir). Alan adı: Vercel → Project → Settings → Domains → `varikosel.net`
ekle, `www.varikosel.net` için ana alan adına yönlendirme seç ve Vercel'in verdiği
DNS kayıtlarını alan adı firmasında gir.

## Google'a tanıtma (yayından sonra)

1. https://search.google.com/search-console → Mülk ekle → "Alan" türü → `varikosel.net`.
2. Verilen TXT kaydını alan adının DNS ayarlarına ekle, doğrula.
3. Sol menü "Site haritaları" → `sitemap.xml` gönder.
4. "URL denetimi" → ana sayfa ve birkaç rehber sayfası için "Dizine eklenmeyi iste".

İçerik değişince `src/site.js` içindeki `updatedISO` ve `updatedText` değerlerini
güncelle; sitemap tarihi buradan okunur.
