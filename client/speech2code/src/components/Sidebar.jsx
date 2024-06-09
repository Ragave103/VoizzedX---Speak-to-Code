import React, { useState } from "react";
import Github from "./Github.png";
import Flowchart from "./Flowchart.png";
import Dashboard from "./Dashboard.png";
import History from "./History.gif";
import History1 from "./History1.png";
import Recommendation from "./Recommendation.gif";
import Recommendation1 from "./Recommendation1.png";
import { Link } from "react-router-dom";
import AIMentor from "./AIMentor";
import "./Web.css";
function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [openAiMentor, setOpenAiMentor] = useState(false);
  const [recommendation, setRecommendation] = useState([]);
  return (
    <>
      <aside
        className="bg-gray-700  w-51 h-screen overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav>
          <div className="flex ">
            <div className="flex-1">
              <ul>
                <li className="px-4 py-10 mt-3 ml-1 mb-20 p-20  ">
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5L12 5.01M12 12L12 12.01M12 19L12 19.01M12 6C11.4477 6 11 5.55228 11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z"
                        stroke="#45DEDE"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
                <li className="px-4 py-2 mb-20">
                  <a href="#">
                    <img src={Dashboard} />
                  </a>
                </li>
                <li className="px-4 py-2 mb-20">
                  <a href="#">
                    {isHovered && (
                      <img
                        className="w-[4rem]"
                        src={History}
                        alt="History button"
                      />
                    )}{" "}
                    {!isHovered && (
                      <img
                        className="w-[4rem]"
                        src={History1}
                        alt="History button"
                      />
                    )}
                  </a>
                </li>
                <li className="px-4 py-2 mb-20">
                  <button
                    onClick={() => {
                      setOpenAiMentor(true);
                    }}
                  >
                    {isHovered && (
                      <img
                        className="w-[4rem]"
                        src={Recommendation}
                        alt="AI MENTOR button"
                      />
                    )}
                    {!isHovered && (
                      <img
                        className="w-[4rem]"
                        src={Recommendation1}
                        alt="AI MENTOR button"
                      />
                    )}
                  </button>
                </li>
                <li className="px-4 py-2  mb-20">
                  <a href="#">
                    <img
                      className="w-[4rem]"
                      src={Flowchart}
                      alt="Flowchart button"
                    />
                  </a>
                </li>
                <li className="px-4 py-2 mt-auto">
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        d="M18 22.5C20.4853 22.5 22.5 20.4853 22.5 18C22.5 15.5147 20.4853 13.5 18 13.5C15.5147 13.5 13.5 15.5147 13.5 18C13.5 20.4853 15.5147 22.5 18 22.5Z"
                        stroke="#45DEDE"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M28.0909 22.0909C27.9094 22.5022 27.8552 22.9584 27.9354 23.4008C28.0157 23.8432 28.2265 24.2513 28.5409 24.5727L28.6227 24.6545C28.8763 24.9078 29.0775 25.2086 29.2147 25.5397C29.352 25.8708 29.4226 26.2257 29.4226 26.5841C29.4226 26.9425 29.352 27.2974 29.2147 27.6285C29.0775 27.9596 28.8763 28.2603 28.6227 28.5136C28.3694 28.7672 28.0687 28.9684 27.7376 29.1056C27.4065 29.2429 27.0516 29.3135 26.6932 29.3135C26.3348 29.3135 25.9799 29.2429 25.6488 29.1056C25.3177 28.9684 25.0169 28.7672 24.7636 28.5136L24.6818 28.4318C24.3604 28.1175 23.9523 27.9066 23.5099 27.8264C23.0675 27.7462 22.6113 27.8003 22.2 27.9818C21.7967 28.1547 21.4527 28.4417 21.2104 28.8075C20.9681 29.1734 20.8381 29.6021 20.8364 30.0409V30.2727C20.8364 30.996 20.549 31.6897 20.0376 32.2012C19.5261 32.7127 18.8324 33 18.1091 33C17.3858 33 16.6921 32.7127 16.1806 32.2012C15.6692 31.6897 15.3818 30.996 15.3818 30.2727V30.15C15.3713 29.6986 15.2252 29.2609 14.9625 28.8937C14.6999 28.5265 14.3328 28.2468 13.9091 28.0909C13.4978 27.9094 13.0416 27.8552 12.5992 27.9354C12.1568 28.0157 11.7487 28.2265 11.4273 28.5409L11.3455 28.6227C11.0922 28.8763 10.7914 29.0775 10.4603 29.2147C10.1292 29.352 9.77431 29.4226 9.41591 29.4226C9.0575 29.4226 8.70261 29.352 8.37153 29.2147C8.04044 29.0775 7.73965 28.8763 7.48636 28.6227C7.23279 28.3694 7.03163 28.0687 6.89438 27.7376C6.75713 27.4065 6.68649 27.0516 6.68649 26.6932C6.68649 26.3348 6.75713 25.9799 6.89438 25.6488C7.03163 25.3177 7.23279 25.0169 7.48636 24.7636L7.56818 24.6818C7.88255 24.3604 8.09343 23.9523 8.17364 23.5099C8.25385 23.0675 8.1997 22.6113 8.01818 22.2C7.84532 21.7967 7.5583 21.4527 7.19245 21.2104C6.8266 20.9681 6.39789 20.8381 5.95909 20.8364H5.72727C5.00396 20.8364 4.31026 20.549 3.7988 20.0376C3.28734 19.5261 3 18.8324 3 18.1091C3 17.3858 3.28734 16.6921 3.7988 16.1806C4.31026 15.6692 5.00396 15.3818 5.72727 15.3818H5.85C6.30136 15.3713 6.7391 15.2252 7.10632 14.9625C7.47354 14.6999 7.75325 14.3328 7.90909 13.9091C8.09061 13.4978 8.14476 13.0416 8.06455 12.5992C7.98434 12.1568 7.77346 11.7487 7.45909 11.4273L7.37727 11.3455C7.1237 11.0922 6.92254 10.7914 6.78529 10.4603C6.64804 10.1292 6.5774 9.77431 6.5774 9.41591C6.5774 9.0575 6.64804 8.70261 6.78529 8.37153C6.92254 8.04044 7.1237 7.73965 7.37727 7.48636C7.63056 7.23279 7.93135 7.03163 8.26244 6.89438C8.59352 6.75713 8.94841 6.68649 9.30682 6.68649C9.66522 6.68649 10.0201 6.75713 10.3512 6.89438C10.6823 7.03163 10.9831 7.23279 11.2364 7.48636L11.3182 7.56818C11.6396 7.88255 12.0477 8.09343 12.4901 8.17364C12.9325 8.25385 13.3887 8.1997 13.8 8.01818H13.9091C14.3124 7.84532 14.6564 7.5583 14.8987 7.19245C15.141 6.8266 15.271 6.39789 15.2727 5.95909V5.72727C15.2727 5.00396 15.5601 4.31026 16.0715 3.7988C16.583 3.28734 17.2767 3 18 3C18.7233 3 19.417 3.28734 19.9285 3.7988C20.4399 4.31026 20.7273 5.00396 20.7273 5.72727V5.85C20.729 6.2888 20.859 6.71751 21.1013 7.08336C21.3436 7.44921 21.6876 7.73623 22.0909 7.90909C22.5022 8.09061 22.9584 8.14476 23.4008 8.06455C23.8432 7.98434 24.2513 7.77346 24.5727 7.45909L24.6545 7.37727C24.9078 7.1237 25.2086 6.92254 25.5397 6.78529C25.8708 6.64804 26.2257 6.5774 26.5841 6.5774C26.9425 6.5774 27.2974 6.64804 27.6285 6.78529C27.9596 6.92254 28.2603 7.1237 28.5136 7.37727C28.7672 7.63056 28.9684 7.93135 29.1056 8.26244C29.2429 8.59352 29.3135 8.94841 29.3135 9.30682C29.3135 9.66522 29.2429 10.0201 29.1056 10.3512C28.9684 10.6823 28.7672 10.9831 28.5136 11.2364L28.4318 11.3182C28.1175 11.6396 27.9066 12.0477 27.8264 12.4901C27.7462 12.9325 27.8003 13.3887 27.9818 13.8V13.9091C28.1547 14.3124 28.4417 14.6564 28.8075 14.8987C29.1734 15.141 29.6021 15.271 30.0409 15.2727H30.2727C30.996 15.2727 31.6897 15.5601 32.2012 16.0715C32.7127 16.583 33 17.2767 33 18C33 18.7233 32.7127 19.417 32.2012 19.9285C31.6897 20.4399 30.996 20.7273 30.2727 20.7273H30.15C29.7112 20.729 29.2825 20.859 28.9166 21.1013C28.5508 21.3436 28.2638 21.6876 28.0909 22.0909Z"
                        stroke="#45DEDE"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            {isHovered && (
              <div className="sidebar-margin  flex-auto fixed top-0 left-[5rem]  h-full bg-gray-700  z-40 pointer-events-none transition-opacity duration-300 ease-in-out ">
                <ul className="ml-10 ">
                  <li className=" sidebar-text ">
                    <a href="#"></a>
                  </li>
                  <li
                    className="   sidebar-text"
                    style={{ "margin-top": "6rem" }}
                  >
                    <a href="#">DASHBOARD</a>
                  </li>
                  <li
                    className="  sidebar-text mb-5"
                    style={{ "margin-top": "7.7rem" }}
                  >
                    <a href="#">HISTORY</a>
                  </li>
                  <li
                    className=" sidebar-text"
                    style={{ "margin-top": "7.9rem" }}
                  >
                    <Link to="/aimentor">AI MENTOR</Link>
                  </li>
                  <li
                    className="  sidebar-text "
                    style={{ "margin-top": "8.5rem" }}
                  >
                    <a href="#">VISUALIZATION</a>
                  </li>
                  <li
                    className=" sidebar-text"
                    style={{ "margin-top": "8.2rem" }}
                  >
                    <a href="#">SETTINGS</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </aside>
      {openAiMentor && (
        <AIMentor
          recommendation={recommendation}
          openAiMentor={openAiMentor}
          setOpenAiMentor={setOpenAiMentor}
        />
      )}
    </>
  );
}

export default Sidebar;
