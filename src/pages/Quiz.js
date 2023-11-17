import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hint1 from "../components/Hint1";
import Hint2 from "../components/Hint2";
import Hint3 from "../components/Hint3";
import { QuizQuestion, QuizAnswer } from "../atom/Atom";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
import QuizSample from "./QuizSample";

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  let { quizNumber } = useParams();
  let quizNum = parseInt(quizNumber);
  const [Answer, setAnswer] = useState("");
  const [quizCount, setQuizCount] = useState([]);
  const [hint1, sethint1] = useState(true);
  const [hint2, sethint2] = useState(false);
  const [hint3, sethint3] = useState(false);
  const [UserInput, setUserInput] = useState(false);

  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      onClicksubmit();
    }
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value.trim());
  };
  const onClicksubmit = () => {
    next();
    setAnswer("");
    const answerArray = quizans;
    setQuizans([...answerArray, Answer]);
  };
  const next = () => {
    if (quizNum < 6) {
      navigate(`/quiz/${quizNum + 1}`, { state: "in" });
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
      <h1>{quizNum} Quiz</h1>
      <ButtonWrapper>
        <Hint>Points: {}</Hint>
        <Button onClick={ClickHint1}>level1</Button>
        <Button onClick={ClickHint2}>level2 </Button>
        <Button onClick={ClickHint3}>level3</Button> 포스터
      </ButtonWrapper>
      <HintWrapper>
        {hint1 && <Hint1 number={quizidx[quizNum - 1]} isMobile={isMobile} />}
        {hint2 && <Hint2 number={quizidx[quizNum - 1]} isMobile={isMobile} />}
        {hint3 && <Hint3 number={quizidx[quizNum - 1]} isMobile={isMobile} />}
      </HintWrapper>
      <InputContainer>
        <InputLabel>정답</InputLabel>
        <Input
          type={"input"}
          placeholder="정답을 입력해주세요"
          onChange={onChangeAnswer}
          value={Answer}
          onKeyPress={onPressInputText}
        />
        <Button onClick={onClicksubmit}>제출하기</Button>
      </InputContainer>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  height: 80vh;
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
  font-family: "DoHyeon-Regular";
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
  flex-direction: ${isMobile ? "column" : "row"};
  justify-content: ${isMobile ? "center" : "space-evenly"};
  margin-top: "10px";
`;
const HintWrapper = styled.div`
  width: 60%;
  height: 250px; // 높이를 200px로 고정
  display: flex;
  justify-content: center;
  align-items: center; // 내용을 중앙에 위치시킵니다.
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
  margin: 5px;
  font-family: "DoHyeon-Regular";
`;
const Hint = styled.div`
  font-size: 10pt;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
