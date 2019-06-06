import React, { Component } from 'react';
import Jumbotron from '../components/jumbotron.js';
import Row from '../components/row.js';
import Col from '../components/col.js';
import Card from '../components/card.js';
import { searchOmdbMovies, saveMovie, removeMovie, getSavedMovies } from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    movieList: [],
    movie: {},
    savedMovieIds: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    searchOmdbMovies(this.state.searchTerm)
      .then(({ data: movie }) => {
        console.log(movie);
        this.setState({
          movie
        })
      })
      .then(this.retrieveSavedMovies)
      .catch(err => console.log(err));
  };

  handleSaveMovie = (movieId) => {
    const movie = this.state.movieList.find(movie => movie.movieId === movieId);

    saveMovie(movie)
      .then(() => {
        const savedMovieIds = [...this.state.savedMovieIds, movieId];
        this.setState({ savedMovieIds })
      })
  }

  retrieveSavedMovies = () => {
    getSavedMovies()
      .then(({ data: dbSavedMovies }) => {
        const savedMovieIds = dbSavedMovies.map(({ movieId }) => movieId);
        this.setState({ savedMovieIds });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid bg={'dark'} color={'light'} pageTitle={'Search For Movies'} />
        <div className="container-fluid">
          <Row>
            <Col xs={12} md={4}>
              <Card title="Search for a movie">
                <form onSubmit={this.handleFormSubmit}>
                  <input type="text" className="form-control" placeholder="Search for a movie"
                    onChange={this.handleInputChange}
                    value={this.state.searchTerm}
                    name="searchTerm"
                  />
                  <button type="submit" className="btn btn-block btn-dark">Search For Movies</button>
                </form>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Row>
                {this.state.movie ? (
                  <Col md={6}>
                    <Card title={this.state.movie.Title} image={this.state.movie.Poster ? this.state.movie.Poster : undefined}>
                      <p>
                        {this.state.movie.Plot}
                      </p>
                
                      {<button
                      
                       onClick={() => this.handleSaveMovie(this.state.movie.Title)}
                       className="btn btn-success btn-sm">
                       Save Movie
                     </button>}
                    </Card>
                  </Col>
                ) : <h2>Search For Movie</h2>}

              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;