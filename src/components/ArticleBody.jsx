import { slugify } from "../site.js";

export default function ArticleBody({ blocks }) {
  return (
    <div className="text-[17px] leading-relaxed text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="mt-12 scroll-mt-24 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl"
              >
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mt-4">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 list-disc space-y-2 pl-5 marker:text-primary">
                {b.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "warn":
            return (
              <aside
                key={i}
                role="note"
                className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-[15px] text-amber-100"
              >
                <strong className="font-semibold text-amber-200">Dikkat: </strong>
                {b.text}
              </aside>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[520px] text-left text-[15px]">
                  <thead className="bg-card text-foreground">
                    <tr>
                      {b.headers.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t border-border">
                        {row.map((cell, c) =>
                          c === 0 ? (
                            <th key={c} scope="row" className="px-4 py-3 font-medium text-foreground">
                              {cell}
                            </th>
                          ) : (
                            <td key={c} className="px-4 py-3">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "faq":
            return (
              <div key={i} className="mt-4 divide-y divide-border rounded-2xl border border-border">
                {b.items.map((f, j) => (
                  <div key={j} className="p-5">
                    <h2
                      id={slugify(f.q)}
                      className="scroll-mt-24 font-serif text-xl font-medium text-foreground"
                    >
                      {f.q}
                    </h2>
                    <p className="mt-2">{f.a}</p>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
