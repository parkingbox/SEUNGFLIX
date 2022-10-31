const API_KEY = "966ba425b9148bb1ea6f9994aea1e959";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
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

export const getMovies = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};
