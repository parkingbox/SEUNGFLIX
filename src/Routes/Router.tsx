import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path={"movies/:id"} element={<Home />}></Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path={"tv/:id"} element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Route>
      </Routes>
    </>
  );
}
export default Router;
