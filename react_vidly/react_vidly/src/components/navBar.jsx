import React from "react";

import { NavLink } from "react-router-dom";
import Movie from "./movie";
import Customers from "./customers";
import Rentals from "./rentals";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import Logout from "./logOut";

const NavBar = props => {
  //const cart = props.orders.filter(order => order.count > 0);
  const { user } = props;

  return (
    /* <nav className="navbar navbar-light bg-light">
      Number of Orders : {cart.length}
    </nav> */
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand" component={Movie}>
          Vidly
        </NavLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">
            <NavLink
              className="nav-link nav-item "
              to="/movies"
              component={Movie}
            >
              Movies <span className="sr-only">(current)</span>
            </NavLink>

            <NavLink
              className="nav-link nav-item"
              to="/customers"
              component={Customers}
            >
              Customers
            </NavLink>

            <NavLink
              className="nav-link nav-item"
              to="/rentals"
              component={Rentals}
            >
              Rentals
            </NavLink>

            {!user && (
              <React.Fragment>
                <NavLink
                  className="nav-link nav-item"
                  to="/login"
                  component={LoginForm}
                >
                  Login
                </NavLink>

                <NavLink
                  className="nav-link nav-item"
                  to="/register"
                  component={RegisterForm}
                >
                  Register
                </NavLink>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/">
                  Welcome {user.name}!
                </NavLink>

                <NavLink
                  className="nav-link nav-item"
                  to="/logout"
                  component={Logout}
                >
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
