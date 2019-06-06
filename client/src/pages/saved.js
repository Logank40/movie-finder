import React, { Component } from 'react';
import Jumbotron from '../components/jumbotron.js';
import Row from '../components/row.js';
import Col from '../components/col.js';
import Card from '../components/card.js';
import { removeMovie, getSavedMovies } from '../utils/API';

class Saved extends Component {
  state = {
    movieList: []
  };

  componentDidMount() {
    this.handleGetSavedMovies();
  }

  handleGetSavedMovies = () => {
    getSavedMovies()
      .then(({data: movieList}) => {
        this.setState({ movieList });
      })
      .catch(err => console.log(err));
  }

  handleRemoveMovie = (movieId) => {
    removeMovie(movieId)
      .then(this.handleGetSavedMovies)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron fluid bg={'dark'} color={'light'} pageTitle={'Viewing Saved Movies'} />
        <div className="container-fluid">

              <Row>
                {!this.state.movieList.length
                  ? ''
                  : this.state.movieList.map(movie => {
                      return (
                        <Col key={movie._id} md={6}>
                          <Card title={movie.Title} image={movie.Poster ? movie.Poster : undefined}>
                            <p>{movie.Plot}</p>
                            <button
                              onClick={() => this.handleRemoveMovie(movie._id)}
                              className="btn btn-danger btn-sm">
                              Remove Movie
                            </button>
                          </Card>
                        </Col>
                      );
                    })}

          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Saved;
