const API_KEY = "966ba425b9148bb1ea6f9994aea1e959";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface ISearch {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  media_type: string;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetSearchResult {
  results: ISearch[];
  total_results: number;
}



export const getMovies = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getSearch = async (keyword?: string) => {
  const response = await fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}&page=1&include_adult=false`
  );
  return await response.json();
}