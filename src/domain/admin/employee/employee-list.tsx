import "./employee-list.css";
import React, { FC, useEffect } from "react";
import { Button, Table, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "../../../hook";
import { EmployeeResponseDTO } from "../../../type";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppBreadcrumb } from "../../../component";

const _EmployeeList: FC<RouteComponentProps> = ({ history }) => {
  const [employees, , loading, fetch] = useApi<{
    data: EmployeeResponseDTO[];
  }>("GET", "/employee");

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: EmployeeResponseDTO) => (
        <span>
          <a
            href={`/admin/employee/` + record.id}
            style={{ marginRight: "8px" }}
          >
            Edit
          </a>
        </span>
      ),
    },
  ];
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Layout.Content style={{ padding: "0px 50px" }}>
      <AppBreadcrumb />
      <div style={{ background: "#fff", padding: "24px" }}>
        <Button
          disabled={loading}
          type="primary"
          style={{ marginBottom: "16px" }}
          icon={<PlusOutlined />}
          onClick={() => history.push("/admin/employee/create")}
        >
          Create an Employee
        </Button>
        <Table
          rowKey="id"
          columns={columns}
          loading={loading}
          dataSource={employees?.data}
        />
      </div>
    </Layout.Content>
  );
};

export const EmployeeList = withRouter(_EmployeeList);
