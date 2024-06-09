import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Web.css";
import { Navigate, Link, useNavigate } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Button,
} from "@material-tailwind/react";
const Navbar = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user.email);
        console.log(authUser);
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

  return (
    <>
      <nav className="bg-gray-700 p-7  ">
        <div className="ml-20">
          <div className="ml-20">
            <ul className="flex space-x-5 ">
              <li className="mt-3 ">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 35 36"
                    fill="none"
                  >
                    <path
                      d="M4.375 10.5V25.5C4.375 27.1569 5.68084 28.5 7.29167 28.5H27.7083C29.3192 28.5 30.625 27.1569 30.625 25.5V13.5C30.625 11.8431 29.3192 10.5 27.7083 10.5H18.9583L16.0417 7.5H7.29167C5.68084 7.5 4.375 8.84315 4.375 10.5Z"
                      stroke="#45DEDE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li className="mt-2">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      d="M10.5 31.5H25.5C27.1569 31.5 28.5 30.1569 28.5 28.5V14.1213C28.5 13.7235 28.342 13.342 28.0607 13.0607L19.9393 4.93934C19.658 4.65804 19.2765 4.5 18.8787 4.5H10.5C8.84315 4.5 7.5 5.84315 7.5 7.5V28.5C7.5 30.1569 8.84315 31.5 10.5 31.5Z"
                      stroke="#45DEDE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <div className="ml-20">
                  <div className="ml-20">
                    <div className="ml-20">
                      <div className="ml-20">
                        <div className="ml-20">
                          <div className="ml-20">
                            <div className="ml-20">
                              <div className="ml-20">
                                <div className="ml-20">
                                  <div className="ml-20">
                                    <div className="ml-20">
                                      <div className="ml-20">
                                        <button>
                                          <div className="w-25 h-16 px-4 py-3 bg-gradient-to-tr from-violet-900 to-violet-700 rounded-md shadow justify-center items-center gap-2.5 inline-flex">
                                            <div className="text-white text-2xl text-base font-semibold leading-snug">
                                              <span className="text-2xl">
                                                SAVE
                                              </span>
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button className="flex items-center space-x-2">
                  <div className="w-25 h-15 px-4 py-3 bg-gradient-to-tr from-violet-900 to-violet-700 rounded-md shadow justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-2xl text-base font-semibold leading-snug">
                      <span className="text-2xl">INVITE</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 35 32"
                      fill="none"
                    >
                      <path
                        d="M26.25 12V16M26.25 16V20M26.25 16H30.625M26.25 16H21.875M18.9583 9.33333C18.9583 12.2789 16.3467 14.6667 13.125 14.6667C9.90334 14.6667 7.29167 12.2789 7.29167 9.33333C7.29167 6.38781 9.90334 4 13.125 4C16.3467 4 18.9583 6.38781 18.9583 9.33333ZM4.375 26.6667C4.375 22.2484 8.29251 18.6667 13.125 18.6667C17.9575 18.6667 21.875 22.2484 21.875 26.6667V28H4.375V26.6667Z"
                        stroke="#45DEDE"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </button>
              </li>

              <li className="mt-2 ">
                <div className="ml-20">
                  <div className="ml-20">
                    <div className="ml-20">
                      <div className="ml-20">
                        <div className="ml-20">
                          <div className="ml-20">
                            <div className="ml-20">
                              <Popover
                                open={openPopover}
                                handler={setOpenPopover}
                                className="max-w-[40rem]"
                              >
                                <PopoverHandler {...triggers}>
                                  <Button>
                                    <a href="#" className="bg-transparent">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                      >
                                        <path
                                          d="M7.68156 26.7056C10.729 24.9831 14.2497 24 18 24C21.7503 24 25.271 24.9831 28.3184 26.7056M22.5 15C22.5 17.4853 20.4853 19.5 18 19.5C15.5147 19.5 13.5 17.4853 13.5 15C13.5 12.5147 15.5147 10.5 18 10.5C20.4853 10.5 22.5 12.5147 22.5 15ZM31.5 18C31.5 25.4558 25.4558 31.5 18 31.5C10.5442 31.5 4.5 25.4558 4.5 18C4.5 10.5442 10.5442 4.5 18 4.5C25.4558 4.5 31.5 10.5442 31.5 18Z"
                                          stroke="#45DEDE"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </a>
                                  </Button>
                                </PopoverHandler>
                                <PopoverContent
                                  {...triggers}
                                  className="z-50 max-w-[40rem] bg-zinc-800"
                                >
                                  <div className="m-2 border border-slate-900">
                                    <div className=" ">
                                      <h2 className="p-4 text-2xl">
                                        Welcome !
                                      </h2>
                                      <h2 className="p-4 text-xl">
                                        You are logged in as {authUser}
                                      </h2>
                                      <button
                                        onClick={userSignOut}
                                        className="ml-10 gradient-button"
                                      >
                                        LOGOUT
                                      </button>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
