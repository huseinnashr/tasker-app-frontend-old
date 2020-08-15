import React, { Component } from "react";
import { Button, Form, Input, Drawer, Alert, Select } from "antd";
import {
  EmployeeResponseDTO,
  Roles,
  EmployeeListEntityResponseDTO,
} from "../../../type";
import { AlertMessage } from "../../../component";
import { FormInstance } from "antd/lib/form";
import { AuthContext } from "../../../context";
import { ApiService } from "../../../service/api.service";

interface EmployeeManageProps {
  onCreate: (data: EmployeeResponseDTO) => void;
}

interface _EmployeeManageState {
  visible: boolean;
}

export interface OpenDrawer {
  openDrawer: () => void;
}

export class EmployeeCreate
  extends Component<EmployeeManageProps, _EmployeeManageState>
  implements OpenDrawer {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  private createApi: ApiService<EmployeeListEntityResponseDTO>;

  constructor(
    props: EmployeeManageProps,
    context: React.ContextType<typeof AuthContext>
  ) {
    super(props, context);
    this.createApi = new ApiService(context, {
      method: "POST",
      url: "/employee",
    });
  }

  private onClose = () => {
    this.formRef.current?.resetFields();
    this.createApi.reset();
  };

  state: _EmployeeManageState = {
    visible: false,
  };

  formRef = React.createRef<FormInstance>();

  openDrawer = () => {
    this.setState({ visible: true });
  };

  onCreate = async () => {
    try {
      const formData = await this.formRef.current?.validateFields();
      const res = await this.createApi.run(formData);
      if (res) {
        this.props.onCreate(res.data);
        this.setState({ visible: false });
      }
      this.forceUpdate();
    } catch {}
  };

  render() {
    const { error, loading } = this.createApi;

    return (
      <Drawer
        title={"Create a new Employee"}
        width={420}
        visible={this.state.visible}
        afterVisibleChange={(visible) => {
          if (!visible) this.onClose();
        }}
        closable={false}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              disabled={loading}
              onClick={() => this.setState({ visible: false })}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              loading={loading}
              onClick={this.onCreate}
              type="primary"
            >
              Create
            </Button>
            )
          </div>
        }
      >
        <Form
          ref={this.formRef}
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {error ? (
            <Alert
              message={<AlertMessage message={error.message} />}
              type="error"
              style={{ marginBottom: "16px" }}
              showIcon
            />
          ) : null}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              {Roles.map((e) => (
                <Select.Option value={e} key={e}>
                  {e}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input the Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}
