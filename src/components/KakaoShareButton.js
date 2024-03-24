import React from "react";
import Button from "react-bootstrap/Button";
import config from "../config";

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
      <Button variant="danger" onClick={shareKakao}>
        카카오톡 공유하기
      </Button>
    </>
  );
};

export default KakaoShareButton;
