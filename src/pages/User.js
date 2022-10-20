import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { QuizUser } from "../atom/Atom";
const User = () => {
  const [user, setUser] = useState("");
  const [rankinguser, setRankingUser] = useRecoilState(QuizUser);
  const navigate = useNavigate();

  const onPressInputText = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    try {
      let body = { user: user };
      let res = await axios.post(
        "https://api.moviequizrae.fun/api/quizs/user/ranking",
        body
      );
      let quizuser = {
        user: user,
        userId: res.data.insertId,
      };
      setRankingUser(JSON.stringify(quizuser));
      navigate("/answersheet");
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

const Header = styled.div`
  font-size: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
