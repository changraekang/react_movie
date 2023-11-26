import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { QuizQuestion, QuizTitleLength } from "../atom/Atom";
import config from "../config";

const QuizSample = ({ checkAllLoaded, setIsLoading }) => {
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 버튼 활성화 상태

  useEffect(() => {
    // 서버로부터 값의 길이를 받아오는 함수
    const fetchQuizLength = async () => {
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

    fetchQuizLength();

    return () => {};
  }, []);

  const handleConfirmClick = () => {
    setIsLoading(false);
    navigate("/quiz/1", { state: "in" });
  };
  return (
    <Wrapper>
      Sample
      <Button onClick={handleConfirmClick} disabled={!isButtonEnabled}>
        확인
      </Button>
    </Wrapper>
  );
};

export default QuizSample;

const Wrapper = styled.div`
  height: 70vh; // 높이를 70%로 조정
  width: 85%; // 너비를 70%로 조정
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  z-index: 1001;
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
  flex-direction: "column";
  justify-content: "center";
  margin-top: 7px; // 여백을 70%로 조정
`;

const HintWrapper = styled.div`
  width: 21%; // 너비를 70%로 조정
  height: 210px; // 높이를 70%로 조정
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
  background-color: blue;
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
