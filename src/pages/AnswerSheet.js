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
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import config from "../config";

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
    <Flex>
      <UserAnswerSheet>
        <Header>{rankuser.user}의 답</Header>
        <Tabs>
          <No> No</No>
          <QuizAnswer2> 문제</QuizAnswer2>
          <UserAnswer> 답안</UserAnswer>
        </Tabs>
        {loading ? (
          <Loading />
        ) : (
          <Quizzes>
            <FlexColumn>
              {quiztitlelength.map((row, idx) => (
                <TradeOdd
                  style={
                    idx % 2 != 0
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "rgb(232, 246, 255)" }
                  }
                >
                  <No>{idx + 1}</No>
                  <QuizAnswer2>{quiztitlelength.answer}</QuizAnswer2>
                </TradeOdd>
              ))}
            </FlexColumn>
            <FlexColumn2>
              {quizans.map((row, idx) => (
                <TradeOdd
                  style={
                    idx % 2 != 0
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "rgb(232, 246, 255)" }
                  }
                >
                  {row}
                </TradeOdd>
              ))}
            </FlexColumn2>
          </Quizzes>
        )}
        <Button onClick={submitScore}>결과제출</Button>
      </UserAnswerSheet>
    </Flex>
  );
};

export default AnswerSheet;
const UserAnswerSheet = styled.div`
  height: 100vh;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Tabs = styled.div`
  display: flex;
  font-size: 12px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 30px;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Quizzes = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 30px;
`;

const TradeOdd = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  width: 100%;
  height: 23px;
  background-color: rgb(232, 246, 255);
`;
const TradeEven = styled.div`
  display: flex;
  font-size: 14px;
  height: 23px;
`;

const No = styled.div`
  width: 100%;
  text-align: center;
`;

const UserAnswer = styled.div`
  width: 100%;
  text-align: center;
`;

const QuizAnswer2 = styled.div`
  width: 100%;
  text-align: center;
`;

const Rise = styled.div`
  color: #d60000;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`;
const FlexColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;
const Header = styled.div`
  font-size: 35pt;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
