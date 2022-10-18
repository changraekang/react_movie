import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

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
  const Logo = "http://static.moviequizrae.fun/logo/popcorn.jpeg";
  return (
    <Wrapper>
      <Header>무퀴즈온더블록</Header>
      <Title>영덕후 능력평가</Title>
      <LogoImage>
        <img src={Logo} width={350} height={350}></img>
      </LogoImage>
      <ButtonGroups>
        <Button onClick={handleQuizClickButton}>퀴즈시작</Button>
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