import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { QuizUser } from "../atom/Atom";
const User = () => {
  const [user, setUser] = useRecoilState(QuizUser);
  const navigate = useNavigate();

  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      navigate("/answersheet");
    }
  };

  const onChangeUser = (e) => {
    setUser(e.target.value.trim());
    console.log(user, "랭킹이름");
  };
  return (
    <Wrapper>
      <h1>결과보기</h1>
      <Input
        type={"input"}
        placeholder="이름 입력해주세요"
        onChange={onChangeUser}
        value={user}
        onKeyPress={onPressInputText}
      ></Input>
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
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
