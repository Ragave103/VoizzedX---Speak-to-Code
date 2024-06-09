import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor.jsx";
import Editorr from "./Editorr.jsx";
import Web from "./Web.jsx";
import Sidebar from "./Sidebar.jsx";
import Sample from "./Sample.jsx";
import Loginpage from "./Loginpage.jsx";
import SignUp from "./auth/SignUp";
import AuthDetails from "./AuthDetails";
import SignUpPage from "./SignUpPage.jsx";
import AIMentor from "./AIMentor.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="overflow-clip">
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signUp" element={<SignUpPage />} />

          <Route path="/dashboard" element={<Web />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
