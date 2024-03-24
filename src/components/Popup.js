import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

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

const Button = styled.div`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  color: #7124d3;
  background: #ffffff;
  border: 1px solid #7124d3;
  border-radius: 24px;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: #7124d3;
    color: #ffffff;
  }
`;
const Popup = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("test");

  const renderModal = () => {
    return (
      <ModalWrapper>
        <ModalContent>
          <WrapContents>{alertMessage}</WrapContents>
        </ModalContent>
      </ModalWrapper>
    );
  };
  return (
    <Wrapper>
      <Modal onClick={(event) => event.stopPropagation()}>
        {renderModal()}
      </Modal>
    </Wrapper>
  );
};

export default Popup;
