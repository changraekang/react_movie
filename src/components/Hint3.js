import React from "react";
import styled from "styled-components";

const Hint3 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`https://static.moviequizrae.fun/level3/${number}.jpg`}
        alt=""
        width={350}
        height={500}
      />
    </Wrapper>
  );
};

export default Hint3;
const Wrapper = styled.div`
  width: ${(isMobile) => (isMobile ? "" : "175px")};
  height: ${(isMobile) => (isMobile ? "" : "250px")};
  display: flex;
`;
