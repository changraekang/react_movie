import React from "react";
import styled from "styled-components";
import config from "../config";

const Hint3 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`${config.assetsUrl}/level3/${number}.jpg`}
        alt=""
        width={"175px"}
        height={"250px"}
      />
    </Wrapper>
  );
};

export default Hint3;
const Wrapper = styled.div`
  display: flex;
`;
