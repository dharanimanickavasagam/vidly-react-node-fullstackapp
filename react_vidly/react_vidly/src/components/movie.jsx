import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import SearchBox from "./common/searchBox";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: {},
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "All Genres",
    searchedMovies: [],
    error: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    this.setState({ movies });

    let { data: genres } = await getGenres();
    genres = [{ name: "All Genres" }, ...genres];
    this.setState({ genres });
  }

  handleDeleteMovie = async ({ _id }) => {
    const originalMoviesBeforeDelete = this.state.movies;
    const moviesAfterDelete = this.state.movies.filter(
      movie => movie._id !== _id
    );
    this.setState({ movies: moviesAfterDelete });

    try {
      await deleteMovie(_id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("This movie has already been deleted.");
      this.setState({ movies: originalMoviesBeforeDelete });
    }
  };

  handleIsLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;

    /*  if (!movie.isLiked) {
      movie.isLiked = true;
    } else {
      movie.isLiked = false;
    }
 */
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreList = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleAddMovie = props => {
    this.props.history.push("/movies/new");
  };

  handleSearchMovie = event => {
    if (event.currentTarget.value === "") {
      this.setState({ searchedMovies: {}, error: false });
      return;
    }

    const result = this.state.movies.filter(
      movie =>
        movie.title
          .toUpperCase()
          .indexOf(event.currentTarget.value.toUpperCase()) > -1
    );

    if (result.length) {
      this.setState({ searchedMovies: result, error: false });
      console.log("match", result);
      return;
    }

    this.setState({
      searchedMovies: {},
      error: true
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { user } = this.props;

    const { length: count } = this.state.movies;
    if (count === 0) return <p> There are no movies in the database </p>;

    //Filter the genres based on the selected genre
    const filter =
      this.state.selectedGenre !== "All Genres"
        ? this.state.movies.filter(
            movie => movie.genre.name === this.state.selectedGenre
          )
        : this.state.movies;

    const sorted = _.orderBy(
      filter,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const toPaginate = this.state.searchedMovies.length
      ? this.state.searchedMovies
      : sorted;

    const paginatedMovies = paginate(
      toPaginate,
      this.state.currentPage,
      this.state.pageSize
    );

    const numberOfMovies = this.state.searchedMovies.length
      ? this.state.searchedMovies.length
      : filter.length;

    //Extracting names for the listGroupInput
    const listGroupInput = this.state.genres.map(genre => genre.name);
    const errorClass = this.state.error === true ? "Movie not found" : null;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            listGroupInput={listGroupInput}
            onClick={this.handleGenreList}
            selectedGenre={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <div>
              <button
                style={{ margin: "20px 0" }}
                className="btn btn-primary btn-sm"
                onClick={this.handleAddMovie}
              >
                Add Movie
              </button>
            </div>
          )}
          Showing all {numberOfMovies} movies in the DB
          <SearchBox
            name="search"
            error={errorClass}
            placeholder="Enter a movie"
            onChange={this.handleSearchMovie}
          />
          <MoviesTable
            movies={this.state.movies}
            paginatedMovies={paginatedMovies}
            onDeleteMovie={this.handleDeleteMovie}
            onIsLiked={this.handleIsLiked}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={numberOfMovies}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onClick={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
