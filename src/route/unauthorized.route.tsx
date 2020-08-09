import React, { FC, useContext } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { AuthContext } from "../context";

export const UnauthorizedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
};
