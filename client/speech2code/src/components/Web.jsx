import React, { useState, useRef, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import Editor from "@monaco-editor/react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import "./Web.css";
import sendicon from "./sendicon.png";
import AiLoading from "./AiLoading.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { auth, storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import RecommendText from "./RecommendText.jsx";

import compileIcon from "./compileIcon.gif";

function LoadingModal({ isLoading }) {
  if (!isLoading) return null;
  return (
    <>
      <div className="fixed  inset-0 flex items-center justify-center z-50 bg-blur">
        <div className="text-[25px] bg-white w-70 p-20 flex items-center justify-center rounded-md shadow-md text-slate-800">
          <h2 className="text-[30px] font-semibold">
            Please wait while AI is generating code...
          </h2>
          <img src={AiLoading} alt="Loading" className="w-1/4 " />
        </div>
      </div>
    </>
  );
}

function First({ isOpen, setIsOpen, setSecond }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed first inset-0   z-50 ">
        <div className="text-[25px]  bg-gray-800 max-w-fit max-h-fit pointer-events-auto p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 ">
            {" "}
            "Welcome to VOIZZED X, your voice-powered code generator. We're here
            to help you turn your programming problems into code effortlessly.
            Let's get started with a quick tour."
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setSecond(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Second({ isOpen, setIsOpen, setThird }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0 second   z-50 ">
        <div className="bg-gray-800 max-w-fit max-h-fit pointer-events-auto   p-5 rounded-md shadow-md text-slate-800 ">
          <div className="flex flex-col">
            <div>
              <h2 className="text-[25px] text-slate-50">
                INPUT YOUR PROBLEM {"      "}⮞ ⮞ ⮞
              </h2>
              <h2 className="text-[25px] text-slate-50 ">
                In the first box, you can either speak or type your programming
                problem description. Just click on the box and start talking or
                typing. Our system will understand you! 🎤✍️
              </h2>
            </div>
          </div>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setThird(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Third({ isOpen, setIsOpen, setFourth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0  third   z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit  pointer-events-auto p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50">
            Choose Your Language 🌐 ⮞ ⮞ ⮞{" "}
          </h2>

          <h2 className="text-[25px] text-slate-50 ">
            Select your preferred programming language from the dropdown menu.
            We support various languages like C,C++,Python, JavaScript, Java .
            Choose the one that suits your needs. 🚀
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setFourth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Fourth({ isOpen, setIsOpen, setFifth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0 fourth  z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50">
            {" "}
            Generate Your Code 🚀 ⮞ ⮞ ⮞
          </h2>

          <h2 className="text-[25px] text-slate-50 ">
            Once you've described your problem and selected a language, click
            the "Generate Code" button.
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setFifth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Fifth({ isOpen, setIsOpen, setSixth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0  fifth z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50">
            {" "}
            Code Editor Space 📝 ⮞ ⮞ ⮞
          </h2>

          <h2 className="text-[25px] text-slate-50 ">
            The generated code will be displayed here. You can review and make
            any necessary edits. 🖋️
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setSixth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Sixth({ isOpen, setIsOpen, setSeventh }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0  sixth z-50 ">
        <div className="bg-gray-800 max-w-fit  max-h-fit pointer-events-auto  p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 ">Compile and Run</h2>
          <h2 className="text-[25px] text-slate-50 ">
            {" "}
            Click the "Compile and Run" button to execute your code. You'll see
            the results 🡯 in the output box. ▶️
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setSeventh(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Seventh({ isOpen, setIsOpen, setEighth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0 seventh  z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto  p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 ">⪻ Custom Input 📋</h2>
          <h2 className="text-[25px] text-slate-50 ">
            If your problem requires custom input, use the custom input box
            provided. Enter the data your code needs to work with. 📝
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setEighth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Eighth({ isOpen, setIsOpen, setNineth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0 eighth  z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto  p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 ">⪻ Output Box </h2>
          <h2 className="text-[25px] text-slate-50 ">
            The output of your code will be displayed here after execution.
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setNineth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Nineth({ isOpen, setIsOpen, setTenth }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0  nineth z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto  p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 ">Clear Your Console 🗑️</h2>
          <h2 className="text-[25px] text-slate-50 ">
            {" "}
            If you want to start fresh or clear the console, simply click 🡷the
            "Clear" button. 🗑️
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setTenth(true);
              }}
              className="text-lg font-bold gradient-button"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Tenth({ isOpen, setIsOpen }) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-2 left-5 inset-0  tenth z-50 ">
        <div className="bg-gray-800  max-w-fit max-h-fit pointer-events-auto  p-5 rounded-md shadow-md text-slate-800">
          <h2 className="text-[25px] text-slate-50 "> Logout 🔒</h2>
          <h2 className="text-[25px] text-slate-50 ">
            When you're done using Speak2Script, securely log out by clicking
            the "Logout" button in the Profile 🔒
          </h2>
          <div className="flex mt-5 justify-center">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-lg font-bold gradient-button"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function LoadingModalCompile({ isCompiling }) {
  if (!isCompiling) return null;
  return (
    <>
      <div className="fixed   inset-0 flex items-center justify-center z-50  ">
        <div className="bg-transparent  justify-center rounded-md shadow-md text-slate-800">
          <img src={compileIcon} className="compile" alt="Compiling" />
        </div>
      </div>
    </>
  );
}

const Web = () => {
  const [program, setProgram] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [codee, setCode] = useState("");
  const [isRotated, setRotated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [DecodedOutput, setDecodedOutput] = useState();
  const [languageid, setLanguageid] = useState("63");
  const [isCompiling, setIsCompiling] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [sixth, setSixth] = useState(false);
  const [seventh, setSeventh] = useState(false);
  const [eighth, setEighth] = useState(false);
  const [nineth, setNineth] = useState(false);
  const [tenth, setTenth] = useState(false);
  const [isRecommendBtn, setRecommendBtn] = useState(false);
  const [isRecommendTxt, setRecommendTxt] = useState(false);
  const [output, setOutput] = useState("");
  const [listOutput, setListOutput] = useState([]);
  const [isreturn, setReturn] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const addAudioElement = async (blob) => {
    //const url = URL.createObjectURL(blob);
    setAudioBlob(blob);
    console.log("audio Blob created");
    console.log(blob.size);
    //const audio = document.createElement("audio");
    //audio.src = url;
    //audio.controls = true;
    //document.body.appendChild(audio);
    //const timestamp = new Date().getTime();
    //const filePath = `audio_${timestamp}.webm`;
    //setAudioFilePath(filePath);
    //const audioFile = new File([audioBlob], filePath, { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audioBlob", blob);
    console.log("1. formdata appended successfully");
    /*
    const audioRefFile = ref(storage, `tempaudio/temp`);

    uploadBytes(audioRefFile, formData).then((res) => {
      console.log("Audio File Saved to Cloud successfully");
    });
*/
    try {
      const response = await fetch("http://localhost:5000/api/transcribe", {
        method: "POST",
        body: formData,
        "Content-Type": "multipart/form-data",
      });

      if (response.ok) {
        console.log("data sent successfully");
        const data = await response.json();
        console.log(data.text);
        setTranscription(data.text);
        setProgram(data.text);
        console.log("Transcription success:", transcription);
        setAudioBlob(null);
      } else {
        console.error("Transcription failed with status:", response.status);
        console.error("Error response:", response.statusText);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  const handleRotation = () => {
    setRotated(!isRotated);
  };

  const generateCode = async () => {
    setIsLoading(true);
    const data = { choice: language, program: program };
    setCode("");
    console.log(language);
    console.log(program);
    if (program != "") {
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
          console.log(language);
          console.log(program);
          console.log(data);
          const myList = data.code;
          const convertedList = myList.join("\n");
          setCode(convertedList);
          console.log(codee);
        } else {
          console.error("Failed to convert speech to code.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("You haven't described any program");
    }
    setIsLoading(false);
  };

  const editorOptions = {
    fontSize: 30,
  };
  const handleCodeChange = (newProg) => {
    setProgram(newProg);
    if (program.length > 3) {
      setRecommendBtn(true);
    } else setRecommendBtn(false);
  };

  const handleLanguageChange = async (selectElement) => {
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    const selectedId = selectedOption.getAttribute("id");
    const selectedValue = selectedOption.value;
    // Now you have the 'id' and 'value' of the selected option
    setLanguage(selectedValue);
    console.log(language);

    setLanguageid(selectedId);
    console.log(+selectedId);
    console.log(selectedValue);
    if (program !== "") {
      console.log(selectedValue);
      setIsLoading(true);
      const data = { choice: selectedValue, program: program };
      setCode("");
      console.log(selectedValue);
      console.log(program);
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
          console.log(language);
          console.log(program);
          console.log(data);
          const myList = data.code;
          const convertedList = myList.join("\n");
          setCode(convertedList);
          console.log(codee);
        } else {
          console.error("Failed to convert speech to code.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("You haven't described any program");
    }
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCompile = async () => {
    setIsCompiling(true);

    /*
    const formData = {
      language_id: +languageid,
      // encode source code in base64
      source_code: btoa(codee),
      stdin: btoa(inputValue),
    };

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "11b97ce07cmshc4268fac4d4f163p1c1e36jsn5ece0b93ed07",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const Token = response.data.token;
      checkstatus(Token);
    } catch (error) {
      console.error(error);
      if (error.response.status === 422) {
        console.log(error.message);
      }
    }*/
    console.log("language to compile ", language);
    console.log("program to compile ", codee);
    if (language == "python") {
      // Check if the first line starts with the 'import' keyword
      if (codee.includes("import")) {
        setReturn(true);
      } else setReturn(false);
    }
    console.log(codee.includes("import"));
    if (isreturn) {
      try {
        const data = {
          language: language,
          codee: codee,
          inputValue: inputValue,
        };
        const response = await fetch("http://localhost:5000/api/compile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const output = data.output;
          setOutput(output);
          console.log(codee);
          const trimoutput = output.split("\n");
          setListOutput(trimoutput);
          setDecodedOutput("");
        } else {
          console.error("Failed to convert speech to code.");
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (!isreturn) {
      const formData = {
        language_id: +languageid,
        // encode source code in base64
        source_code: btoa(codee),
        stdin: btoa(inputValue),
      };

      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "a58e19dd95mshf7deb5fec61500dp143d5fjsna26c5453fabe",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: formData,
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        const Token = response.data.token;
        checkstatus(Token);
      } catch (error) {
        console.error(error);
        if (error.response.status === 422) {
          console.log(error.message);
        }
      }
    }
    setIsCompiling(false);
  };

  useEffect(() => {
    if (listOutput !== null) {
      console.log(listOutput);
      console.log(DecodedOutput);
    }
  }, [listOutput, DecodedOutput]);

  // CHECKSTATUS FUNCTION IS USED TO REQUEST API THE RETUR THE EXCEUTED OUT AD STORE IT IN OUTPUTDETAILS VARIABLE.
  const checkstatus = async (Token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + Token,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "a7eae7ceffmsh3e30c7d5004bc78p148c53jsn2de1a7fd3ed3",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      const statusid = response.data.status_id;
      if (statusid === 2 || statusid === 1) {
        setTimeout(() => {
          checkstatus(Token);
        }, 2000);
      } else {
        const stdoutput = response.data.stdout;
        if (stdoutput == null) setDecodedOutput("Error, Check your code");
        else {
          const trimoutput = stdoutput.replace(/[\n]/gm, "");
          const b = "\n" + atob(trimoutput);
          setDecodedOutput(b);
          console.log(DecodedOutput);

          setListOutput([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsCompiling(false);
  };

  const handleTextareaClick = () => {
    // Clear the content of the textarea when clicked
    setDecodedOutput("");
    setInputValue("");
    setListOutput("");
  };

  {
    /* FUNCTION TO STORE VALUE(CODE) TYPED IN CODE EDITOR SPACE COCURRENTLY*/
  }
  const OnChange = (value) => {
    setCode(value);
    console.log(codee);
  };

  return (
    <>
      <div className="bg-gray-800 ">
        <div className="flex">
          <Sidebar />

          <div className="flex-1 overflow-hidden">
            <Navbar />

            <main className="p-4">
              <div className="flex space-x-6">
                <div className="container  basis-1/3  h-screen">
                  <LoadingModalCompile isCompiling={isCompiling} />

                  <div className="flex flex-col">
                    <div className="flex flex-col h-screen">
                      <div className="bg-cyan-950 input-cmd">
                        <h1 className="bg-cyan-800 text-4xl text-slate-50 text-center p-4">
                          INPUT
                        </h1>
                        <textarea
                          value={inputValue}
                          onChange={handleInputChange}
                          className=" input-text-styles text-slate-50 bg-cyan-950   ml-7  p-5 text-2xl flex-grow focus:outline-none hover:outline-none   p-4 rounded-md"
                        />
                      </div>
                      <div className=" bg-cyan-950  output-cmd">
                        <h1 className="bg-cyan-800  p-5 text-4xl text-slate-50 text-center">
                          OUTPUT
                        </h1>
                        <div className="p-5">
                          {listOutput &&
                            listOutput.map((line, index) => (
                              <div key={index}>
                                <span className="text-xl">{line}</span>
                              </div>
                            ))}
                          {DecodedOutput && (
                            <textarea
                              readOnly={true}
                              value={DecodedOutput}
                              className=" input-text-styles-output text-slate-50 bg-cyan-950   ml-  p-5 text-2xl flex-grow focus:outline-none hover:outline-none   p-4 rounded-md"
                            ></textarea>
                          )}
                        </div>
                        <div className="ml-20 fixed bottom-20 flex flex-row gap-20 ">
                          <button
                            className="ml-10 mr-18 gradient-button "
                            onClick={handleCompile}
                          >
                            COMPILE AND RUN
                          </button>
                          <button
                            className="clear ml-15 gradient-button"
                            onClick={handleTextareaClick}
                          >
                            CLEAR
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container ">
                  <div>
                    <div className="mr-20 mb-4  float-right">
                      <div className="flex flex-row">
                        <select
                          value={language}
                          onChange={(e) => {
                            handleLanguageChange(e.target);
                          }}
                          className="block   selectstyles border border-gray-300 text-2xl text-slate-900 py-2 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-blue-500"
                        >
                          <option
                            id="63"
                            name="JavaScript (Node.js 12.14.0)"
                            label="JavaScript (Node.js 12.14.0)"
                            value="javascript"
                          >
                            JavaScript
                          </option>
                          <option
                            id="71"
                            name="Python (3.8.1)"
                            label="Python (3.8.1)"
                            value="python"
                          >
                            Python
                          </option>
                          <option
                            id="50"
                            name="C (GCC 9.2.0)"
                            label="C (GCC 9.2.0)"
                            value="c"
                          >
                            C
                          </option>
                          <option
                            id="54"
                            name="C++ (GCC 9.2.0)"
                            label="C++ (GCC 9.2.0)"
                            value="cpp"
                          >
                            C++
                          </option>
                          <option
                            id="62"
                            name="Java (OpenJDK 13.0.1)"
                            label="Java (OpenJDK 13.0.1)"
                            value="java"
                          >
                            Java
                          </option>
                        </select>
                        <button
                          className="ml-10 gradient-button"
                          onClick={() => setIsOpen(true)}
                        >
                          QUICK TOUR
                        </button>
                        <First
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          setSecond={setSecond}
                        />
                        <Second
                          isOpen={second}
                          setIsOpen={setSecond}
                          setThird={setThird}
                        />
                        <Third
                          isOpen={third}
                          setIsOpen={setThird}
                          setFourth={setFourth}
                        />

                        <Fourth
                          isOpen={fourth}
                          setIsOpen={setFourth}
                          setFifth={setFifth}
                        />
                        <Fifth
                          isOpen={fifth}
                          setIsOpen={setFifth}
                          setSixth={setSixth}
                        />

                        <Sixth
                          isOpen={sixth}
                          setIsOpen={setSixth}
                          setSeventh={setSeventh}
                        />
                        <Seventh
                          isOpen={seventh}
                          setIsOpen={setSeventh}
                          setEighth={setEighth}
                        />
                        <Eighth
                          isOpen={eighth}
                          setIsOpen={setEighth}
                          setNineth={setNineth}
                        />
                        <Nineth
                          isOpen={nineth}
                          setIsOpen={setNineth}
                          setTenth={setTenth}
                        />
                        <Tenth isOpen={tenth} setIsOpen={setTenth} />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-900">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="black"
                        >
                          <path d="M10.293 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 12.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3z" />
                        </svg>
                      </div>
                    </div>
                    <Editor
                      height="81vh"
                      theme="vs-dark"
                      language={language}
                      options={editorOptions}
                      value={codee}
                      onChange={OnChange}
                    />

                    <div
                      className={` flex flex-col items-centerborder ${
                        isRotated ? "translate-x-full" : "translate-x-0"
                      } border-cyan-300 focus:border-cyan-300 hover:border-cyan-300 rounded px-2 py-1 input-prompt-div fixed bottom-1 right-20 divStyles `}
                    >
                      <div>
                        <div className="float-left  top-2 right-12 z-10">
                          <button onClick={handleRotation}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="36"
                              className={`transform transition-transform ${
                                isRotated ? "rotate-[180deg]" : ""
                              }  `}
                              viewBox="0 0 35 36"
                              fill="none"
                            >
                              <path
                                d="M18.9583 7.5L29.1667 18L18.9583 28.5M7.29166 7.5L17.5 18L7.29166 28.5"
                                stroke="#45DEDE"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex-auto ">
                          <textarea
                            className="textStyles text-2xl flex-1 resize-none  textStyle focus:outline-none hover:outline-none   p-2 rounded-md w-full"
                            placeholder="Describe the program.."
                            styles="textStyles"
                            value={program}
                            onChange={(e) => handleCodeChange(e.target.value)}
                          />
                        </div>
                        <div className="mt-4  h-48 ">
                          <RecommendText
                            isRecommendTxt={isRecommendTxt}
                            setRecommendTxt={setRecommendTxt}
                            isRecommendBtn={isRecommendBtn}
                            setRecommendBtn={setRecommendBtn}
                            program={program}
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="mb-2.5 ml-2 mr-20">
                            <AudioRecorder
                              onRecordingComplete={addAudioElement}
                              audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                              }}
                              downloadOnSavePress={false}
                              downloadFileExtension="webm"
                            />
                          </div>
                          <button className="ml-20">
                            <img
                              src={sendicon}
                              onClick={generateCode}
                              className="w-10 float-right  mb-2 send-btn"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <LoadingModal isLoading={isLoading} />
      </div>
    </>
  );
};

export default Web;
