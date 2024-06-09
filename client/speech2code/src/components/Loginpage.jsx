import "./Loginpage.css";
import { Navigate, Link, useNavigate } from "react-router-dom";
//import bg from '../images/background.png'
import Logo from "./Logo.png";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("Signed In");
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        alert("Please enter valid email and Password");
      });
  };
  return (
    <>
      <div className="window">
        <div className="side1">
          <div className="p-6">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "90px", height: "74px", flexShrink: 0 }}
            />
          </div>
          <div>
            <h1 className="ml-12 head">VoizzedX </h1>
            <hr />
            <p className="content">
              Unlock the power of speech with our revolutionary Speech to Code
              system.
            </p>
          </div>
        </div>

        <div className="side2 mt-20 p-6 rounded-lg">
          <p className="welcome mt-20 ml-20 mb-20">Welcome back !!Login</p>
          <form onSubmit={signIn} className="ml-20 ">
            <div className="form-group ml-20 mb-20">
              <label className="word1 mb-10 font-bold" htmlFor="email">
                Enter Your EMAIL ID:
              </label>
              <br />
              <input
                className="input text-slate-950 text-xl font-bold"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(password);
                }}
              />
            </div>
            <div className="form-group ml-20 mb-20 font-bold ">
              <label className="word1" htmlFor="password">
                Enter Your PASSWORD:
              </label>
              <br />
              <input
                className="input text-slate-950 text-xl font-bold"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
              />
            </div>
            <div className=" mt-20 ml-20">
              <button
                type="submit"
                className="login-button p-4 text-xl bg-fuchsia-600"
              >
                LOGIN
              </button>
            </div>
          </form>
          <div className="link-login">
            <p className=" mt-20 ml-20">
              NEW USER?: <br />
              <br />
              <Link to="/signUp">Create account Here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loginpage;
