import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Article from "./pages/Article.jsx";
import NotFound from "./pages/NotFound.jsx";
import { findArticle } from "./content/articles.js";

export function normalizePath(p) {
  if (!p) return "/";
  let out = p.split(/[?#]/)[0].replace(/\.html$/, "").replace(/\/index$/, "");
  out = out.replace(/\/+$/, "");
  return out || "/";
}

export default function App({ path }) {
  const p = normalizePath(path);
  let page;
  if (p === "/") page = <Home />;
  else {
    const article = findArticle(p.slice(1));
    page = article ? <Article article={article} /> : <NotFound />;
  }
  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        İçeriğe geç
      </a>
      <Header />
      <div id="icerik">{page}</div>
      <Footer />
    </>
  );
}
