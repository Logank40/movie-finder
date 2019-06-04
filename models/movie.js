const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  movieId: {
    type: String
  },
  title: {
    type: String
  },
  authors: {
    type: Array
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
