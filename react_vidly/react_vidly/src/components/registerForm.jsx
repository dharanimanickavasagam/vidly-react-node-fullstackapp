import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveUser } from "../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .required(),
    name: Joi.string()
      .required()
      .min(2)
  };

  doSubmit = async () => {
    try {
      const response = await saveUser(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      // this.props.history.push("/");
      window.location = "/";
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div align="left">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "Enter email")}
          {this.renderInput(
            "password",
            "Password",
            "Enter password",
            "password"
          )}
          {this.renderInput("name", "Name", "Enter name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
