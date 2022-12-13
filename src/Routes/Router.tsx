import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../Components/Home/Home";
import Search from "../Components/Search/Search";
import Tv from "../Components/Tv/Tv";
import Movie from "../Components/Movie/Movie";
import { ReactQueryDevtools } from "react-query/devtools";
import Upcoming from "../Components/Upcoming/Upcoming";
import Movies from "../Components/Movie/Movie";
import UpcomingDetail from "../Components/Detail/UpcomingDetail";
import MovieDetail from "../Components/Detail/MovieDetail";
import TvDetail from "../Components/Detail/TvDetail";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />}>
          <Route path=":movieId" element={<MovieDetail />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":tvId" element={<TvDetail />} />
        </Route>
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/upcoming/:upcomingId" element={<UpcomingDetail />} />
        <Route path="/search/*" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
