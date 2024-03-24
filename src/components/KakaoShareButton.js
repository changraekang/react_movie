import React from "react";
import config from "../config";
import styled from "styled-components";
import kakao_ico from "../assets/img/kakao_ico.png"; // Corrected import statement

const { Kakao } = window;

const KakaoShareButton = ({ description }) => {
  const url = "https://quiz.movie-hop.com";
  const resultUrl = window.location.href;
  React.useEffect(() => {
    try {
      if (!Kakao.isInitialized()) {
        Kakao.init("eb4472ecd006a9da646f733ee652b9dd");
        Kakao.isInitialized();
      } else {
      }
    } catch (e) {}
  }, []);
  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "영덕후능력평가 결과",
        description: description,
        imageUrl: `${config.assetsUrl}/logo/popcorn.jpeg`,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <>
      <Button onClick={shareKakao}>
        공유하기 <img src={kakao_ico} alt="kakao_ico" width={30} height={35} />{" "}
      </Button>
    </>
  );
};

export default KakaoShareButton;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 10px;
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 25px; // 패딩을 70%로 조정
  color: #3a1c1c;
  font-size: 1rem; // 폰트 크기를 70%로 조정
  background-color: #fae301;
  cursor: pointer;
  word-break: keep-all;
  // 여백을 70%로 조정
  font-family: "DoHyeon-Regular";
`;
