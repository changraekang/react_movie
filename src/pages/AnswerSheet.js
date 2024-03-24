import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  QuizQuestion,
  QuizAnswer,
  QuizUser,
  Ranking,
  QuizTitleLength,
} from "../atom/Atom";
import styled from "styled-components";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import config from "../config";
import QuizSolve from "./QuizSolve";
import KakaoShareButton from "../components/KakaoShareButton";
const AnswerSheet = () => {
  const [quizidx, setQuizidx] = useRecoilState(QuizQuestion);
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);
  const [score, setScore] = useRecoilState(Ranking);
  const [user, setUser] = useRecoilState(QuizUser);
  const [quizNum, setQuizNum] = useState();
  const [quizSovle, setQuizSolve] = useState();
  const [reQuizSeed, setReQuizSeed] = useState([]);
  const [rankuser, serRankuser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScoreOpen, setIsScoreOpen] = useState(true);
  const [answerScore, setAnswerScore] = useState("");
  const [quiztitlelength, setQuizTitlelength] = useRecoilState(QuizTitleLength);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  const combinedQuizData = quizans.map((answer, index) => ({
    no: index + 1, // Assuming quiz number starts at 1
    userAnswer: answer,
    correctAnswer: quiztitlelength[index]?.answer,
  }));
  const handleOpenModal = (quizNum, quizSolve) => {
    setQuizNum(quizNum);
    setQuizSolve(quizSolve);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchQuizLength = async () => {
    let quizSeed = [];
    for (let i = 0; i < 6; i++) {
      let num;
      do {
        num = Math.floor(Math.random() * 160) + 1;
      } while (quizSeed.includes(num)); // 이미 생성된 숫자인지 확인합니다.
      quizSeed.push(num);
    }
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
    setQuizidx(quizSeed);
    try {
      const response = await fetch(`${config.apiUrl}/quizs/hint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizidx: quizSeed }), // quizidx 배열을 JSON 형식으로 변환하여 전송
      });
      const data = await response.json();
      // 데이터의 길이에 따라 버튼 활성화 상태 결정
      setQuizTitlelength(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz length:", error);
    }
  };

  const onRestart = async () => {
    setLoading(true);
    await fetchQuizLength();
    return navigate("/quiz/1", { state: "in" });
  };

  // Calculate correct answers
  const correctAnswers = combinedQuizData.filter(
    (quiz) => quiz.correctAnswer === quiz.userAnswer
  ).length;

  // useEffect to show popup message based on number of correct answers
  useEffect(() => {
    if (correctAnswers >= 6) {
      setAnswerScore(username + "님은 씨네필이네요🎉🎉");
    } else if (correctAnswers >= 3) {
      setAnswerScore(username + "님은 영화 매니아시네요👍👍");
    } else {
      setAnswerScore(`${correctAnswers}개 맞추셨습니다.`);
    }
  }, [correctAnswers, username]);
  return (
    <Container>
      <Header>{username === "" ? "영덕후님" : username}님의 답지</Header>
      {combinedQuizData.map((quiz, index) => (
        <QuizItem key={index}>
          <QuestionNo>{`Quiz ${index + 1}`}</QuestionNo>
          <div>
            <Question>{`${username === "" ? "영덕후님" : username}님의 답: ${
              quiz.userAnswer
            }`}</Question>
            <Question>{`정답: ${quiz.correctAnswer}`}</Question>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              right: 0,
              marginTop: "4px",
              height: "60px",
            }}
          >
            {quiz.correctAnswer === quiz.userAnswer ? (
              <AnswerButton>O</AnswerButton>
            ) : (
              <WrongButton>X</WrongButton>
            )}
            <QuizMove
              onClick={() =>
                handleOpenModal(quizidx[index], quiz.correctAnswer)
              }
            >
              문제보기
            </QuizMove>
          </div>
        </QuizItem>
      ))}
      {isModalOpen && (
        <LoadingModalWrapper onClick={handleCloseModal}>
          <QuizSolve
            onClose={handleCloseModal}
            quizNum={quizNum}
            quizSovle={quizSovle}
          />
        </LoadingModalWrapper>
      )}
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          display: "flex",
          paddingTop: "20px",
        }}
      >
        <Button onClick={onRestart}>다시풀기</Button>
        <KakaoShareButton description={answerScore}></KakaoShareButton>
        {/* <Button>공유하기</Button> */}
      </div>
      {loading && <Loading></Loading>}
      {isScoreOpen && (
        <Wrapper>
          <Modal>
            <ModalWrapper>
              <ModalContent>
                <WrapContents>{answerScore}</WrapContents>
              </ModalContent>
              <Button onClick={() => setIsScoreOpen(false)}>닫기</Button>
            </ModalWrapper>
          </Modal>
        </Wrapper>
      )}
    </Container>
  );
};

export default AnswerSheet;
const Container = styled.div`
  font-family: "DoHyeon-Regular";
  margin-top: 15px;
`;

const Header = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "DoHyeon-Regular";
`;

const QuizMove = styled.div`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
  border-radius: 12px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #cceafb;
  margin-top: 5px;
  font-family: "DoHyeon-Regular";
`;

const QuizItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-family: "DoHyeon-Regular";
`;

const Question = styled.div`
  font-size: 14px;
  font-family: "DoHyeon-Regular";
  word-break: keep-all;
`;
const QuestionNo = styled.div`
  font-size: 18px;
  width: 20%;
  font-family: "DoHyeon-Regular";
  word-break: keep-all;
`;

const AnswerButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: #0095eb;
  cursor: pointer;
`;
const WrongButton = styled.button`
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 12px;
  color: white;
  border: none;
  background-color: #f04040;
  cursor: pointer;
`;
const LoadingModalWrapper = styled.div`
  position: fixed;
  flex-direction: column;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px; // 패딩을 70%로 조정
  color: white;
  font-size: 1rem; // 폰트 크기를 70%로 조정
  background-color: #0095eb;
  cursor: pointer;
  word-break: keep-all;
  // 여백을 70%로 조정
  font-family: "DoHyeon-Regular";
`;
const Wrapper = styled.div`
  position: fixed;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard-Regular";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 40px 0;
  border-radius: 16px;
  min-width: 400px;
`;

const WrapContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 0 0;
  font-family: "Pretendard-Regular";
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  padding: 16px 24px 16px 16px;
  pointer-events: auto;
  border-radius: 8px;
  outline: 0;
  margin-bottom: 24px;
`;
