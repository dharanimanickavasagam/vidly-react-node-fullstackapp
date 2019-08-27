import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { authenticateUser, getUser } from "./../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async props => {
    try {
      await authenticateUser(this.state.data);
      /*  this.props.history.push("/"); */
      const { state } = this.props.location;
      window.location = state ? state.fromLocation.pathname : "/";
    } catch (error) {
      const errors = { ...this.state.errors };
      errors.email = error.response.data;
      this.setState({ errors });
    }
  };

  render() {
    if (getUser()) return <Redirect to="/" />;
    return (
      <div align="left">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "Enter Email")}
          {this.renderInput(
            "password",
            "Password",
            "Enter password",
            "password"
          )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
