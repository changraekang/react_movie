import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import RankingPage from "./pages/RankingPage";
import AnswerSheet from "./pages/AnswerSheet";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User";
import { useRecoilState } from "recoil";
import { IsMobile } from "./atom/Atom.js";
import { isMobile } from "react-device-detect";

function App() {
  const [Mobile, setIsMobile] = useRecoilState(IsMobile);
  useEffect(() => {
    setIsMobile(isMobile);
    console.log(isMobile, "모바일");
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/answersheet" element={<AnswerSheet />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
