import { useState } from "react";
import styled from "styled-components";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import {
  getMovies,
  getMoviesTrailer,
  IGetMoviesResult,
  IGetMoviesTrailer,
} from "../../Api/api";
import Loading from "../../Styles/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeImagePath, makeTrailerPath, NothingPoster } from "../../Api/utils";
import ReactPlayer from "react-player";

const Wrapper = styled.div`
  min-width: 1400px;
  background: black;
  height: 80vh;
`;
const PlayContainer = styled.div`
  min-width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

function Movies() {
  const navigate = useNavigate();
  const { isLoading: infoLoading, data: info } = useQuery<IGetMoviesResult>(
    ["nowPlaying"],
    getMovies
  );
  const stateMovieId = localStorage.getItem("movieId");
  // const { data: trailer } = useQuery<IGetMoviesTrailer>(
  // "startMovieTrailer",
  //   () => getMoviesTrailer(String(stateMovieId))
  // );
  return (
    <Wrapper>
      {infoLoading ? (
        <Loading />
      ) : (
        <>
          <PlayContainer>
            {/* <ReactPlayer
              url={makeTrailerPath(trailer?.results[0].key || "")}
              volume={isVolum ? 0 : 0.3}
              controls={false}
              playing={true}
              muted={isSound === "0" ? true : false}
              loop={true}
              width="200vw"
              height="calc(110vh)"
            ></ReactPlayer> */}
          </PlayContainer>
          <Banner />
        </>
      )}
    </Wrapper>
  );
}
export default Movies;
