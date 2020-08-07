import React, { FC } from "react";
import { Route, RouteProps } from "react-router-dom";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  return <Route {...rest} render={() => children} />;
};
