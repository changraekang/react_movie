import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizQuestion, QuizAnswer } from "../atom/Atom";
import styled from "styled-components";
import Hint1 from "../components/Hint1";
import Hint2 from "../components/Hint2";
import Hint3 from "../components/Hint3";
import config from "../config";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
import QuizSample from "./QuizSample";

const Quiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);

  const [Answer, setAnswer] = useState("");
  const [quizNum, setQuizNum] = useState(0);
  const [quizNumber, setQuizNumber] = useState(0);
  const [quizCount, setQuizCount] = useState([]);
  const [hint1, sethint1] = useState(true);
  const [hint2, sethint2] = useState(false);
  const [hint3, sethint3] = useState(false);
  const [UserInput, setUserInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedAudios, setLoadedAudios] = useState(0);


  useEffect(() => {
    //1. 퀴즈갯수는 6개
    let quizSeed;
    let loadedAudios = 0;

    const storedQuizSeed = localStorage.getItem('quizSeed');
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
      localStorage.setItem('quizSeed', JSON.stringify(quizSeed));
    }
  
    setQuizCount(quizSeed);
    setQuizidx(quizSeed);

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
    setQuizCount(quizSeed);
    setQuizidx(quizSeed);

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
  }, []);

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
      setQuizNum(quizNum + 1);
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

  // 로딩 모달 컴포넌트
  const LoadingModal = ({ isLoading, setIsLoading , checkAllLoaded}) => (

    <LoadingModalWrapper>
      <h1 style={{color:'white'}}>Quiz 생성 중... </h1>
      <QuizSample isLoading={isLoading} setIsLoading={setIsLoading} checkAllLoaded={checkAllLoaded} />
    </LoadingModalWrapper>
  );


  return (
    <Wrapper>
       {isLoading && <LoadingModal isLoading={isLoading} setIsLoading={setIsLoading} />}
      <h1>{quizNum + 1} Quiz</h1>
      <ButtonWrapper>
        <Hint>Points: {}</Hint>
        <Button onClick={ClickHint1}>level1</Button>
        <Button onClick={ClickHint2}>level2 </Button> 
        <Button onClick={ClickHint3}>level3</Button> 포스터
      </ButtonWrapper>
      <HintWrapper>
        {hint1 &&!isLoading && <Hint1 number={quizCount[quizNum]} isMobile={isMobile}  isLoading={isLoading} />}
        {hint2 && <Hint2 number={quizCount[quizNum]} isMobile={isMobile} />}
        {hint3 && <Hint3 number={quizCount[quizNum]} isMobile={isMobile} />}
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
  height: 400px; // 높이를 200px로 고정
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