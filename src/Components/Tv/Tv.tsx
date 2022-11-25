import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTv, getTvAir, getTvTop, IGetTVResult } from "../../Api/api";
import Loading from "../../Styles/Loading";
import {
  Decrease,
  Increase,
  InfoTitle,
  PageChange,
  Row,
  Box,
  rowVars,
  Slider,
  SliderContainer,
  Span1,
  boxVars,
  infoVars,
  Overlays,
  Modal,
  ModalCover,
} from "../Movie/Movie";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeImagePath, NothingPoster } from "../../Api/utils";
import TvDetail from "../Detail/TvDetail";

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

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setIsVolum(true);
  };
  let offset = 6;
  const increaseIndex = () => {
    if (info) {
      if (leaving) return;
      toggleLeaving();
      setIsBack(false);
      const totalMovies = info?.results.length;
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
          <PlayWrapper>
          <Banner
            bgPhoto={makeImagePath(info?.results[0].backdrop_path || "")}
          >
            <Title>{info?.results[0].name}</Title>
            <Overview>{info?.results[0].overview}</Overview>
          </Banner>
          </PlayWrapper>
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
                    .slice(aIndex * offset + 1, aIndex * offset + offset + 1)
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
                          makeImagePath(tv.backdrop_path, "w500") ||
                          NothingPoster
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
            <Span1>T INDEX</Span1>
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
                  key={tIndex}
                >
                  {aInfo?.results
                    .slice(1)
                    .slice(tIndex * offset + 1, tIndex * offset + offset + 1)
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
                          makeImagePath(tv.backdrop_path, "w500") ||
                          NothingPoster
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
            <Span1>A INDEX</Span1>
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
                  key={aIndex}
                >
                  {tInfo?.results
                    .slice(1)
                    .slice(aIndex * offset + 1, aIndex * offset + offset + 1)
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
                          makeImagePath(tv.backdrop_path, "w500") ||
                          NothingPoster
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
