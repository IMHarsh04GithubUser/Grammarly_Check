import React from "react";
import { GrammarProvider } from "./authcontext/GrammarContext";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import Suggestion from "./components/Suggestion";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div>
      {/* Wrap the app with GrammarProvider to provide context */ }
      <GrammarProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-300 to-slate-50 p-6 space-y-6">
          <Header />
          <div className="grid md:grid-cols-2 gap-6">
            <Editor />
            <Preview />
          </div>
          <Suggestion />
        </div>
        <Footer />
      </GrammarProvider>
    </div>
  );
};

export default App;
