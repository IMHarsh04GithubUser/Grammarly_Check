import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-center py-4 text-sm text-gray-600 absolute bottom-0 w-full bg-white">
        {/* Footer component with attribution */}
        <p>
          Built using React and Tailwind & LanguageTool API | {""}
          <a
            href="https://languagetool.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LanguageTool
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
