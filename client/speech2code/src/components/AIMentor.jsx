import React, { useState, useEffect } from "react";
import "./RecommendText.css";
import Cross from "./Cross.png";
import "./Web.css";

function AlgoPopUp({ isAlgo, setAlgo, algo, recommendTopic }) {
  const [fetchAlgo, setFetchAlgo] = useState([]);
  const [closeTryBtn, setCloseTryBtn] = useState(true);
  const [closeBtn, setCloseBtn] = useState(false);
  const fetchAlgorithm = async () => {
    try {
      const data = { program: algo };
      const response = await fetch("http://localhost:5000/api/generatealgo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const recommendedAlgo = await response.json();
        console.log(recommendedAlgo.algo);
        setFetchAlgo(recommendedAlgo.algo);
        console.log(fetchAlgo);
      } else {
        console.log("Error fetching program recommendations");
      }
    } catch (error) {
      console.error("Program Recommendation error: ", error);
    }
  };
  useEffect(() => {
    if (fetchAlgo !== null) {
      console.log(fetchAlgo);
    }
  }, [fetchAlgo]);
  if (!isAlgo) return null;
  return (
    <>
      <div className="absolute overflow-auto  z-50 bg-gray-800 w-[50rem] h-[40rem] bottom-[10rem] p-5 right-[35rem]  z-90">
        <div className="text-[25px]   bg-gray-800 max-w-fit max-h-fit pointer-events-auto p-5 rounded-md shadow-md text-slate-800">
          <div className="flex flex-col overflow-auto">
            <h2 className="text-[25px] underline underline-offset-5 mt-10 text-slate-100 ">
              {recommendTopic}
            </h2>
            <h2 className="text-[21px] mt-10 text-cyan-300 ">{algo}</h2>
          </div>
          {closeTryBtn && (
            <button
              className="text-lg ml-[18rem] mt-5 font-bold gradient-button"
              onClick={() => {
                fetchAlgorithm();
                setCloseBtn(true);
                setCloseTryBtn(false);
              }}
            >
              <span>TRY NOW</span>
            </button>
          )}
          <ul className="mt-5">
            {fetchAlgo.map((recommend, index) => (
              <li key={index} className="text-slate-100 text-[20px]">
                <span className="font-bold mr-2">{recommend}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="text-lg ml-[20rem] mt-2 font-bold gradient-button"
          onClick={() => {
            setAlgo(false);
          }}
        >
          <span>CLOSE</span>
        </button>
      </div>
    </>
  );
}
/*
const AlgoPopUp = ({ isAlgo, setAlgo, algo, recommendTopic }) => {
  if (isAlgo) {
    return (
      <>
        <div class="card p-4 absolute w-[50rem] h-[40rem] z-90 right-[30rem] bottom-[10rem]">
          <div class="bg uwu "></div>
          <div class="bg "></div>
          <div className="flex flex-col ">
            <button
              className="aimentor-btn1 absolute z-index-40 ml-[40rem]"
              onClick={() => {
                setAlgo(false);
              }}
            >
              <span>X</span>
            </button>

            <div className="relative overflow-auto w-[40rem] h-[50rem]">
              {" "}
              <div className="flex-1">
                <h1 className="text-2xl font-bold ">{recommendTopic}</h1>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="flex-2 ">
                <p className="text-xl text-slate-100">{algo}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
*/
function AIMentor({ recommendation, openAiMentor, setOpenAiMentor }) {
  const [isAlgo, setAlgo] = useState(false);
  const [algo, saveAlgo] = useState("");
  const [recommendTopic, setRecommendTopic] = useState("");
  if (openAiMentor) {
    return (
      <>
        <div className="absolute overflow-auto fixed p-5 border-cyan-300 border-2 z-10 bg-gray-700 left-[-88rem] top-[-23.6rem] w-[45rem] h-[60rem] ">
          <div className="flex flex-col">
            <div>
              <button
                onClick={() => {
                  setOpenAiMentor(false);
                }}
              >
                <img src={Cross} className="w-10 float-right ml-[42rem]" />
              </button>
            </div>
            <ul>
              {recommendation &&
                recommendation.map((recommend, index) => (
                  <li key={index}>
                    <div class="card p-4 ">
                      <div class="bg uwu"></div>
                      <div class="bg"></div>
                      <div className="flex flex-col">
                        <button
                          className="aimentor-btn absolute z-index-40 ml-[28rem]"
                          onClick={() => {
                            setAlgo(true);
                            saveAlgo(recommend.problem);
                            setRecommendTopic(recommend.topic);
                            console.log(algo);
                            console.log(recommendTopic);
                          }}
                        >
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              fill="currentColor"
                              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                            ></path>
                          </svg>
                        </button>
                        <div className="flex-1">
                          <h1 className="text-2xl font-bold ">
                            {recommend.topic}
                          </h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="flex-2 ">
                          <p className="text-xl text-slate-100">
                            {recommend.problem}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <AlgoPopUp
          isAlgo={isAlgo}
          setAlgo={setAlgo}
          algo={algo}
          recommendTopic={recommendTopic}
        />
      </>
    );
  } else
    return (
      <>
        <div className="absolute overflow-auto fixed p-5 border-cyan-300 border-2 z-10 bg-gray-700 left-[-88rem] top-[-23.6rem] w-[45rem] h-[60rem] ">
          <div className="flex flex-col">
            <div>
              <button
                onClick={() => {
                  setOpenAiMentor(false);
                }}
              >
                <img src={Cross} className="w-10 float-right ml-[42rem]" />
              </button>
            </div>
            <h2>Try out a program to see recommendations</h2>
          </div>
        </div>
      </>
    );
}

export default AIMentor;
