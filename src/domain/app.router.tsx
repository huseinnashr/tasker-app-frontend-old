import React, { FC } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Layout } from "antd";
import { Login } from "./auth";
import { UnauthorizedRoute, AuthorizedRoute } from "../route";
import { EmployeeList } from "./admin";
import { AppContent } from "./app-content";
import { AppFooter } from "./app-footer";
import { AppNavbar } from "./app-navbar";

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UnauthorizedRoute exact path="/login">
          <Login />
        </UnauthorizedRoute>
        <AuthorizedRoute path="/">
          <Layout>
            <AppNavbar />
            <AppContent>
              <AuthorizedRoute exact path="/admin/employee">
                <EmployeeList />
              </AuthorizedRoute>
            </AppContent>
            <AppFooter />
          </Layout>
        </AuthorizedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export { AppRouter };
