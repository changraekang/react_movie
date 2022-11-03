import React from "react";
import Button from "react-bootstrap/Button";

const { Kakao } = window;

const KakaoShareButton = () => {
  const url = "https://moviequizrae.fun";
  const resultUrl = window.location.href;
  React.useEffect(() => {
    Kakao.init("706b058dedece1187fba96396b9d2738");
  }, []);
  const shareKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "😼예비집사 판별기 결과😼",
        description: `예비 집사님이 고양이를 키운다면 가장 잘맞는 고양이는 입니다.`,
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
