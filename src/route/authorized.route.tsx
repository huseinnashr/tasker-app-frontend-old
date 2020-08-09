import React, { FC, useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { AuthContext } from "../context";

export const AuthorizedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
