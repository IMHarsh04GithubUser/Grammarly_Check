import React from "react";
import { useGrammar } from "../authcontext/GrammarContext";
{
  /* Suggestion component to display grammar suggestions */
}
const Suggestion = () => {
  const { text, normalized, handleApplyOne } = useGrammar();
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-200">
      {/* Container for suggestions */}
      <h2 className="font-semibold">Suggestions ({normalized.length})</h2>
      {normalized.length === 0 ? (
        <p className="mt-2 text-slate-500 text-sm">No suggestions yet.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {normalized.map((m, i) => {
            const excerpt = text.slice(m.offset, m.offset + m.length);
            const top = m.replacements?.[0]?.value;
            return (
              <li
                key={i}
                className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-medium">{m.message}</div>
                  <div className="mt-1 text-sm">
                    <span className="bg-slate-100 px-2 py-0.5 rounded">
                      {excerpt}
                    </span>
                    {top && (
                      <span className="ml-2 bg-emerald-100 px-2 py-0.5 rounded">
                        {top}
                      </span>
                    )}
                  </div>
                </div>
                {/* Button to apply individual suggestion */ }
                <button
                  onClick={() => handleApplyOne(m)}
                  disabled={!m.replacements?.length}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-600 text-white"
                >
                  Apply
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Suggestion;
