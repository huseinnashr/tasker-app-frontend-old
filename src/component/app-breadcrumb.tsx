import React, { FC } from "react";
import { Breadcrumb } from "antd";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

const _AppBreadcrumb: FC<RouteComponentProps> = ({ history, location }) => {
  const paths = location.pathname.split("/");

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {paths.map((p, idx, arr) => {
        const fullPath = arr.slice(0, idx + 1).join("/");
        const title = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();

        return (
          <Breadcrumb.Item key={p}>
            <Link to={fullPath}>{idx === 0 ? "Home" : title}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export const AppBreadcrumb = withRouter(_AppBreadcrumb);
