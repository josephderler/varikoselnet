import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export { buildHead, ROUTES, NOT_FOUND_PATH } from "./seo.js";
export { SITE } from "./site.js";

export function render(path) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
