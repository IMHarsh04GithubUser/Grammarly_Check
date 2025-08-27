import React, { createContext, useContext, useState, useMemo, useEffect } from "react";

const GrammarContext = createContext();


function applyReplacements(base, replacements) {
  const sorted = [...replacements].sort((a, b) => a.start - b.start);
  let out = "";
  let cursor = 0;
  for (const r of sorted) {
    out += base.slice(cursor, r.start) + r.text;
    cursor = r.end;
  }
  out += base.slice(cursor);
  return out;
}

function normalizeMatches(matches) {
  const sorted = [...matches].sort((a, b) => a.offset - b.offset || b.length - a.length);
  const result = [];
  let lastEnd = -1;
  for (const m of sorted) {
    if (m.offset >= lastEnd) {
      result.push(m);
      lastEnd = m.offset + m.length;
    }
  }
  return result;
}

async function checkWithLanguageTool({ text, language = "en-US" }) {
  const params = new URLSearchParams();
  params.set("text", text);
  params.set("language", language);

  const res = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    
  });
  const data = await res.json();
  return data.matches || [];
}

export function GrammarProvider({ children }) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoCorrected, setAutoCorrected] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const normalized = useMemo(() => normalizeMatches(matches), [matches]);

  useEffect(() => {
    if (!normalized.length) {
      setAutoCorrected("");
      return;
    }
    const repl = normalized.map((m) => ({
      start: m.offset,
      end: m.offset + m.length,
      text: m.replacements?.[0]?.value ?? text.slice(m.offset, m.offset + m.length),
    }));
    setAutoCorrected(applyReplacements(text, repl));
  }, [text, normalized]);

  const handleCheck = async () => {
    setError("");
    setLoading(true);
    setMatches([]);
    setSelectedIdx(-1);
    try {
      const res = await checkWithLanguageTool({ text, language });
      setMatches(res);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyAll = () => {
    if (!autoCorrected) return;
    setText(autoCorrected);
    setMatches([]);
    setSelectedIdx(-1);
  };

  const handleApplyOne = (m) => {
    const replacement = m.replacements?.[0]?.value;
    if (!replacement) return;
    const repl = [{ start: m.offset, end: m.offset + m.length, text: replacement }];
    setText((prev) => applyReplacements(prev, repl));
    setMatches((prev) => prev.filter((x) => x !== m));
    setSelectedIdx(-1);
  };

  return (
    <GrammarContext.Provider
      value={{
        text,
        setText,
        language,
        setLanguage,
        matches,
        normalized,
        loading,
        error,
        autoCorrected,
        selectedIdx,
        setSelectedIdx,
        handleCheck,
        handleApplyAll,
        handleApplyOne,
      }}
    >
      {children}
    </GrammarContext.Provider>
  );
}

function useGrammar() {
  return useContext(GrammarContext);
}

export { GrammarContext, useGrammar };
