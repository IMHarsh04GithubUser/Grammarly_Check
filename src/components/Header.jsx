import {  useGrammar } from "../authcontext/GrammarContext";

const Header = () => {
//language state from context
  const {language, setLanguage} = useGrammar()
  return (
    <>
    {/*Header with language selection*/ }
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Grammarly extension
          </h1>
          <p className="text-slate-600">
            Browser tool to check grammar and spelling.
          </p>
        </div>
        <div className="flex items-center gap-2 border p-2 rounded-xl border-slate-200 hover:border-blue-500">
          <label className="text-sm text-slate-600" htmlFor="lang">
            Language
          </label>
          {/* Language selection dropdown*/ }
          <select
            id="lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className=" px-3 py-2 text-sm  outline-none "
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="fr">French</option>
          </select>
        </div>
      </header>
    </>
  );
};

export default Header;
