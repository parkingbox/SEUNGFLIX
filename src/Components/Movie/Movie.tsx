import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getMovies, IGetMoviesResult } from "../../Api/api";
import Loading from "../../Styles/Loading";

const Wrapper = styled.div`
  height: 100%;
  min-width: 1400px;
  background: black;
  overflow-x: hidden;
`;
const PlayerContainer = styled.div`
  min-width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media all and (max-width: 1024px) {
    height: 100vh;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 100vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: absolute;
`;

const SliderContainer = styled(motion.div)`
  height: 200px;
  width: 100%;
  background-color: green;
`

const SliderControl =styled(motion.div)`
  width: 92%;
  height: 50px;
  display: flex;
  color: white;
  margin-bottom: 5px;
  justify-content: space-between;
  align-items: center;
`
const Span1 = styled(motion.span)`
  color:white;
  z-index:30;
  font-size: 30px;
  margin-left: 40px;
  margin-right: 20px;
  font-weight: 600;
`

function Movie() {
  const navigate = useNavigate();
  const movieMatch = useMatch(`/movie/:movie:Id`);
  const { scrollY } = useScroll();
  const stateMovieId = localStorage.getItem("movieId");
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    ["nowPlaying"],
    getMovies
  );
  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayerContainer>
          </PlayerContainer>
          <Banner/>

          <SliderContainer>
            <SliderControl>
                <Span1>SEUNGFLIX 인기 콘텐츠</Span1>
            </SliderControl>
          </SliderContainer>


        </>
      )}
    </Wrapper>
  );
}
export default Movie;
