import React, { FC } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Layout } from "antd";
import { Navbar } from "../component/navbar/navbar";
import { Login } from "./auth";
import { UnauthorizedRoute, AuthorizedRoute } from "../route";
import { EmployeeList } from "./admin";

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UnauthorizedRoute exact path="/login">
          <Login />
        </UnauthorizedRoute>
        <AuthorizedRoute path="/">
          <Layout>
            <Navbar />
            <AuthorizedRoute exact path="/admin/employee">
              <EmployeeList />
            </AuthorizedRoute>
            <Layout.Footer style={{ textAlign: "center" }}>
              Tasker App ©2020 Created by Husein Nashr
            </Layout.Footer>
          </Layout>
        </AuthorizedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export { AppRouter };
