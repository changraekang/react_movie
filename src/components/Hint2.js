import React from "react";
import styled from "styled-components";

const Hint2 = ({ number, isMobile }) => {
  return (
    <Wrapper>
      <img
        src={`https://static.moviequizrae.fun/level2/${number}.jpg`}
        alt=""
        width={500}
        height={350}
      />
    </Wrapper>
  );
};

export default Hint2;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
