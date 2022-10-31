import { Route, Router, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "../Components/Home";
import Search from "../Components/Search";
import Tv from "../Components/Tv";
import Main from "../Components/Main";
import Movie from "../Components/Movie";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movie />}>
            <Route path=":movieId" element={<Movie />} />

          </Route>
          <Route path="/tv" element={<Tv />}>
            <Route path=":tvId" element={<Tv />} />
          </Route>
          <Route path="/search/*" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}
export default Router;
