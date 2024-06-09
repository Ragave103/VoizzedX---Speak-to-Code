import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function Editorr() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div>
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
      </select>
      <Editor
        height="70vh"
        width="200vh"
        theme="vs-dark"
        defaultLanguage="python"
      />
    </div>
  );
}

export default Editorr;
