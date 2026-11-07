export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-start justify-center px-5 pt-28">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">404</p>
      <h1 className="mt-3 font-serif text-4xl font-medium text-foreground">
        Aradığınız sayfa bulunamadı
      </h1>
      <p className="mt-4 text-muted-foreground">
        Sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <a
        href="/"
        className="mt-8 rounded-full border border-border px-5 py-2.5 text-sm text-foreground hover:bg-card"
      >
        Ana sayfaya dön
      </a>
    </main>
  );
}
