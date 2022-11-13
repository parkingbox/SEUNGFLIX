import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearch } from "../../Api/api";
import Loading from "../../Styles/Loading";

const Body = styled.div`
  font-family: "Raleway Sans";
  width: 100%;
  height: 100%;
  position: relative;
`;

function Search() {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search).get("keyword");
  const {data, isLoading}  = useQuery("search", ()=> getSearch(query + ""));
  return (
    <>
    {isLoading ? (
      <Loading/>
    ):(
      <Body>

      </Body>
    )}
    </>
  )
}
export default Search;