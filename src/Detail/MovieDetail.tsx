import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMoviesDetail, IGetMoviesDetail } from "../Api/api";
import Loading from "../Styles/Loading";

const Container = styled(motion.div)`
  width: 100%;
  height: 80vh;
  color: white;
`


function MovieDetail() {
  const movieMatch = useMatch(`movies/:movieId`);
  const navigate = useNavigate();
  const {isLoading, data} = useQuery<IGetMoviesDetail>(["MovieDetail"], () => getMoviesDetail(movieMatch?.params.movieId));
  return (
  <Container>
    {isLoading ? (
      <Loading/>
    ) : (
      <>
      
      </>
    )
  }
  </Container>
  )
}

export default MovieDetail;