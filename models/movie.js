const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
  Title: {
    type: String
  },
  Plot: {
    type: String
  },
  Post: {
    type: String
  },
  Website: {
    type: String
  }
});

const Movie = mongoose.model('movie', MovieSchema);

module.exports = Movie;
