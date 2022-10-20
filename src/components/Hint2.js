import React from "react";
import styled from "styled-components";

const Hint2 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`https://static.moviequizrae.fun/level2/${number}.jpg`}
        alt=""
        width={isMobile ? "250px" : "500px"}
        height={isMobile ? "175px" : "350px"}
      />
    </Wrapper>
  );
};

export default Hint2;
const Wrapper = styled.div`
  display: flex;
`;
