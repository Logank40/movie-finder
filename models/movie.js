const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  movieId: {
    type: String
  },
  title: {
    type: String
  },
  authors: {
    type: Array
  },
  plot: {
    type: String
  },
  poster: {
    type: String
  },
  website: {
    type: String
  }
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
