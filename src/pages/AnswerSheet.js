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
import { useNavigate } from "react-router-dom";
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

  // Antd 요소
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "퀴즈",
      dataIndex: "quiz",
      key: "quiz",
    },
    {
      title: "사용자정답",
      dataIndex: "userAnswer",
      key: "userAnswer",
    },
    {
      title: "힌트사용",
      dataIndex: "hintUsed",
      key: "hintUsed",
    },
    {
      title: "점수",
      dataIndex: "score",
      key: "score",
    },
  ];

  // 데이터 구성
  const data = [];
  const navigate = useNavigate();
  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      console.log(quiztitlelength[i].answer);
    }
    console.log("quiztitlelength ::", quiztitlelength);
    return () => {
      calculateScore();
    };
  }, []);

  const calculateScore = async () => {
    let rankScore = 0;
    for (let i = 0; i < 6; i++) {
      console.log(quiztitlelength[i].answer);
    }
    return rankScore;
  };

  const submitScore = async () => {
    try {
      const score = await calculateScore();
      setScore(score);
      let body = {
        user: rankuser.user,
        score: score,
        id: rankuser.userId,
      };
    } catch (err) {
      console.log(err);
    }

    navigate(`/ranking?userId=${rankuser.userId}&username=${rankuser.user}`);
  };
  return (
    <Container>
      <Header>Quiz Answer Sheet</Header>
      <Subtitle>Fill in your answers and scores below</Subtitle>
      {[1, 2, 3, 4, 5, 6].map((number) => (
        <QuizItem key={number}>
          <Question>Quiz {number}</Question>
          <AnswerButton>Answer</AnswerButton>
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
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;
