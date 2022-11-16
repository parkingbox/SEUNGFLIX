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
  getMoviesTop,
  getMoviesWeek,
} from "../../Api/api";
import Loading from "../../Styles/Loading";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";
import { isSoundAtom, SoundEnums } from "../../Recoil/Atom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Wrapper = styled.div`
  background: black;
  height: 100%;
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
  @media screen and (max-width: 1280px) {
    font-size: 20px;
    top: -110px;
    margin-left: 20px;
  }
`;
export const SliderContainer = styled(motion.div)`
  height: 200px;
  width: 100%;
  position: relative;
  margin-bottom: 5%;
  @media screen and (max-width: 1280px) {
    margin-bottom: 1%;
  }
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
  @media screen and (max-width: 1280px) {
    height: 150px;
  }
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
  @media screen and (max-width: 1280px) {
    height: 150px;
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

  //API
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: pInfo } = useQuery<IGetMoviesResult>(
    ["pMovies", "pNowPlaying"],
    getMoviesPopular
  );
  const { data: tInfo } = useQuery<IGetMoviesResult>(
    ["tMovies", "tNowPlaying"],
    getMoviesTop
  );
  const { data: wInfo } = useQuery<IGetMoviesResult>(
    ["wMovies", "wNowPlaying"],
    getMoviesWeek
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

  //INDEX
  const [index, setIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const [wIndex, setWIndex] = useState(0);

  let offset = 6;
  //Index of Movie box
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

  const increasePIndex = () => {
    if (pInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = pInfo?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setPIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreasePIndex = () => {
    if (pInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = pInfo?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setPIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = tInfo?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = tInfo?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseWIndex = () => {
    if (wInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = wInfo.results.length - 1 ;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setWIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseWIndex = () => {
    if (wInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalMovies = wInfo?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setWIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
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
            <Overlays>{/* movie trailer */}</Overlays>
          </PlayWrapper>
          <SliderContainer>
            <Span1>Trending Now</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                  {info?.results
                    .slice(1)
                    .slice(index * offset + 1, index * offset + offset + 1)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500") || NothingPoster}
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{movie.title}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>Only on Seungflix</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreasePIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increasePIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={pIndex}>
                  {pInfo?.results
                    .slice(pIndex * offset + 1, pIndex * offset + offset + 1)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + "p"}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500") || NothingPoster}
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{movie.title}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>Movie of the Week</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseWIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseWIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={wIndex}>
                  {wInfo?.results
                    .slice(wIndex * offset + 1, wIndex * offset + offset + 1)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + "w"}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500") || NothingPoster}
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{movie.title}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>Top Rated Movies</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseTIndex}>
                  <ArrowBackIosIcon style={{ marginLeft: 20 }} fontSize="large" />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseTIndex}>
                  <ArrowForwardIosIcon fontSize="large" />
                </Increase>
              </PageChange>
              <AnimatePresence custom={isBack} initial={false} onExitComplete={toggleLeaving}>
                <Row custom={isBack} variants={rowVars} initial="invisible" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={tIndex}>
                  {tInfo?.results
                    .slice(1)
                    .slice(tIndex * offset + 1, tIndex * offset + offset + 1)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + "t"}
                        key={movie.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgphoto={makeImagePath(movie.backdrop_path, "w500") || NothingPoster}
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{movie.title}</p>
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
