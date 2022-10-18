import styled from "styled-components";
function Loading() {
  return (
    <Wrapper>
      <span>Loading...</span>
    </Wrapper>
  );
}

export default Loading;
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: black;
`;
