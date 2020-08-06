import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";

class _Navbar extends Component<RouteComponentProps, any> {
  render() {
    return (
      <Layout.Header className="header">
        <img
          src="/logo512.png"
          alt="logo"
          style={{
            height: "100%",
            padding: "12px 0px",
            marginRight: 16,
            float: "left",
          }}
        ></img>
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="manage-employee">
            <Link to="manage-employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => {}}>
            Logout
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

const Navbar = withRouter(_Navbar);
export { Navbar };
