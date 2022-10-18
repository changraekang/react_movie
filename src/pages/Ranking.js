import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { QuizQuestion, QuizAnswer } from "../atom/Atom";
let now = new Date(); // 현재 날짜 및 시간
let month = now.getMonth() + 1; // 월

const Ranking = () => {
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);

  return (
    <Wrapper>
      <Header>무퀴즈온더블록</Header>
      <Title>{month}월의 Ranking</Title>
    </Wrapper>
  );
};

export default Ranking;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroups = styled.div`
  width: 50%;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
`;

const Title = styled.div`
  font-size: 30pt;
  margin-top: 40px;
  font-weight: "bold";
`;

const LogoImage = styled.div`
  margin-top: 10px;
`;
