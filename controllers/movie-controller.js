const { Movie } = require('../models');

const getSavedMovies = (req, res) => {
  Movie.find({})
    .then(dbMovieData => res.json(dbMovieData))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

const saveMovie = (req, res) => {
  console.log(req.body);
  Movie.create(req.body)
    .then(dbMovieData => res.json(dbMovieData))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

const removeMovie = (req, res) => {
  Movie.remove({
    _id: req.params.id
  })
    .then(dbMovieData => res.json(dbMovieData))
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};

module.exports = {
  getSavedMovies,
  saveMovie,
  removeMovie
}