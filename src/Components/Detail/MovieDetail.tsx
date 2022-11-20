import { AnimatePresence, motion } from "framer-motion";
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
import { makeImagePath, NothingPoster } from "../../Api/utils";
import { DetailBox } from "../Upcoming/UpcomingDetail";
import Loading from "../../Styles/Loading";
import { useState } from "react";
import { Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Container = styled.div`
  width: 100%;
  height: 100%;
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

const DetailBanner = styled.div<{ bgphoto?: string }>`
  width: 100%;
`;

const OverviewContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const TitleContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.span`
  font-size: 40px;
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

function MovieDetail() {
  const movieMatch = useMatch(`/movies/:movieId`);
  const navigate = useNavigate();
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

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {movieMatch && (
            <DetailPoster>
              <DetailPlayContainer>{/* detail trailer */}</DetailPlayContainer>
              <DetailBanner
                bgphoto={
                  info?.backdrop_path === null
                    ? NothingPoster
                    : makeImagePath(info?.backdrop_path || "")
                }
              />
              <OverviewContainer>
                <TitleContainer>
                  <Title>{info?.original_title}</Title>
                </TitleContainer>
                <ReleaseContainer>
                  <span>{info?.original_title}</span>
                  <span>
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
                  </span>
                  <span>&nbsp;{info?.runtime}min / </span>
                  <span>&nbsp;{info?.spoken_languages[0].name}</span>
                  <span style={{ color: "red" }}>
                    &nbsp;{info?.adult ? "/ 청소년 관람불가" : ""}
                  </span>
                  <a href={info?.homepage} target="_blank" rel="noreferrer">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                      >
                        HomePage
                      </Button>
                    </Stack>
                  </a>
                </ReleaseContainer>
              </OverviewContainer>
            </DetailPoster>
          )}
        </>
      )}
    </Container>
  );
}

export default MovieDetail;
