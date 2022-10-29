import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { GlobalStyle } from './Styles/GlobalStyle'


function App() {
  return (
    <>
    <GlobalStyle />
    <Router/>
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
