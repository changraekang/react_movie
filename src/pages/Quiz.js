import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizQuestion, QuizAnswer } from "../atom/Atom";
import styled from "styled-components";
import Hint1 from "../components/Hint1";
import Hint2 from "../components/Hint2";
import Hint3 from "../components/Hint3";
import { useRecoilState } from "recoil";
const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);

  const [Answer, setAnswer] = useState();
  const [quizNum, setQuizNum] = useState(0);
  const [quizNumber, setQuizNumber] = useState(0);
  const [quizCount, setQuizCount] = useState([]);
  const [hint1, sethint1] = useState(true);
  const [hint2, sethint2] = useState(false);
  const [hint3, sethint3] = useState(false);
  const [UserInput, setUserInput] = useState(false);
  useEffect(() => {
    //1. 퀴즈갯수는 6개
    let quizSeed = []; //6개로 값이 나열될것이기 때문에 배열처리 - 값은 담지 않음

    //6번처리 - 반복문
    for (let i = 0; i < 6; i++) {
      //새로 추가될 숫자 : 1~186사이의 숫자가 랜덤하게 처리
      //random() : 0~1사이의 랜덤한 소수
      //floor() : 내림처리해서 정수로 변경
      let num = Math.floor(Math.random() * 160) + 1;

      //현재 상태는 같은 숫자가 나올수 있음
      //lotto라는 배열에 담긴 숫자와 같이 같으면 안됨
      for (let j in quizSeed) {
        if (num === quizSeed[j]) {
          //현재 새로나온 숫자가 기존 숫자와 같으면
          num = Math.floor(Math.random() * 160) + 1;
        }
      }

      //push() - 배열에 마지막에 값추가메서드
      console.log(quizSeed);
      quizSeed.push(num);
    }
    setQuizCount(quizSeed);
    setQuizidx(quizSeed);
  }, []);

  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      next();
      setAnswer("");
      const answerArray = quizans;
      setQuizans([...answerArray, Answer]);
    }
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value.trim());
  };
  const next = () => {
    if (quizNum < 5) {
      setQuizNum(quizNum + 1);
      setAnswer("");
      sethint1(true);
      sethint2(false);
      sethint3(false);
    } else {
      navigate("/user");
    }
  };
  const ClickHint1 = () => {
    sethint1(true);
    sethint2(false);
    sethint3(false);
  };
  const ClickHint2 = () => {
    sethint1(false);
    sethint2(true);
    sethint3(false);
  };
  const ClickHint3 = () => {
    sethint1(false);
    sethint2(false);
    sethint3(true);
  };
  return (
    <Wrapper>
      <h1>{quizNum + 1} Quiz</h1>
      <ButtonWrapper>
        <Button onClick={ClickHint1}>1</Button>
        <Button onClick={ClickHint2}>2</Button>
        <Button onClick={ClickHint3}>3</Button>
      </ButtonWrapper>
      {hint1 && <Hint1 number={quizCount[quizNum]} />}
      {hint2 && <Hint2 number={quizCount[quizNum]} />}
      {hint3 && <Hint3 number={quizCount[quizNum]} />}
      <InputContainer>
        <InputLabel>정답</InputLabel>
        <Input
          type={"input"}
          placeholder="정답을 입력해주세요"
          onChange={onChangeAnswer}
          value={Answer}
          onKeyPress={onPressInputText}
        />
      </InputContainer>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const QuizContainer = styled.div`
  display: flex;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 24px;
  color: "black";
  margin: 0px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 10px;
  font-size: 12px;
  color: #033e93;
  height: 30px;
  border: 1px solid rgb(200, 200, 200);
  padding-left: 10px;
  padding-right: 10px;
`;

const ButtonWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
  margin-top: "10px";
`;
const Button = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0.3rem 0.875rem;
  color: white;
  font-size: 0.875rem;
  background-color: blue;
  cursor: pointer;
  border-radius: 4px;
  word-break: keep-all;
`;
