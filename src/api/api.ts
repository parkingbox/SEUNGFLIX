const API_KEY = "966ba425b9148bb1ea6f9994aea1e959";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface RouterID {
  state: {
    id: number;
  };
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: string;
}

export interface ITv {
  id: number;
  name: string;
  backdrop_path: string;
  original_name: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
}

interface IMovieTrailer {
  key: string;
  id: string;
}

interface ITVTrailer {
  key: string;
  id: string;
}
interface ISearch {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  media_type: string;
  name: string;
}

interface IGenres {
  name: string;
}

interface ICompanies {
  logo_path: string;
}

interface ILanguages {
  name: string;
}
interface IMovieLogo {
  file_path: string;
}

export interface IGetMoviesResult {
  results: IMovie[];
}

export interface IGetMoviesDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: IGenres[];
  production_companies: ICompanies[];
  spoken_languages: ILanguages[];
}

export interface IGetMoviesTrailer {
  id: number;
  results: IMovieTrailer[];
}

export interface IGetTVResult {
  page: number;
  results: ITv[];
}

export interface IGetTVDetail {
  adult: boolean;
  backdrop_path: string;
  homepage: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
}

export interface IMoiveSimilar {
  backdrop_path: string;
  original_title: string;
}

export interface IGetTVTrailer {
  results: ITVTrailer[];
}

export interface IGetMovieSimilar {
  results: IMoiveSimilar[];
}

export interface IGetMovieImages {
  id: number;
  logos: IMovieLogo[];
}
export interface IGetSearchResult {
  results: ISearch[];
  total_results: number;
}

//MOVIE API
export const getMovies = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getMoviesPopular = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=2`
  );
  return await response.json();
};

export const getMoviesTop = async () => {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getMoviesWeek = async () => {
  const response = await fetch(
    `${BASE_PATH}/trending/movie/week?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getMoviesDetail = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  );
  return await response.json();
};

export const getMoviesTrailer = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};

export const getMovieImages = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}/images?api_key=${API_KEY}`
  );
  return await response.json();
};

export const getMovieSimilar = async (movieId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getUpcoming = async (number?: number) => {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=${number}`
  );
  return await response.json();
};

// TV API
export const getTv = async () => {
  const response = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getTvTop = async () => {
  const response = await fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&page=1`
  );
  return await response.json();
};

export const getTvAir = async () => {
  const response = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&page=2`
  );
  return await response.json();
};

export const getTVDetail = async (tvId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=ko-KR`
  );
  return await response.json();
};

export const getTvTrailer = async (tvId?: string) => {
  const response = await fetch(
    `${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}`
  );
  return await response.json();
};

export const getSearch = async (query?: string) => {
  const response = await fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${query}&page=1&include_adult=false`
  );
  return await response.json();
};
