import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .min(5),
    genreId: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
  };

  populateGenres = async () => {
    let { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    const movieId = this.props.match.params.id;
    if (movieId === "new") {
      return;
    }

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  componentDidMount = async () => {
    await this.populateGenres();
    await this.populateMovie();
  };

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div align="left">
        <form onSubmit={this.handleSubmit}>
          <h4> MovieForm of ID :{this.props.match.params.id} </h4>
          {this.renderInput("title", "Title", "Enter title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "Enter number")}
          {this.renderInput("dailyRentalRate", "Rate", "Enter rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
