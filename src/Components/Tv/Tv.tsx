import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components"
import { getTv, IGetTVResult } from "../../Api/api";
import Loading from "../../Styles/Loading";
import { SliderContainer } from "../Movie/Movie";

const Wrapper = styled.div`
  min-width: 1400px;
  background: black;
  height: 80vh;
`;
const PlayWrapper = styled.div`
  min-width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

function Tv() {
  const {data:info, isLoading: infoLoading } = useQuery<IGetTVResult>(["tvs","nowPlaying"], getTv);
  return(
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayWrapper>
          {/* TV trailer */}
          </PlayWrapper>
          <SliderContainer>

          </SliderContainer>
        </>
      )}
    </Wrapper>
  )
};

export default Tv;
