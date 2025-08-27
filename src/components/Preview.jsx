import React from "react";
import { useGrammar } from "../authcontext/GrammarContext";

const Preview = () => {
  const { text, normalized, autoCorrected, handleApplyAll } = useGrammar();
  function buildHighlighted(text, matches, onClickMatch) {
    if (!matches.length) return [text];
    const parts = [];
    let cursor = 0;
    matches.forEach((m, idx) => {
      const start = m.offset;
      const end = m.offset + m.length;
      if (start > cursor) parts.push(text.slice(cursor, start));
      parts.push(
        <span
          key={idx}
          className="underline decoration-wavy decoration-red-500/80"
        >
          {text.slice(start, end)}
        </span>
      );
      cursor = end;
    });
    if (cursor < text.length) parts.push(text.slice(cursor));
    return parts;
  }
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Highlights & Preview</h2>
          <button
            onClick={handleApplyAll}
            disabled={!autoCorrected || !normalized.length}
            className="text-xs px-3 py-1 rounded-full border border-emerald-200"
          >
            Apply All
          </button>
        </div>
        <div className="mt-3 p-3 min-h-32 rounded-xl border border-slate-200 bg-slate-50">
          {text
            ? buildHighlighted(text, normalized, () => {})
            : "Your text will appear here…"}
        </div>
        {autoCorrected && (
          <div className="mt-3 p-3 rounded-xl border border-emerald-200 bg-emerald-50">
            {autoCorrected}
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
