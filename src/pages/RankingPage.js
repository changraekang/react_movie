import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { useRecoilState } from "recoil";
import { QuizQuestion, QuizAnswer, QuizUser, Ranking } from "../atom/Atom";
import Loading from "../components/Loading";
import axios from "axios";
import KakaoShareButton from "../components/KakaoShareButton";
let now = new Date(); // 현재 날짜 및 시간
let month = now.getMonth() + 1; // 월
let year = now.getFullYear();
const RankingPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [score, setScore] = useRecoilState(Ranking);
  const [user, setUser] = useRecoilState(QuizUser);
  const [rankuser, serRankuser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [quizans, setQuizans] = useRecoilState(QuizAnswer);

  const userId = searchParams.get("userId");
  const username = searchParams.get("username");
  const navigate = useNavigate();

  const restart = () => {
    navigate("/quiz");
    setQuizans([]);
  };
  const home = () => {
    navigate("/");
    setQuizans([]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.moviequizrae.fun/api/quizs`);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      <RankingSheet>
        <Header>무퀴즈온더블록</Header>
        <Tabs>{month}월의 Ranking</Tabs>
        <Tabs>
          {username ? (
            <>
              {username}님의 점수:{score}
            </>
          ) : null}
        </Tabs>
        <Tabs>
          <No> No</No>
          <QuizAnswer2> User</QuizAnswer2>
          <UserAnswer> Score</UserAnswer>
        </Tabs>
        {loading ? (
          <Loading />
        ) : (
          <Quizzes>
            <FlexColumn>
              {posts.map((row, idx) => (
                <TradeOdd
                  key={idx}
                  style={
                    row.idranking == userId
                      ? { backgroundColor: "#FFFFB2", border: "1px solid red" }
                      : idx % 2 != 0
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "rgb(232, 246, 255)" }
                  }
                >
                  <No>{row.score_rank}</No>
                  <QuizAnswer2>{row.rankinguser}</QuizAnswer2>
                  <QuizAnswer2>{row.rankingscore}</QuizAnswer2>
                </TradeOdd>
              ))}
            </FlexColumn>
          </Quizzes>
        )}
        {username ? (
          <ButtonGroups>
            <Button onClick={restart}> 다시풀기</Button>
            <KakaoShareButton name={username} data={score}></KakaoShareButton>
          </ButtonGroups>
        ) : (
          <ButtonGroups>
            <Button onClick={home}> 홈으로 </Button>
          </ButtonGroups>
        )}
      </RankingSheet>
    </Wrapper>
  );
};

export default RankingPage;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "DoHyeon-Regular";
`;
const RankingSheet = styled.div`
  height: 100vh;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Tabs = styled.div`
  display: flex;
  font-size: 24px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 30px;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const Quizzes = styled.div`
  display: flex;
  width: 100%;
  flex: 0 0 30px;
`;

const TradeOdd = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  width: 100%;
  height: 23px;
  background-color: rgb(232, 246, 255);
`;
const TradeEven = styled.div`
  display: flex;
  font-size: 14px;
  height: 23px;
`;

const No = styled.div`
  width: 100%;
  text-align: center;
`;

const UserAnswer = styled.div`
  width: 100%;
  text-align: center;
`;

const QuizAnswer2 = styled.div`
  width: 100%;
  text-align: center;
`;

const Rise = styled.div`
  color: #d60000;
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const FlexColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;
const Header = styled.div`
  font-size: 30pt;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "DoHyeon-Regular";
`;

const ButtonGroups = styled.div`
  width: ${isMobile ? "100%" : "431px"};
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  font-family: "DoHyeon-Regular";
`;
