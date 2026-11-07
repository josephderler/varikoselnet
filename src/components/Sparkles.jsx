import { useEffect, useRef } from "react";

// Hafif bir canvas parıltı efekti. Sunucuda boş canvas olarak render edilir,
// tarayıcıda çizilir. Hareket azaltma tercihi varsa tek kare çizer.
export default function Sparkles({ density = 4, size = 1.4, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary")
        .trim() || "#7dd3e0";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles = [];
    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((width * height) / 10000) * density);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: (0.3 + Math.random() * 0.7) * size,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 0.08,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      for (const p of particles) {
        const alpha = 0.25 + 0.75 * Math.abs(Math.sin(p.phase + (t / 1000) * p.speed));
        ctx.globalAlpha = reduce ? 0.6 : alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          p.y -= p.drift;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    setup();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      setup();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      if (reduce) return;
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, size]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
