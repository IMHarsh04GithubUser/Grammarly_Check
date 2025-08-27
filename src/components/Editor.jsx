import React from "react";
import { useGrammar } from "../authcontext/GrammarContext";

const Editor = () => {
  const {
    text,
    setText,
    matches,
    setSelectedIdx,
    handleCheck,
    loading,
    error,
  } = useGrammar();
  return (
    <div>
      <>
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-200">
          {/* Container for text editor and check button */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Your Text</h2>
            <button
              onClick={handleCheck}
              disabled={loading || !text.trim()}
              className="text-xs px-3 py-1 rounded-full bg-indigo-600 text-white disabled:opacity-50"
            >
              {loading ? "Checking…" : "Check Grammar"}
            </button>
          </div>
          {/* Textarea for user input */ }
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here…"
            className="mt-3 w-full h-64 rounded-xl border border-slate-300 p-3"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </>
    </div>
  );
};

export default Editor;
