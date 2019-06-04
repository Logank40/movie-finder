import axios from 'axios';

export const saveMovie = movieData => {
  return axios.post('/api/movies', movieData);
};

export const getSavedMovies = () => {
  return axios.get('/api/movies');
};

export const removeMovie = movieId => {
  return axios.delete(`/api/movies/${movieId}`);
};

export const searchOmdbMovies = query => {
  return axios.get('http://www.omdbapi.com/?apikey=[85f33b0b]&', {
    params: {
      q: query
    }
  });
};

export default {
  saveMovie,
  getSavedMovies,
  removeMovie,
  searchOmdbMovies
}