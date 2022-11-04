import { useCallback, useState } from "react";
import styled from "styled-components";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import {
  getMovieImages,
  getMovies,
  getMoviesTrailer,
  IGetMovieImages,
  IGetMoviesResult,
  IGetMoviesTrailer,
} from "../../Api/api";
import Loading from "../../Styles/Loading";
import { makeImagePath } from "../../Api/utils";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { isSoundAtom, SoundEnums } from "../../Recoil/Atom";

const Wrapper = styled.div`
  min-width: 1400px;
  background: black;
  height: 80vh;
`;
const PlayContainer = styled.div<{ bgPhoto: string }>`
  min-width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  overflow: hidden;
`;
const Title = styled(motion.img)`
  width: 30%;
  margin-left: 20px;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const Banner = styled.div`
  width: 100%;
  height: 80vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: absolute;
`;

const Overlays = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      rgba(20, 20, 20, 0.1643251050420168) 85%,
      rgba(20, 20, 20, 1) 100%
    ),
    linear-gradient(
      0deg,
      rgba(20, 20, 20, 1) 14%,
      rgba(20, 20, 20, 0.15592174369747902) 28%
    );
`;

const titleVars = {
  animate: (lowR: boolean) => ({
    scale: 0.8,
    y: lowR ? "60%" : "40%",
    x: -20,
    transition: {
      delay: 5,
      duration: 1,
    },
  }),
};

function Movies() {
  const navigate = useNavigate();
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    ["nowPlaying"],
    getMovies
  );
  const stateMovieId = localStorage.getItem("movieId");
  const { data: trailer } = useQuery<IGetMoviesTrailer>(
    ["startMovieTrailer"],
    () => getMoviesTrailer(String(stateMovieId))
  );
  const { data: logo } = useQuery<IGetMovieImages>(["movieLogo"], () =>
    getMovieImages(String(stateMovieId))
  );

  const [isVolum, setIsVolum] = useState(false);
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);

  const { OFF, ON } = SoundEnums;
  const [lowR, setLowR] = useState(false);

  //Sound ON, OFF
  const handleChangeSound = useCallback((): void => {
    if (isSound === OFF) {
      localStorage.setItem("sound", ON);
      setIsSound(ON);
      return;
    }
    localStorage.setItem("sound", OFF);
    setIsSound(OFF);
  }, [OFF, ON, isSound, setIsSound]);

  // movie showing
  let offset = 6;

  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayContainer
            bgPhoto={makeImagePath(info?.results[0].backdrop_path || "")}
          ></PlayContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Movies;
