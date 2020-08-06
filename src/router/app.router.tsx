import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { ProtectedRoute } from "./route/protected.route";
import { Navbar } from "../component/navbar/navbar";
import { Login } from "../domain/auth";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/">
          <Layout>
            <Navbar />
            <ProtectedRoute exact path="/manage-employee">
              <Layout.Content>Manage Employee</Layout.Content>
            </ProtectedRoute>
            <Layout.Footer style={{ textAlign: "center" }}>
              Tasker App ©2020 Created by Husein Nashr
            </Layout.Footer>
          </Layout>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export { AppRouter };
