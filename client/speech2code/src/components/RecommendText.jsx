import React, { useState, useEffect } from "react";
import "./RecommendText.css";
import AIMentor from "./AIMentor";

const RecommendText = ({
  isRecommendTxt,
  setRecommendTxt,
  isRecommendBtn,

  setRecommendBtn,
  program,
}) => {
  const [recommendation, setRecommendation] = useState([]);
  const [openAiMentor, setOpenAiMentor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickRecommendBtn = () => {
    setRecommendTxt(true);
    setRecommendBtn(false);
  };

  useEffect(() => {
    if (recommendation !== null) {
      console.log(recommendation);
    }
  }, [recommendation]);

  const fetchRecommendation = async () => {
    setIsLoading(true);
    try {
      const data = { program: program };
      const response = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const recommendedText = await response.json();
        console.log(recommendedText.recprog);
        setRecommendation(recommendedText.recprog);
        console.log(recommendation);
      } else {
        console.log("Error fetching program recommendations");
      }
    } catch (error) {
      console.error("Program Recommendation error: ", error);
    }
    setIsLoading(false);
  };
  if (isRecommendBtn || isRecommendTxt) {
    return (
      <>
        <div className="overflow-auto">
          {isRecommendBtn && (
            <button
              onClick={() => {
                onClickRecommendBtn();
                fetchRecommendation();
              }}
              className="ml-40 gradient-button"
            >
              SHOW RECOMMENDATIONS
            </button>
          )}
          {isRecommendTxt && (
            <div className="overflow-visible  h-48">
              <ul>
                {recommendation.map((recommend, index) => (
                  <li key={index}>
                    <button
                      className="recommend-btn "
                      onClick={() => {
                        setOpenAiMentor(true);
                      }}
                    >
                      <span>{recommend.topic}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setRecommendTxt(false);
                  setRecommendBtn(true);
                }}
                className="gradient-button  absolute z-10  ml-40 bottom-1"
              >
                Clear Recommendations{" "}
                {isLoading && (
                  <div class="loading absolute z-10 bottom-[1rem] right-[5rem]">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
        {openAiMentor && (
          <AIMentor
            recommendation={recommendation}
            openAiMentor={openAiMentor}
            setOpenAiMentor={setOpenAiMentor}
          />
        )}
      </>
    );
  } else return null;
};

export default RecommendText;
