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

  return (
    <Wrapper>
      <Header>결과보기</Header>
      *최대 5글자까지 입력가능
      <Input
        type={"input"}
        placeholder="이름 입력해주세요"
        onChange={(e) => {
          const newValue = e.target.value.trim();
          // 입력 값의 길이가 quiztitlelength[quizNum - 1].length 이하인지 확인
          if (newValue.length <= 5) {
            setUser(newValue); // 조건을 만족하면 상태 업데이트
          }
        }}
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
  font-size: 16px;
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
  font-size: 1.275rem;
  font-family: "DoHyeon-Regular";
  background-color: #0095eb;
  cursor: pointer;
  border-radius: 4px;
  word-break: keep-all;
  margin: 5px;
`;
