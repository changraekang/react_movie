import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { QuizQuestion, QuizAnswer, QuizUser } from "../atom/Atom";
import styled from "styled-components";

import axios from "axios";
const AnswerSheet = () => {
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  const [user, setUser] = useRecoilState(QuizUser);
  const [quizanswer, setQuizAnser] = useState([]);
  useEffect(() => {
    const QuizAnswer = async () => {
      try {
        const res = await axios.post(
          "https://api.moviequizrae.fun/quizs/answer",
          quizidx
        );
        setQuizAnser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    QuizAnswer();
  }, []);
  return (
    <Flex>
      <UserAnswerSheet>
        <h1>{user}의 답</h1>
        <Tabs>
          <No> No</No>
          <QuizAnswer2> 문제</QuizAnswer2>
          <UserAnswer> 답안</UserAnswer>
        </Tabs>
        <Quizzes>
          <FlexColumn>
            {quizanswer.map((row, idx) => (
              <TradeOdd
                style={
                  idx % 2 != 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "rgb(232, 246, 255)" }
                }
              >
                <No>{idx + 1}</No>
                <QuizAnswer2>{row.moviequiztitle}</QuizAnswer2>
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
                <UserAnswer>{row}</UserAnswer>
              </TradeOdd>
            ))}
          </FlexColumn2>
        </Quizzes>
      </UserAnswerSheet>
    </Flex>
  );
};

export default AnswerSheet;
const UserAnswerSheet = styled.div`
  height: 100vh;
  width: 30%;
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
