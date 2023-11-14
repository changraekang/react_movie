import React from "react";
import styled from "styled-components";
import config from "../config";

const Hint3 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`${config.assetsUrl}/level3/${number}.jpg`}
        alt=""
        width={isMobile ? "175px" : "350px"}
        height={isMobile ? "250px" : "500px"}
      />
    </Wrapper>
  );
};

export default Hint3;
const Wrapper = styled.div`
  display: flex;
`;
