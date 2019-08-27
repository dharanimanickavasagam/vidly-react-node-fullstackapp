import React, { Component } from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";
/*  import MovieForm from "./movieForm"; */
import { getUser } from "../services/authService";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      name: "Title",
      label: "Title",
      contentObj: movie => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      )
    },
    { name: "Genre", path: "genre.name" },
    { name: "Stock", path: "numberInStock" },
    { name: "Rate", path: "dailyRentalRate" },
    {
      key: "Like",
      contentObj: movie => (
        <Like
          onClick={() => this.props.onIsLiked(movie)}
          isLiked={movie.isLiked}
        />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    contentObj: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = getUser();

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
      console.log(this.columns);
    }
  }

  render() {
    const { onDeleteMovie, onIsLiked, paginatedMovies } = this.props;

    return (
      <Table
        columns={this.columns}
        onSort={this.props.onSort}
        sortColumn={this.props.sortColumn}
        content={paginatedMovies}
      ></Table>
    );
  }
}

export default MoviesTable;

/* <tbody>
          {paginatedMovies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>
                  <Link to={`/movies/${movie._id}`} component={MovieForm}>
                    {movie.title}
                  </Link>
                </td>
                <td> {movie.genre.name}</td>
                <td> {movie.numberInStock}</td>
                <td> {movie.dailyRentalRate} </td>
                <td>
                  <Like
                    onClick={() => onIsLiked(movie)}
                    isLiked={movie.isLiked}
                  />
                </td>
                {user && user.isAdmin && (
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDeleteMovie(movie)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody> */
