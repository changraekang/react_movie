import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../allowDemo.js";

const Home = () => {
  const navigate = useNavigate();

  const handleKoClickButton = () => {
    navigate("/quiz", { state: "ko" });
  };
  const handleInterClickButton = () => {
    navigate("/quiz", { state: "in" });
  };
  const handleQuizClickButton = () => {
    navigate("/quiz", { state: "in" });
  };
  const handleRankingClickButton = () => {
    navigate("/ranking");
  };
  const Logo = "http://static.moviequizrae.fun/logo/popcorn.jpeg";
  return (
    <Wrapper>
      <div id="demo"></div>
      <Header>무퀴즈온더블록</Header>
      <Title>영덕후 능력평가</Title>
      <LogoImage>
        <img src={Logo} width={350} height={350}></img>
      </LogoImage>
      <ButtonGroups>
        <Button onClick={handleQuizClickButton}>퀴즈시작</Button>
        <Button variant="danger" onClick={handleRankingClickButton}>
          랭킹보기
        </Button>
      </ButtonGroups>
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "DoHyeon-Regular";
`;

const Header = styled.div`
  font-size: 40pt;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;

const ButtonGroups = styled.div`
  width: 431px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  font-family: "DoHyeon-Regular";
`;

const Title = styled.div`
  font-size: 30pt;
  margin-top: 40px;
  font-weight: "bold";
  font-family: "HBIOS-SYS";
`;

const LogoImage = styled.div`
  margin-top: 10px;
`;
