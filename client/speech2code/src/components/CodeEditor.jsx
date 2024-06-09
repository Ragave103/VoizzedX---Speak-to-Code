import React, { useEffect, useState } from "react";

function CodeEditor() {
  const [codee, setCode] = useState({});
  const [msg, setmsg] = useState("");

  /*useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);


*/

  const handleSpeechRecognition = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/members");

      if (response.ok) {
        const data = await response.json();
        setmsg(data.members);
      } else {
        console.error("Failed to convert speech to code.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const data = { choice: "C++", program: "reverse a number" };
  const generateCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setCode(data);
        console.log(codee);
      } else {
        console.error("Failed to convert speech to code.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSpeechRecognition}>Sample msg</button>
      <div>
        <h2>Sample msg:</h2>
        <pre>{msg}</pre>
      </div>

      <button onClick={generateCode}>Convert to Code</button>
      {codee.code && codee.code.length > 0 && (
        <div>
          {codee.code.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CodeEditor;
