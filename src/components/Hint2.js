import React from "react";
import styled from "styled-components";
import config from "../config";

const Hint2 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`${config.assetsUrl}/level2/${number}.jpg`}
        alt=""
        width={"250px"}
        height={"175px"}
      />
    </Wrapper>
  );
};

export default Hint2;
const Wrapper = styled.div`
  display: flex;
`;
