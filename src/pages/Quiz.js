import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Hint1 from "../components/Hint1";
import Hint2 from "../components/Hint2";
import Hint3 from "../components/Hint3";
const Quiz = () => {
  const { state } = useLocation();
  const [Answer, setAnswer] = useState();
  const [quizNum, setQuizNum] = useState(0);
  const [hint1, sethint1] = useState(true);
  const [hint2, sethint2] = useState(false);
  const [hint3, sethint3] = useState(false);

  
  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      next();
      setAnswer('');
      console.log(quizNum + "퀴즈번호")
    }
  };

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const next = () => {
      setQuizNum(quizNum + 1);
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
  const RenderHint1 = () => {
    return (
     <>
     <div>힌트1</div>
     </>
  );
  };
  const RenderHint2 = () => {
    return (
      <>
      <div>힌트2</div>
      </>
   );
  };
  const RenderHint3 = () => {
    return (
      <>
      <div>힌트3</div>
      </>
   );
  };
  return (
    <Wrapper>
      <h1>{quizNum} Quiz</h1>
      <ButtonWrapper>
        <Button onClick={ClickHint1}>
          1
        </Button>
        <Button onClick={ClickHint2}>
          2
        </Button>
        <Button onClick={ClickHint3}>
          3
        </Button>
      </ButtonWrapper>
      <InputContainer>
        {hint1 && <Hint1 />}
        {hint2 && <Hint2 />}
        {hint3 && <Hint3 />}
                  <InputLabel>정답</InputLabel>
                  <Input
                    type={"input"}
                    placeholder='정답을 입력해주세요'
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

const InputLabel = styled.label`
  font-size: 24px;
  color: 'black';
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
    margin-top: '10px';
`;
const Button = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 0.3rem 0.875rem;
    color:white;
    font-size: 0.875rem;
    background-color: blue;
    cursor: pointer;
    border-radius: 4px;
    word-break: keep-all;
`;