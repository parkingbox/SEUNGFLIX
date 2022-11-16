import { AnimatePresence, motion } from "framer-motion";
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
} from "../Movie/Movie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeImagePath, NothingPoster } from "../../Api/utils";

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
  const navigate = useNavigate();
  const stateTvId = localStorage.getItem("tvId");

  const { data: info, isLoading: infoLoading } = useQuery<IGetTVResult>(
    ["tvs", "nowPlaying"],
    getTv
  );
  const { data: aInfo } = useQuery<IGetTvResult>(
    ["tvsAir", "airPlaying"],
    getTvAir
  );
  const { data: tInfo } = useQuery<IGetTvResult>(
    ["tvsTop", "topPlaying"],
    getTvTop
  );
  const [leaving, setLeaving] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isVolum, setIsVolum] = useState(false);

  //INDEX
  const [index, setIndex] = useState(0);
  const [pIndex, setPIndex] = useState(0);
  const [tIndex, setTIndex] = useState(0);
  const [wIndex, setWIndex] = useState(0);

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
  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayWrapper>
            <Overlays>{/* TV trailer */}</Overlays>
          </PlayWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
