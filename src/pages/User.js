import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { QuizUser, QuizHintUsed } from "../atom/Atom";
const User = () => {
  const [user, setUser] = useState("");
  const [rankinguser, setRankingUser] = useRecoilState(QuizUser);
  const navigate = useNavigate();
  const quizHintUsed = useRecoilValue(QuizHintUsed);
  useEffect(() => {
    console.log("힌트 사용 정보:", quizHintUsed);
  }, [quizHintUsed]);
  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    try {
      navigate(`/answersheet?username=${user}`);
    } catch (err) {
      console.log(err);
    }
  };
  const onChangeUser = (e) => {
    setUser(e.target.value.trim());
  };
  return (
    <Wrapper>
      <Header>결과보기</Header>
      <Input
        type={"input"}
        placeholder="이름 입력해주세요"
        onChange={onChangeUser}
        value={user}
        onKeyPress={onPressInputText}
      ></Input>
      <Button onClick={handleSubmit}>제출하기</Button>
    </Wrapper>
  );
};

export default User;
const Input = styled.input`
  margin-top: 10px;
  font-size: 12px;
  color: #033e93;
  height: 30px;
  border: 1px solid rgb(200, 200, 200);
  padding-left: 10px;
  padding-right: 10px;
`;
const Wrapper = styled.div`
  height: 80vh;
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
  font-family: "DoHyeon-Regular";
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
`;
