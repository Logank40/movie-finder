import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
import { searchOmdbMovies, saveMovie, removeMovie, getSavedMovies } from '../utils/API';

class Search extends Component {
  state = {
    searchTerm: '',
    movieList: [],
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
      .then(({ data: { items: movieList } }) => {
        const movieListCleaned = movieList.map(movie => {
          return {
            movieId: movie.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""
          }
        })
        return this.setState({ movieList: movieListCleaned });
      })
      .then(this.retrieveSavedMovies)
      .catch(err => console.log(err));
  };

  handleSaveMovie = (movieId) => {
    const movie = this.state.movieList.find(movie => movie.movieId === movieId);

    saveMovie(movie)
      .then(() => {
        const savedMovieIds = [...this.state.savedMovieIds, movieId];
        this.setState({ savedMovieIds})
      })
  }

  retrieveSavedMovies = () => {
    getSavedMovies()
      .then(({data: dbSavedMovies}) => {
        const savedMovieIds = dbSavedMovies.map(({movieId}) => movieId);
        this.setState({savedMovieIds});
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
                {
                  !this.state.movieList.length ? "" : (
                    this.state.movieList.map(movie => {
                      return (
                        <Col key={movie.id} md={6}>
                          <Card title={movie.title} image={book.image ? book.image : undefined}>
                            <p>
                              {book.description}
                            </p>
                            <button 
                              disabled={this.state.savedMovieIds.includes(movie.movieId) ? true : undefined}
                              onClick={() => this.handleSaveMovie(book.bookId)}
                              className="btn btn-success btn-sm">
                              Save Movie
                            </button>
                          </Card>
                        </Col>
                      )
                    })
                  )
                }
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;