import React, { FC, useEffect } from "react";
import { Button, Form, Input, Drawer, Alert, Select } from "antd";
import { useApi } from "../../../hook";
import { EmployeeResponseDTO, Roles } from "../../../type";
import { AlertMessage } from "../../../component";

interface EmployeeManageProps {
  visible: boolean;
  setVisible: (data: boolean) => void;
  onCreate: (data: any) => void;
}

export const EmployeeCreate: FC<EmployeeManageProps> = ({
  visible,
  setVisible,
  onCreate,
}) => {
  const [form] = Form.useForm();

  const [employee, error, loading, create] = useApi<{
    data: EmployeeResponseDTO;
  }>("POST", "/employee");

  useEffect(() => {
    if (employee) {
      setVisible(false);
      onCreate(employee);
    }
  }, [employee, setVisible, onCreate]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const createUser = async () => {
    try {
      const formData = await form.validateFields();
      await create(formData);
      if (employee) {
        setVisible(false);
        onCreate(employee);
      }
    } catch {}
  };

  return (
    <Drawer
      forceRender={true}
      title={"Create a new Employee"}
      width={420}
      visible={visible}
      onClose={() => form.resetFields()}
      bodyStyle={{ paddingBottom: 80 }}
      closable={false}
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
            onClick={createUser}
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
