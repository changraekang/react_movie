import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Quiz = () => {
  const { state } = useLocation();
  return (
    <Wrapper>
      <h1>{state} Quiz</h1>
      <ProgressBar
        striped
        variant="info"
        now={50}
        style={{ marginTop: "20px" }}
      />
      <input></input>
    </Wrapper>
  );
};

export default Quiz;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;
