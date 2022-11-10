import { useCallback, useState } from "react";
import styled from "styled-components";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import {
  getMovieImages,
  getMovies,
  getMoviesTrailer,
  getMoviesPopular,
  IGetMovieImages,
  IGetMoviesResult,
  IGetMoviesTrailer,
} from "../../Api/api";
import Loading from "../../Styles/Loading";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { isSoundAtom, SoundEnums } from "../../Recoil/Atom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

export const Overlays = styled(motion.div)`
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

export const PageChange = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
`;

export const Increase = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform-origin: center left;
`;

export const Decrease = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  opacity: 0.7;
  transform-origin: center left;
`;

export const Span1 = styled(motion.span)`
  color: white;
  z-index: 30;
  font-size: 30px;
  margin-left: 40px;
  margin-right: 20px;
  font-weight: 600;
  position: absolute;
  top: -150px;
  left: 20px;
`;
export const SliderContainer = styled(motion.div)`
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
`;
export const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  position: absolute;
  width: 95%;
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  position: relative;
  background-color: white;
  height: 200px;
  border-radius: 4px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
export const InfoTitle = styled(motion.div)`
  padding: 10px;
  background-color: black;
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    color: white;
    font-size: 18px;
  }
`;
export const titleVars = {
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
export const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 2000,
    scale: 1.2,
    y: 40,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
  exit: {
    zIndex: 2000,
  },
};
export const rowVars = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : window.outerWidth - 10,
  }),
};
export const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.1,
      type: "tween",
    },
  },
};

function Movies() {
  const navigate = useNavigate();
  const stateMovieId = localStorage.getItem("movieId");
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    ["nowPlaying"],
    getMovies
  );
  const { data: Info } = useQuery<IGetMoviesResult>(
    ["Movies", "NowPlaying"],
    getMoviesPopular
  );
  const { data: trailer } = useQuery<IGetMoviesTrailer>(
    ["startMovieTrailer"],
    () => getMoviesTrailer(String(stateMovieId))
  );
  const { data: logo } = useQuery<IGetMovieImages>(["movieLogo"], () =>
    getMovieImages(String(stateMovieId))
  );

  const [leaving, setLeaving] = useState(false);
  const [isVolum, setIsVolum] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [index, setIndex] = useState(0);
  const [isSound, setIsSound] = useRecoilState<SoundEnums>(isSoundAtom);
  const { OFF, ON } = SoundEnums;
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

  let offset = 6;
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = info?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = info?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setIsVolum(true);
  };

  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayWrapper>
            <Overlays>
            {/* movie trailer */}
            </Overlays>
          </PlayWrapper>
          <SliderContainer>
            <Span1>Tranding Now</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence
                custom={isBack}
                initial={false}
                onExitComplete={toggleLeaving}
              >
                <Row
                  custom={isBack}
                  variants={rowVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {info?.results
                    ?.slice(index * offset + 1, index * offset + offset + 1)
                    .map((movie, index) => (
                      <Box
                        layoutId={movie.id + ""}
                        onClick={() => onBoxClicked(movie.id)}
                        key={index}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        bgphoto={
                          makeImagePath(movie.backdrop_path, "w500") ||
                          NothingPoster
                        }
                      >
                        <InfoTitle variants={infoVars}>
                          <h4>{movie.title}</h4>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
        </>
      )}
    </Wrapper>
  );
}
export default Movies;
