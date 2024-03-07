import styled from "styled-components";
import loader from "../assets/img/loader.gif";
function Loading() {
  return (
    <Wrapper>
      <StyledImage src={loader} alt="Loading..." />
    </Wrapper>
  );
}

export default Loading;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  color: black;
  background-color: white;
  z-index: 1000000000000;
  background-color: white;
`;
const StyledImage = styled.img`
  width: 100%; // 이미지 크기, 필요에 따라 조절
  height: 100%; // 이미지 크기, 필요에 따라 조
  object-fit: contain;
`;
