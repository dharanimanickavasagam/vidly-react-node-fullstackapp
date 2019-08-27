import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  console.log({ render }, { Component });
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!getUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { fromLocation: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
