import React, { Component } from 'react';
import Jumbotron from '../components/jumbotron.js';
import Row from '../components/row.js';
import Col from '../components/col.js';
import Card from '../components/card.js';
import { searchOmdbMovies, saveMovie, removeMovie, getSavedMovies } from '../utils/API';
import BackgroundImg from '../assets/images/popcorn.jpg';

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

  handleSaveMovie = () => {
    console.log(this.state.movie);
    saveMovie(this.state.movie)
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.log(err));
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
        <div 
        className="container-fluid"
        style={{
          backgroundImage: `url(${BackgroundImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
        }}
        >
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
                      
                       onClick={() => this.handleSaveMovie()}
                       className="btn btn-success btn-sm">
                       Save Movie
                     </button>}
                    </Card>
                  </Col>
                ) : <h2>Movie Finder</h2>}

              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;