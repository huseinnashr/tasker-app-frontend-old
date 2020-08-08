import "./login.css";
import React, { FC, useContext, useEffect } from "react";
import { Row, Col, Typography, Form, Alert, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../../../context";
import { SignInResponseDTO } from "../../../type";
import { useApi } from "../../../hook";

const _Login: FC = () => {
  const [signIn, signInError, signInLoading, fetchSignIn] = useApi<{
    data: SignInResponseDTO;
  }>("POST", "/auth/signin");
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (signIn) {
      setAuth(signIn.data);
    }
  }, [signIn, setAuth]);

  const onFinish = async (data: any) => {
    const { username, password } = data;
    await fetchSignIn({ username, password });
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
          {signInError ? (
            <Alert
              message={signInError.message}
              type="error"
              style={{ marginBottom: "16px" }}
              showIcon
            />
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
              loading={signInLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export const Login = _Login;
