import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  QuizQuestion,
  QuizAnswer,
  QuizHintUsed,
  QuizTitleLength,
} from "../atom/Atom";
import { isMobile } from "react-device-detect";
import Hint1 from "../components/Hint1";
import Hint2 from "../components/Hint2";
import Hint3 from "../components/Hint3";
import styled from "styled-components";
import config from "../config";
import trail from "../assets/img/trail.png"; // Corrected import statement
import poster from "../assets/img/poster.png"; // Corrected import statement
import film from "../assets/img/film.png"; // Corrected import statement

const Quiz = () => {
  const navigate = useNavigate();
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  const [quizHintUsed, setQuizHintUsed] = useRecoilState(QuizHintUsed);
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);

  let { quizNumber } = useParams();
  let quizNum = parseInt(quizNumber);
  const [Answer, setAnswer] = useState("");
  const [hint1, setHint1] = useState(true);
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);
  const hintString = "O".repeat(
    quiztitlelength[quizNum - 1].length - Answer.length
  );
  useEffect(() => {
    /* 
    console.log(quizHintUsed, ":: QuizHintUsed");
 */
  }, [quizidx.length, quizHintUsed, setQuizHintUsed]);

  const updateHintUsage = (hintNumber) => {
    setQuizHintUsed((currentHints) =>
      currentHints.map((hint, index) =>
        index === quizNum - 1 ? { ...hint, [`hint${hintNumber}`]: true } : hint
      )
    );
  };

  const onClickSubmit = () => {
    // Update the quiz answers state with the new answer
    setQuizans((currentAnswers) => {
      const updatedAnswers = [...currentAnswers];
      updatedAnswers[quizNum - 1] = Answer; // Assuming the quizNum corresponds to the index in the array
      return updatedAnswers;
    });

    nextQuiz();
    resetHints();
  };
  const resetHints = () => {
    setHint1(true);
    setHint2(false);
    setHint3(false);
    setAnswer("");
  };
  const nextQuiz = () => {
    if (quizNum < 6) {
      navigate(`/quiz/${quizNum + 1}`);
      setAnswer("");
    } else {
      navigate("/user");
    }
  };

  const onClickHint = (hintNumber) => {
    setHint1(hintNumber === 1);
    setHint2(hintNumber === 2);
    setHint3(hintNumber === 3);
    updateHintUsage(hintNumber);
  };

  const renderHintComponent = () => {
    if (hint1)
      return <Hint1 number={quizidx[quizNum - 1]} isMobile={isMobile} />;
    if (hint2)
      return <Hint2 number={quizidx[quizNum - 1]} isMobile={isMobile} />;
    if (hint3)
      return <Hint3 number={quizidx[quizNum - 1]} isMobile={isMobile} />;
    return null;
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <Title>{quizNum} Quiz</Title>
        {/* 
        <Hint>Points: </Hint>
         */}
      </div>
      <ButtonWrapper>
        <Button onClick={() => onClickHint(1)}>
          <img src={trail} alt="trail" width={36} height={36} />{" "}
          <Hint>Hint1 - 명대사 & OST</Hint>
        </Button>
        <Button onClick={() => onClickHint(2)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src={film} alt="film" width={36} height={36} />
            <Hint></Hint>
          </div>
          <Hint>Hint2 - 영화 속 장면</Hint>
        </Button>
        <Button onClick={() => onClickHint(3)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img src={poster} alt="poster" width={36} height={36} />{" "}
            <Hint></Hint>
          </div>
          <Hint>Hint3 - 영화 포스터</Hint>
        </Button>
      </ButtonWrapper>

      <InputContainer>
        <InputLabel>정답</InputLabel>
        <div>
          <AnswerSheet>
            {Answer}
            {hintString}
          </AnswerSheet>
          <Input
            type="input"
            placeholder="정답을 입력해주세요"
            onChange={(e) => {
              const newValue = e.target.value.trim();
              // 입력 값의 길이가 quiztitlelength[quizNum - 1].length 이하인지 확인
              if (newValue.length <= quiztitlelength[quizNum - 1].length) {
                setAnswer(newValue); // 조건을 만족하면 상태 업데이트
              }
            }}
            value={Answer}
            onKeyPress={(e) => e.key === "Enter" && onClickSubmit()}
          />
        </div>
        <Button onClick={onClickSubmit}>제출하기</Button>
      </InputContainer>
      <HintWrapper>{renderHintComponent()}</HintWrapper>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
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
  padding-right: 10px;
`;
const Input = styled.input`
  margin-top: 10px;
  font-size: 12px;
  color: #033e93;
  height: 30px;
  border: 0; /* 나머지 테두리를 제거합니다 */
  border-bottom: 1px solid #033e93; /* 아래쪽 테두리만 추가 */
  padding-left: 10px;
  padding-right: 10px;
`;

const ButtonWrapper = styled.div`
  width: "360px";
  height: "88px";
  display: flex;
  flex-direction: row;
  justify-content: ${isMobile ? "center" : "space-evenly"};
  margin-top: "10px";
`;
const HintWrapper = styled.div`
  width: 60%;
  height: 250px; // 높이를 200px로 고정
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
  flex-direction: column;
  padding: 0.3rem 0.875rem;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 4px;
  word-break: keep-all;
  margin: 5px;
  font-family: "DoHyeon-Regular";
  border: 0.5px solid rgb(200, 200, 200);
  background-color: "red";
`;
const Hint = styled.div`
  font-size: 10pt;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
const AnswerSheet = styled.div`
  font-size: 10pt;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;
const Title = styled.div`
  font-size: 20pt;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "DoHyeon-Regular";
  padding-right: 10px;
`;
