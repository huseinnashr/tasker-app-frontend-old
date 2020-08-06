import React, { Component } from "react";
import { Route, RouteProps } from "react-router-dom";

export class ProtectedRoute extends Component<RouteProps, any> {
  render() {
    const { children, ...rest } = this.props;
    return <Route {...rest} render={() => children} />;
  }
}
