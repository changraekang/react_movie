import React from "react";
import Button from "react-bootstrap/Button";

const { Kakao } = window;

const KakaoShareButton = ({ name, data }) => {
  const url = "https://moviequizrae.fun";
  const resultUrl = window.location.href;
  React.useEffect(() => {
    Kakao.init("7dd6d528b40979ba800bbad6b5633ea0");
  }, []);
  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "영덕후능력평가 결과",
        description: `${name}의 점수는 ${data} 입니다`,
        imageUrl: "http://static.moviequizrae.fun/logo/popcorn.jpeg",
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
