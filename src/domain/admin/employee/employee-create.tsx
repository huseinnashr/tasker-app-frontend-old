import React, { FC } from "react";
import { Button, Form, Input, Drawer, Alert, Select } from "antd";
import { useApi } from "../../../hook";
import {
  EmployeeResponseDTO,
  Roles,
  EmployeeListEntityResponseDTO,
} from "../../../type";
import { AlertMessage } from "../../../component";

interface EmployeeManageProps {
  visible: boolean;
  setVisible: (data: boolean) => void;
  onCreate: (data: EmployeeResponseDTO) => void;
}

export const EmployeeCreate: FC<EmployeeManageProps> = ({
  visible,
  setVisible,
  onCreate,
}) => {
  const [form] = Form.useForm();

  const [error, loading, create] = useApi<EmployeeListEntityResponseDTO>({
    method: "POST",
    url: "/employee",
  });

  const _onCreate = async () => {
    try {
      const formData = await form.validateFields();
      const res = await create(formData);
      if (res) {
        setVisible(false);
        onCreate(res.data);
      }
    } catch {}
  };

  return (
    <Drawer
      title={"Create a new Employee"}
      width={420}
      visible={visible}
      afterVisibleChange={(visible) => {
        if (!visible) form.resetFields();
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
            onClick={() => setVisible(false)}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            onClick={_onCreate}
            type="primary"
          >
            Create
          </Button>
          )
        </div>
      }
    >
      <Form
        form={form}
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
};
