import axios from "axios";

const movieBaseUrl = import.meta.env.VITE_MOVIE_URL;
const api_key = import.meta.env.VITE_MOVIE_KEY;
const movieByGenresURL = import.meta.env.VITE_GENRE_URL + api_key;

const getTrendingVideos = axios.get(
  movieBaseUrl + "/trending/all/day?api_key=" + api_key
);

const getMovieByGenreId = (id: number) => axios.get(movieByGenresURL + "&with_genres=" + id);

export default {
  getTrendingVideos,
  getMovieByGenreId
};
