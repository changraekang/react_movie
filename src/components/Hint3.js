import React from "react";
import styled from "styled-components";

const Hint3 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`https://moviequiz-asset.s3.ap-southeast-2.amazonaws.com/moviequiz/level3/${number}.jpg`}
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
