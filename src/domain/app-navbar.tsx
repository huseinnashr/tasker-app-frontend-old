import React, { FC, useContext } from "react";
import { Layout, Menu } from "antd";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../context";
import { UserOutlined } from "@ant-design/icons";

const _Navbar: FC<RouteComponentProps> = () => {
  const { auth, setAuth } = useContext(AuthContext);
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
        <Menu.Item key="admin-employee">
          <Link to="/admin/employee">Employee</Link>
        </Menu.Item>
        <Menu.SubMenu
          icon={<UserOutlined />}
          title={`${auth?.username} - ${auth?.role}`}
          style={{ float: "right" }}
        >
          <Menu.Item key="setting">Setting</Menu.Item>
          <Menu.Item
            key="logout"
            onClick={() => {
              setAuth(null);
            }}
          >
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export const AppNavbar = withRouter(_Navbar);
