const router = require('express').Router();
const { getSavedMovies, saveMovie, removeMovie } = require('../../controllers/movie-controller');

router
  .route('/')
  .get(getSavedMovies)
  .post(saveMovie);

router.route('/:id').delete(removeMovie);

module.exports = router;
