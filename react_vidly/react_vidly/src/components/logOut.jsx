import { Component } from "react";
import { logoutUser } from "../services/authService";

class Logout extends Component {
  state = {};

  componentDidMount() {
    logoutUser();
    window.location = "/";
  }

  render() {
    return "Logged out";
  }
}

export default Logout;
