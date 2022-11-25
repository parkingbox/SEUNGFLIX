// import { AnimatePresence, motion } from "framer-motion";
// import { useQuery } from "react-query";
// import { useMatch, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import {
//   getMoviesDetail,
//   getMovieSimilar,
//   getMoviesTrailer,
//   IGetMoviesDetail,
//   IGetMovieSimilar,
//   IGetMoviesTrailer,
// } from "../../Api/api";
// import { makeImagePath, NothingPoster } from "../../Api/utils";
// import { DetailBox } from "./UpcomingDetail";
// import Loading from "../../Styles/Loading";
// import { useState } from "react";
// import { Stack } from "@mui/material";
// import Rating from "@mui/material/Rating";
// import { Button } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   color: white;
// `;

// const DetailPoster = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: relative;
// `;

// const DetailPlayContainer = styled.div`
//   width: 100%;
//   height: 300px;
//   position: relative;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const DetailBanner = styled.div<{ bgphoto?: string }>`
//   width: 100%;
// `;

// const OverviewContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;
// const TitleContainer = styled.header`
//   width: 100%;
//   height: 70px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
// `;
// const Title = styled.span`
//   font-size: 40px;
// `;
// const ReleaseContainer = styled.div`
//   width: 95%;
//   height: 50px;
//   display: flex;
//   align-items: center;
//   font-weight: 600;
//   margin-bottom: 20px;
//   margin-left: 20px;
// `;

// function MovieDetail() {
//   const movieMatch = useMatch(`/movies/:movieId`);
//   const navigate = useNavigate();
//   const [volum, setVolum] = useState(false);
//   const { isLoading, data } = useQuery<IGetMoviesTrailer>(
//     ["Movietrailer"],
//     () => getMoviesTrailer(movieMatch?.params.movieId)
//   );
//   const { data: info } = useQuery<IGetMoviesDetail>(["MovieDetail"], () =>
//     getMoviesDetail(movieMatch?.params.movieId)
//   );
//   const { data: similar } = useQuery<IGetMovieSimilar>(["MovieSimilar"], () =>
//     getMovieSimilar(movieMatch?.params.movieId)
//   );

//   return (
//     <Container>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <>
//           {movieMatch && (
//             <DetailPoster>
//               <DetailPlayContainer>{/* detail trailer */}</DetailPlayContainer>
//               <DetailBanner
//                 bgphoto={
//                   info?.backdrop_path === null
//                     ? NothingPoster
//                     : makeImagePath(info?.backdrop_path || "")
//                 }
//               />
//               <OverviewContainer>
//                 <TitleContainer>
//                   <Title>{info?.original_title}</Title>
//                 </TitleContainer>
//                 <ReleaseContainer>
//                   <span>{info?.original_title}</span>
//                   <span>
//                     <Stack spacing={1}>
//                       <Rating
//                         name="half-rating-read"
//                         defaultValue={
//                           info?.vote_average === undefined
//                             ? 3.0
//                             : Math.floor(Number(info?.vote_average))
//                         }
//                         precision={0.5}
//                         readOnly
//                         size="small"
//                       />
//                     </Stack>
//                   </span>
//                   <span>&nbsp;{info?.runtime}min / </span>
//                   <span>&nbsp;{info?.spoken_languages[0].name}</span>
//                   <span style={{ color: "red" }}>
//                     &nbsp;{info?.adult ? "/ 청소년 관람불가" : ""}
//                   </span>
//                   <a href={info?.homepage} target="_blank" rel="noreferrer">
//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         endIcon={<SendIcon />}
//                       >
//                         HomePage
//                       </Button>
//                     </Stack>
//                   </a>
//                 </ReleaseContainer>
//               </OverviewContainer>
//             </DetailPoster>
//           )}
//         </>
//       )}
//     </Container>
//   );
// }

// export default MovieDetail;

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMoviesDetail,
  getMovieSimilar,
  getMoviesTrailer,
  IGetMoviesDetail,
  IGetMovieSimilar,
  IGetMoviesTrailer,
} from "../../Api/api";
import { makeImagePath, makeVideoPath, NothingPoster } from "../../Api/utils";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Loading from "../../Styles/Loading";
import { InfoTitle, infoVars } from "../Movie/Movie";

const Container = styled(motion.div)`
  font-family: "Raleway Sans";
  width: 100%;
  height: 80vh;
  color: white;
`;

const DetailPoster = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const DetailPlayContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
    rgba(0, 0, 15, 1) 0%,
    rgba(0, 0, 15, 0.15592174369747902) 10%
  );
`;

const Banner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const BannerBackContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerBackBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
  position: absolute;
`;

const BannerFooterBox = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
`;

const BannerFooter = styled.footer`
  width: 95%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`;

const BannerBtn = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background-color: #9ca7b2;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  &:last-child {
    margin-left: 10px;
  }
`;

const DetailBanner = styled.div<{ bgimg?: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgimg});
  background-position: center;
  background-size: cover;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 300px;
  background: linear-gradient(
    rgba(0, 0, 0, 0.95),
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.9)
  );
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  display: flex;
`;

const RealeaseDivider = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  justify-content: center;
`;

const HomeDivider = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const TitleContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
`;

const Title = styled.span`
  font-size: 40px;
`;

const PlayBtn = styled.button`
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  margin-left: 40px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.white.darker};
  }
`;

const Explanation = styled.div`
  width: 95%;
  height: 100px;
  display: flex;
  margin-left: 10px;
`;

const OverviewBox = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin-right: 3px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#e0eafc, #cfdef3);
    border-radius: 50px;
  }
`;

const Overview = styled.span`
  height: initial;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  height: 100%;
  padding-left: 10px;
`;

const ReleaseContainer = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 95%;
  position: relative;
`;

const WrapperColor = styled.div`
  background-color: transparent;
  height: 100%;
  border-radius: 10px;
  font-weight: 600;
  background-color: rgba(200, 182, 148, 0.6);
`;

const GenresContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Companies = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: repeat(2, 3fr);
  justify-items: center;
  padding: 3px;
  border-radius: 5px;
`;

const LogoPath = styled.div<{ bgimg: string }>`
  width: 100px;
  height: 40px;
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 10px;
  border: none;
`;

const SemiContainer = styled.div`
  width: 100%;
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  border-top: 2px solid gray;
`;

const SemiHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 30px;
    font-weight: 600;
  }
`;

const SemiBox = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const Similar = styled(motion.div)<{ bgimg: string }>`
  background-image: url(${(prop) => prop.bgimg});
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  position: relative;
`;

const similarVars = {
  hover: {
    scale: 1.1,
  },
};

const MovieDetail = () => {
  const movieMatch = useMatch(`movies/:movieId`);
  const navigate = useNavigate();
  const [volum, setVolum] = useState(false);
  const { isLoading, data } = useQuery<IGetMoviesTrailer>(
    ["Movietrailer"],
    () => getMoviesTrailer(movieMatch?.params.movieId)
  );
  const { data: info } = useQuery<IGetMoviesDetail>(["MovieDetail"], () =>
    getMoviesDetail(movieMatch?.params.movieId)
  );
  const { data: similar } = useQuery<IGetMovieSimilar>(["MovieSimilar"], () =>
    getMovieSimilar(movieMatch?.params.movieId)
  );
  const onClicked = () => {
    navigate("/movies");
  };
  const volumClick = () => setVolum((prev) => !prev);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {movieMatch && (
            <DetailPoster>
              <DetailPlayContainer>
                <Overlays />
                <ReactPlayer
                  url={makeVideoPath(
                    makeVideoPath(
                      data?.results.find((x) => x.type === "Trailer")?.key || ""
                    )
                  )}
                  volume={volum ? 0.2 : 0}
                  playing={true}
                  loop={true}
                  width="150%"
                  height="600px"
                  style={{ scale: 1.5 }}
                ></ReactPlayer>
                <Banner>
                  <BannerBackContainer>
                    <BannerBackBox />
                  </BannerBackContainer>
                  <BannerFooterBox>
                    <BannerFooter>
                      <BannerBtn onClick={volumClick}>
                        {/* <FontAwesomeIcon icon={volum ? faVolumeHigh : faVolumeMute} /> */}
                      </BannerBtn>
                      <BannerBtn
                        onClick={onClicked}
                        whileHover={{ rotate: "90deg" }}
                      >
                        {/* <FontAwesomeIcon icon={faXmark} /> */}
                      </BannerBtn>
                    </BannerFooter>
                  </BannerFooterBox>
                </Banner>
              </DetailPlayContainer>
              <DetailBanner
                bgimg={
                  info?.backdrop_path === null
                    ? NothingPoster
                    : makeImagePath(info?.backdrop_path || "")
                }
              />
              <OverviewContainer>
                <Divider>
                  <HomeDivider>
                    <TitleContainer>
                      <Title>{info?.original_title}</Title>
                      <PlayBtn
                        onClick={() => alert("Please Sign in first.")}
                      ></PlayBtn>
                    </TitleContainer>
                    <ReleaseContainer>
                      <span>{info?.release_date} / </span>
                      <span>
                        {info?.genres.slice(0, 3).map((genres, index) => {
                          return <span key={index}>&nbsp;{genres.name} /</span>;
                        })}
                      </span>
                      <span>&nbsp;{info?.runtime}min&nbsp; </span>
                      <span style={{ color: "red" }}>
                        &nbsp;{info?.adult ? "/ Rated-R" : ""}
                      </span>
                    </ReleaseContainer>
                    <Explanation>
                      <OverviewBox>
                        <Overview>
                          <span>{info?.overview}</span>
                        </Overview>
                      </OverviewBox>
                    </Explanation>
                  </HomeDivider>
                  <RealeaseDivider>
                    <Wrapper>
                      <WrapperColor>
                        <GenresContainer>
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={
                                info?.vote_average === undefined
                                  ? 3.0
                                  : Math.floor(Number(info?.vote_average))
                              }
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                          </Stack>
                        </GenresContainer>
                        <Companies>
                          {info?.production_companies
                            .slice(0, 2)
                            .map((companies, index) => {
                              return (
                                <LogoPath
                                  key={index}
                                  bgimg={makeImagePath(
                                    companies.logo_path || ""
                                  )}
                                ></LogoPath>
                              );
                            })}
                        </Companies>
                      </WrapperColor>
                    </Wrapper>
                  </RealeaseDivider>
                </Divider>
                <AnimatePresence>
                  <SemiContainer>
                    <SemiHeader>
                      <span>Similar Contents</span>
                    </SemiHeader>
                    <SemiBox>
                      {similar?.results.slice(0, 6).map((movie, index) => {
                        return (
                          <>
                            <Similar
                              key={index}
                              variants={similarVars}
                              whileHover="hover"
                              transition={{ type: "tween" }}
                              bgimg={makeImagePath(movie.backdrop_path || "")}
                            >
                              <InfoTitle variants={infoVars}>
                                <p>{movie.original_title}</p>
                              </InfoTitle>
                            </Similar>
                          </>
                        );
                      })}
                    </SemiBox>
                  </SemiContainer>
                </AnimatePresence>
              </OverviewContainer>
            </DetailPoster>
          )}
        </>
      )}
    </Container>
  );
};

export default MovieDetail;
