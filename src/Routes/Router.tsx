import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../Components/Main/Home";
import Search from "../Components/Search/Search";
import Tv from "../Components/Tv/Tv";
import Movie from "../Components/Movie/Movie";
import { ReactQueryDevtools } from "react-query/devtools";

function Router() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />}>
          <Route path="/movies/:movieId" element={<Movie />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:tvId" element={<Tv />} />
        </Route>
        <Route path="/search/*" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
