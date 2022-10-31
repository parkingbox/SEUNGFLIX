import styled from "styled-components"


const Container = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
`

const Loading = () => {
  return (
    <>
      <Container>
        Loading...
      </Container>
    </>
  );
};
export default Loading;