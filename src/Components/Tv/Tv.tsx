import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTv, getTvAir, getTvTop, IGetTVResult } from "../../Api/api";
import Loading from "../../Styles/Loading";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import TvDetail from "../Detail/TvDetail";

const Wrapper = styled.div`
  background: black;
  height: 80vh;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const PageChange = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  @media screen and (max-width: 1280px) {
    height: 150px;
  }
`;

export const Increase = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transform-origin: center right;
`;

export const Decrease = styled(motion.div)`
  width: 50px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0.7;
  transform-origin: center left;
`;
export const InfoTitle = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  z-index: 5;
  width: 100%;
  bottom: 0;
  p {
    font-size: 18px;
    text-align: center;
  }
`;
const Overlays = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
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

export const Modal = styled(motion.div)`
  width: 50%;
  height: 90vh;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 200;
`;

export const ModalCover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 50px;
    background: black;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
  border-radius: 50px 0 0 50px;
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
  
  const Slider = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3px;
    position: absolute;
    width: 95%;
    @media screen and (max-width: 1280px) {
      height: 150px;
    }
  `;
  
  const Box = styled(motion.div)<{ bgphoto: string }>`
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

export const rowVars = {
  invisible: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};

const boxVars = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 2000,
    scale: 1.1,
    y: -40,
    transition: {
      delay: 0.1,
      type: "tween",
    },
  },
  exit: {
    zIndex: 2000,
  },
};

export const infoVars = {
  hover: {
    opacity: 1,
    transition: {
      duaration: 0.1,
      type: "tween",
    },
  },
};

function Tv() {
  const navigate = useNavigate();
  const ModalMatch = useMatch("/tv/:tvId");
  const { scrollY } = useScroll();
  const stateTvId = localStorage.getItem("tvId");

  const { data: info, isLoading: infoLoading } = useQuery<IGetTVResult>(
    ["tvs", "nowPlaying"],
    getTv
  );
  const { data: aInfo } = useQuery<IGetTVResult>(
    ["tvsAir", "airPlaying"],
    getTvAir
  );
  const { data: tInfo } = useQuery<IGetTVResult>(
    ["tvsTop", "topPlaying"],
    getTvTop
  );
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isVolum, setIsVolum] = useState(false);

  //INDEX
  const [index, setIndex] = useState(0);
  const [aIndex, setAIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);

  const [aDex, setADex] = useState(false);
  const [tDex, setTDex] = useState(false);
  
  let offset = 6;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setIsVolum(true);
  };
  const onABoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setADex((prev) => !prev);
    setIsVolum(true);
  };

  const onTBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setTDex((prev) => !prev);
    setIsVolum(true);
  };


  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = info.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = info.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseAIndex = () => {
    if (aInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = aInfo.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setAIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseAIndex = () => {
    if (aInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = aInfo.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setAIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const increaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalTvs = tInfo.results.length;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseTIndex = () => {
    if (tInfo) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(true);
      const totalTvs = tInfo.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setTIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const onOverlayClicked = () => {
    navigate(`/tv`);
    setIsVolum(false);
    if (aDex === true) {
      setADex((prev) => !prev);
    }
    if (tDex === true) {
      setTDex((prev) => !prev);
    }
  };

  const clickedTv =
    ModalMatch?.params.tvId &&
    info?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);
  const clickedATv =
    ModalMatch?.params.tvId &&
    aInfo?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);
  const clickedTTv =
    ModalMatch?.params.tvId &&
    tInfo?.results.find((tv) => tv.id + "" === ModalMatch.params.tvId);

  const ModalID = aDex
    ? ModalMatch?.params.tvId + "a"
    : tDex
    ? ModalMatch?.params.tvId + "t"
    : ModalMatch?.params.tvId;

  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(info?.results[0].backdrop_path || "")}>
            <Title>{info?.results[0].name}</Title>
            <Overview>{info?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            <Span1>Trending Now</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseIndex}>
                  <ArrowBackIosIcon
                    style={{ marginLeft: 20 }}
                    fontSize="large"
                  />
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
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {info?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + ""}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id)}
                        bgphoto={
                          tv.backdrop_path === null
                            ? NothingPoster
                            : makeImagePath(tv.backdrop_path, "w500")
                        }
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{tv.name}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>Top Rated Tv Show</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseTIndex}>
                  <ArrowBackIosIcon
                    style={{ marginLeft: 20 }}
                    fontSize="large"
                  />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseTIndex}>
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
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={tIndex}
                >
                  {tInfo?.results
                    .slice(1)
                    .slice(offset * tIndex, offset * tIndex + offset)
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + "t"}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onTBoxClicked(tv.id)}
                        bgphoto={
                          tv.backdrop_path === null
                            ? NothingPoster
                            : makeImagePath(tv.backdrop_path, "w500")
                        }
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{tv.name}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <SliderContainer>
            <Span1>On Air TV Show</Span1>
            <Slider>
              <PageChange>
                <Decrease whileHover={{ scale: 1.2 }} onClick={decreaseAIndex}>
                  <ArrowBackIosIcon
                    style={{ marginLeft: 20 }}
                    fontSize="large"
                  />
                </Decrease>
                <Increase whileHover={{ scale: 1.2 }} onClick={increaseAIndex}>
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
                  initial="invisible"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={aIndex}
                >
                  {aInfo?.results
                    .slice(1)
                    .slice(offset * aIndex, offset * aIndex + offset)
                    .map((tv) => (
                      <Box
                        layoutId={tv.id + "a"}
                        key={tv.id}
                        whileHover="hover"
                        initial="normal"
                        exit="exit"
                        variants={boxVars}
                        transition={{ type: "tween" }}
                        onClick={() => onABoxClicked(tv.id)}
                        bgphoto={
                          tv.backdrop_path === null
                            ? NothingPoster
                            : makeImagePath(tv.backdrop_path, "w500")
                        }
                      >
                        <InfoTitle variants={infoVars}>
                          <p>{tv.name}</p>
                        </InfoTitle>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderContainer>
          <AnimatePresence>
            {ModalMatch ? (
              <>
                <Overlays
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <Modal style={{ top: scrollY.get() + 100 }} layoutId={ModalID}>
                  {(clickedTv || clickedATv || clickedTTv) && (
                    <>
                      <ModalCover>
                        <TvDetail />
                      </ModalCover>
                    </>
                  )}
                </Modal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;