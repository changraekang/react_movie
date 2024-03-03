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
import { Table, Form, Input, Button, message } from "antd";

const AnswerSheet = () => {
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  const [score, setScore] = useRecoilState(Ranking);
  const [user, setUser] = useRecoilState(QuizUser);
  const [quizanswer, setQuizAnswer] = useState([]);
  const [rankuser, serRankuser] = useState({});
  const [loading, setLoading] = useState(true);
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  console.log(username, ":: username");
  const combinedQuizData = quizans.map((answer, index) => ({
    no: index + 1, // Assuming quiz number starts at 1
    userAnswer: answer,
    correctAnswer: quiztitlelength[index]?.answer,
  }));

  return (
    <Container>
      <Header>{username === "" ? "영덕후님" : username}의 답지</Header>
      {combinedQuizData.map((quiz, index) => (
        <QuizItem key={index}>
          <Question>{`Quiz ${index + 1}`}</Question>
          <Question>{`Your Answer: ${quiz.userAnswer}`}</Question>
          <Question>{`정답: ${quiz.correctAnswer}`}</Question>
          {quiz.correctAnswer === quiz.userAnswer ? (
            <AnswerButton>O</AnswerButton>
          ) : (
            <WrongButton>X</WrongButton>
          )}
        </QuizItem>
      ))}
    </Container>
  );
};

export default AnswerSheet;
const Container = styled.div`
  font-family: "DoHyeon-Regular";
`;

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "DoHyeon-Regular";
`;

const Subtitle = styled.div`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  font-family: "DoHyeon-Regular";
`;

const QuizItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-family: "DoHyeon-Regular";
`;

const Question = styled.div`
  font-size: 18px;
  font-family: "DoHyeon-Regular";
`;

const AnswerButton = styled.button`
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;
const WrongButton = styled.button`
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;
