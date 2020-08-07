import "./login.css";
import React, { FC, useState, useContext, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Row, Col, Typography, Form, Alert, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { AuthContext } from "../../../context";
import { RoleEnum, SignInResponseDTO } from "../../../type";
import { useApi } from "../../../hook";

interface LoginState {
  isLoading: boolean;
  error?: { message: string };
}

const _Login: FC<RouteComponentProps> = ({ history }) => {
  const [loginAct, setLoginAct] = useState<LoginState>({ isLoading: false });
  const [signIn, fetchSignIn] = useApi<{ data: SignInResponseDTO }>(
    "POST",
    "/auth/signin"
  );
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (signIn) {
      setAuth(signIn.data);
    }
    console.log(signIn);
  }, [signIn, setAuth]);

  const onFinish = async (data: Store) => {
    const { username, password } = data;
    try {
      setAuth({
        accessToken: "232",
        id: 1,
        role: RoleEnum.ADMIN,
        username: "sdsda",
      });
      await fetchSignIn({ username, password });
    } catch (e) {}
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col xs={24} md={10} lg={8} xl={6} style={{ padding: "0px 16px" }}>
        <Row justify="center">
          <img
            src="/logo512.png"
            alt="logo"
            style={{ height: 46, marginRight: 4 }}
          ></img>
          <Typography.Title>Tasker App</Typography.Title>
        </Row>
        <Form onFinish={onFinish} className="login-form">
          {loginAct.error ? (
            <Alert message={loginAct.error.message} type="error" showIcon />
          ) : null}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loginAct.isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export const Login = withRouter(_Login);
