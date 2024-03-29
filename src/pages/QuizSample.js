import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { QuizQuestion, QuizTitleLength } from "../atom/Atom";
import config from "../config";
import ReactAudioPlayer from "react-audio-player";
import hintL2 from "../assets/sample/hint2.jpg";
import hintL3 from "../assets/sample/hint3.jpg";
import trail from "../assets/img/trail.png"; // Corrected import statement
import poster from "../assets/img/poster.png"; // Corrected import statement
import film from "../assets/img/film.png"; // Corrected import statement

const QuizSample = ({ checkAllLoaded, setIsLoading }) => {
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 상태
  const [hint1, setHint1] = useState(true);
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);
  const onClickHint = (hintNumber) => {
    setHint1(hintNumber === 1);
    setHint2(hintNumber === 2);
    setHint3(hintNumber === 3);
  };

  const Hint1 = () => {
    return (
      <div>
        <ReactAudioPlayer
          src={`${config.assetsUrl}/level1/서울의봄.mp3`}
          controls
        />
      </div>
    );
  };

  const Hint2 = () => {
    return (
      <div style={{ display: "flex" }}>
        <img src={hintL2} alt="" width={"250px"} height={"175px"} />
      </div>
    );
  };
  const Hint3 = () => {
    return (
      <div style={{ display: "flex" }}>
        <img src={hintL3} alt="" width={"175px"} height={"250px"} />
      </div>
    );
  };

  const fetchQuizLength = async () => {
    console.log("fetchQuizLength", quizidx);
    try {
      const response = await fetch(`${config.apiUrl}/quizs/hint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizidx }), // quizidx 배열을 JSON 형식으로 변환하여 전송
      });
      const data = await response.json();
      // 데이터의 길이에 따라 버튼 활성화 상태 결정
      setQuizTitlelength(data);
      if (data.length > 0) {
        setIsButtonEnabled(true);
      }
    } catch (error) {
      console.error("Error fetching quiz length:", error);
    }
  };

  const renderHintComponent = () => {
    if (hint1) return <Hint1 />;
    if (hint2) return <Hint2 />;
    if (hint3) return <Hint3 />;
    return null;
  };
  const handleConfirmClick = async () => {
    setIsLoading(false);
    await fetchQuizLength();
    navigate("/quiz/1", { state: "in" });
  };
  return (
    <>
      <Wrapper>
        <Container>
          <Button onClick={() => onClickHint(1)}>Hint: 명대사 or OST</Button>
          <Description>
            이 힌트는 해당 영화나 TV 프로그램의 유명한 대사나 OST입니다.
          </Description>

          <Button onClick={() => onClickHint(2)}>Hint: 명장면 </Button>
          <Description>
            이 힌트는 영화나 TV 프로그램의 명장면입니다.{" "}
            {/* <br></br>
            사용 시 3점이 감점됩니다. */}
          </Description>

          <Button onClick={() => onClickHint(3)}>Hint: 포스터</Button>
          <Description>
            이 힌트는 해당 영화나 TV 프로그램의 포스터를 제공합니다.
            {/*  <br></br>
            사용 시 3점이 감점됩니다. */}
          </Description>
        </Container>
        <HintWrapper>{renderHintComponent()}</HintWrapper>
        <Button onClick={handleConfirmClick} disabled={!isButtonEnabled}>
          퀴즈풀러가기!!
        </Button>
      </Wrapper>
    </>
  );
};

export default QuizSample;

const Wrapper = styled.div`
  height: 55vh; // 높이를 70%로 조정
  width: 100%; // 너비를 70%로 조정
  padding-top: "50px";
  padding-bottom: "50px";
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  z-index: 1001;
`;
const HintWrapper2 = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px; // 여백을 70%로 조정
`;

const QuizContainer = styled.div`
  display: flex;
  width: 70%; // 너비를 70%로 조정
`;

const InputLabel = styled.label`
  font-size: 16.8px; // 폰트 크기를 70%로 조정
  color: black;
  margin: 0px;
  font-weight: bold;
  font-family: "DoHyeon-Regular";
`;
const Description = styled.p`
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  font-family: "DoHyeon-Regular";
`;
const Input = styled.input`
  margin-top: 7px; // 여백을 70%로 조정
  font-size: 8.4px; // 폰트 크기를 70%로 조정
  color: #033e93;
  height: 21px; // 높이를 70%로 조정
  border: 1px solid rgb(200, 200, 200);
  padding-left: 7px; // 패딩을 70%로 조정
  padding-right: 7px; // 패딩을 70%로 조정
`;

const ButtonWrapper = styled.div`
  width: 14%; // 너비를 70%로 조정
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 7px; // 여백을 70%로 조정
`;

const HintWrapper = styled.div`
  width: 21%; // 너비를 70%로 조정
  height: 280px; // 높이를 70%로 조정
  padding-top: 15;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.21rem 0.6125rem; // 패딩을 70%로 조정
  color: white;
  font-size: 0.6125rem; // 폰트 크기를 70%로 조정
  background-color: #0095eb;
  cursor: pointer;
  border-radius: 4px;
  word-break: keep-all;
  margin: 3.5px; // 여백을 70%로 조정
  font-family: "DoHyeon-Regular";
`;

const Hint = styled.div`
  font-size: 7pt; // 폰트 크기를 70%로 조정
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
const Container = styled.div`
  margin: 10px;
`;
