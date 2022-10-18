import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Ranking from "./pages/Ranking";
import AnswerSheet from "./pages/AnswerSheet";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/answersheet" element={<AnswerSheet />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
