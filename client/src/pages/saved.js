import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Row from '../components/Row';
import Col from '../components/Col';
import Card from '../components/Card';
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
                          <Card title={movie.title} image={movie.image ? movie.image : undefined}>
                            <p>{movie.description}</p>
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
