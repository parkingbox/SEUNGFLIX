import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Routes/Header";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Tv from "./Components/Tv";
import { GlobalStyle } from "./Styles/GlobalStyle";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}>
          <Route path={"movies/:id"} element={<Home />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
