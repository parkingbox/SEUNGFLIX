import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api/api";
import Loading from "../Loading";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Body = styled.div`
  font-family: "Raleway Sans";
  min-width: 1024px;
  max-height: 100%;
  word-break: keep-all;
  @media screen and (max-width: 1023px) {
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/ad1fd8bb-8268-44ae-bfca-3da8cfc5726f/KR-en-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;
const MainOpacity = styled.div`
  background: linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
`;

function Main() {
  const { isLoading, data } = useQuery<IGetMoviesResult>(["start"], getMovies);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <HelmetProvider>
            <Helmet>
              <title>Seungflix</title>
            </Helmet>
          </HelmetProvider>
          <MainContainer>
            <MainOpacity></MainOpacity>
          </MainContainer>
        </Body>
      )}
    </>
  );
}

export default Main;
