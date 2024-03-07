import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  QuizQuestion,
  QuizAnswer,
  QuizUser,
  Ranking,
  QuizTitleLength,
} from "../atom/Atom";
import styled from "styled-components";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import config from "../config";
import QuizSolve from "./QuizSolve";
const AnswerSheet = () => {
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  const [score, setScore] = useRecoilState(Ranking);
  const [user, setUser] = useRecoilState(QuizUser);
  const [quizNum, setQuizNum] = useState();
  const [quizSovle, setQuizSolve] = useState();
  const [rankuser, serRankuser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  const combinedQuizData = quizans.map((answer, index) => ({
    no: index + 1, // Assuming quiz number starts at 1
    userAnswer: answer,
    correctAnswer: quiztitlelength[index]?.answer,
  }));
  const handleOpenModal = (quizNum, quizSolve) => {
    setQuizNum(quizNum);
    setQuizSolve(quizSolve);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <Header>{username === "" ? "영덕후님" : username}의 답지</Header>
      {combinedQuizData.map((quiz, index) => (
        <QuizItem key={index}>
          <QuestionNo>{`Quiz ${index + 1}`}</QuestionNo>
          <div>
            <Question>{`${username === "" ? "영덕후님" : username}님의 답: ${
              quiz.userAnswer
            }`}</Question>
            <Question>{`정답: ${quiz.correctAnswer}`}</Question>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: 0,
              marginTop: "4px",
              height: "60px",
            }}
          >
            {quiz.correctAnswer === quiz.userAnswer ? (
              <AnswerButton>O</AnswerButton>
            ) : (
              <WrongButton>X</WrongButton>
            )}
            <QuizMove
              onClick={() =>
                handleOpenModal(quizidx[index], quiz.correctAnswer)
              }
            >
              문제보기
            </QuizMove>
          </div>
        </QuizItem>
      ))}
      {isModalOpen && (
        <LoadingModalWrapper onClick={handleCloseModal}>
          <QuizSolve
            onClose={handleCloseModal}
            quizNum={quizNum}
            quizSovle={quizSovle}
          />
        </LoadingModalWrapper>
      )}
    </Container>
  );
};

export default AnswerSheet;
const Container = styled.div`
  font-family: "DoHyeon-Regular";
  margin-top: 15px;
`;

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "DoHyeon-Regular";
`;

const QuizMove = styled.div`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  border-radius: 12px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #cceafb;
  margin-top: 5px;
  font-family: "DoHyeon-Regular";
`;

const QuizItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-family: "DoHyeon-Regular";
`;

const Question = styled.div`
  font-size: 14px;
  font-family: "DoHyeon-Regular";
  word-break: keep-all;
`;
const QuestionNo = styled.div`
  font-size: 18px;
  width: 20%;
  font-family: "DoHyeon-Regular";
  word-break: keep-all;
`;

const AnswerButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: #0095eb;
  cursor: pointer;
`;
const WrongButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: #f04040;
  cursor: pointer;
`;
const LoadingModalWrapper = styled.div`
  position: fixed;
  flex-direction: column;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
