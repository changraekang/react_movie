import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import popcorn from "../assets/img/popcorn-1.jpg"; // Corrected import statement
import popcorn2 from "../assets/img/popcorn-2.jpg"; // Corrected import statement
import QuizSample from "./QuizSample";
import config from "../config";
import { QuizQuestion, QuizAnswer } from "../atom/Atom";
import { useRecoilState } from "recoil";
const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedAudios, setLoadedAudios] = useState(0);

  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);

  const handleQuizClickButton = () => {
    setIsLoading(true);
    return newFunction();
  };
  const handleRankingClickButton = () => {
    navigate("/ranking");
  };

  function newFunction() {
    localStorage.removeItem("quizSeed");
    let loadedAudios = 0;
    //1. 퀴즈갯수는 7개
    let quizSeed;

    const storedQuizSeed = localStorage.getItem("quizSeed");
    if (storedQuizSeed) {
      // 로컬 스토리지에 저장된 퀴즈 숫자들이 있으면, 이를 사용합니다.
      quizSeed = JSON.parse(storedQuizSeed);
    } else {
      // 저장된 퀴즈 숫자들이 없으면, 새로 생성합니다.
      quizSeed = [];
      for (let i = 0; i < 7; i++) {
        let num;
        do {
          num = Math.floor(Math.random() * 160) + 1;
        } while (quizSeed.includes(num)); // 이미 생성된 숫자인지 확인합니다.
        quizSeed.push(num);
      }
      // 새로 생성된 퀴즈 숫자들을 로컬 스토리지에 저장합니다.
      localStorage.setItem("quizSeed", JSON.stringify(quizSeed));
    }
    setQuizidx(quizSeed);
    console.log(quizSeed, "quiz");
    // 이미지 프리로딩 로직 캐싱되어 훨씬 빠르게 로딩
    const imageUrls = quizSeed
      .map((number) => [
        `${config.assetsUrl}/level2/${number}.jpg`,
        `${config.assetsUrl}/level3/${number}.jpg`,
      ])
      .flat();

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
    const audioUrls = quizSeed.map(
      (number) => `${config.assetsUrl}/level1/${number}.mp3`
    );

    audioUrls.forEach((url, index) => {
      const audio = new Audio();
      audio.src = url;
      audio.onloadeddata = () => {
        setLoadedAudios((prevCount) => prevCount + 1); // 로딩된 파일 수 업데이트
      };
    });

    const checkAllLoaded = setInterval(() => {
      if (loadedAudios === audioUrls.length) {
        clearInterval(checkAllLoaded);
      }
    }, 100);
    return () => clearInterval(checkAllLoaded);
  }
  // 로딩 모달 컴포넌트
  const LoadingModal = ({ isLoading, setIsLoading, checkAllLoaded }) => (
    <LoadingModalWrapper>
      <h1 style={{ color: "white" }}>Quiz 생성 중... </h1>
      <QuizSample
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        checkAllLoaded={checkAllLoaded}
      />
    </LoadingModalWrapper>
  );
  return (
    <Wrapper>
      {isLoading && (
        <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />
      )}
      <Header>무퀴즈온더블록</Header>
      <Title>영덕후 능력평가</Title>
      <LogoImage>
        <img src={popcorn} alt="Popcorn" width={350} height={350} />{" "}
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
  min-height: 80vh;
  width: 100%;
  overflow: hidden; // 스크롤을 숨깁니다.
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "DoHyeon-Regular";

  @media (max-width: 600px) {
    width: 100%;
    overflow: hidden;
  }
  > :first-child {
    margin-top: 80px; // 첫 번째 자식 요소의 상단 마진을 50px로 설정
  }
`;

const Header = styled.div`
  font-size: 38pt;
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
const LoadingModalWrapper = styled.div`
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 15px;
  font-family: "HBIOS-SYS";
`;
