export const SITE = {
  domain: "varikosel.net",
  url: "https://varikosel.net",
  name: "varikosel.net",
  updatedISO: "2026-11-07",
  updatedText: "7 Kasım 2026",
  whatsappHandle: "@heryerdeyim",
  whatsappUrl:
    "https://wa.me/@heryerdeyim?text=" +
    encodeURIComponent(
      "Merhaba, varikosel.net alan adı için teklif vermek istiyorum.",
    ),
};

export const SOURCES = {
  medlineplus: {
    label: "MedlinePlus (ABD Ulusal Tıp Kütüphanesi): Varicocele",
    url: "https://medlineplus.gov/ency/article/001284.htm",
  },
  eauSrh: {
    label:
      "Avrupa Üroloji Derneği (EAU): Cinsel ve Üreme Sağlığı Kılavuzu",
    url: "https://uroweb.org/guidelines/sexual-and-reproductive-health",
  },
  eauPaed: {
    label: "Avrupa Üroloji Derneği (EAU): Çocuk Ürolojisi Kılavuzu",
    url: "https://uroweb.org/guidelines/paediatric-urology",
  },
  aua: {
    label:
      "Amerikan Üroloji Derneği (AUA/ASRM): Erkek İnfertilitesi Kılavuzu (2020, 2024 güncellemesi)",
    url: "https://www.auanet.org/guidelines-and-quality/guidelines/male-infertility",
  },
};

export function slugify(text) {
  const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i" };
  return text
    .replace(/[çğıöşüİ]/g, (c) => map[c])
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
