import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getSearch, IGetSearchResult } from "../../Api/api";

function Search() {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search).get("keyword");
  const {data, isLoading} = useQuery<IGetSearchResult>(["search"], () => getSearch(keyword + ""));
  return (
    <>
    </>
  )
}
export default Search;