import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useApi } from "../../../hook";
import { EmployeeListResponseDTO, EmployeeResponseDTO } from "../../../type";
import { EmployeeCreate } from "./employee-create";

export const EmployeeList: FC = () => {
  const [employees, setEmployees] = useState<EmployeeResponseDTO[]>([]);

  const [, loading, fetch] = useApi<EmployeeListResponseDTO>({
    method: "GET",
    url: "/employee",
  });
  const createRef = useRef<EmployeeCreate>(null);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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

  const onFetch = useCallback(async () => {
    const res = await fetch();
    if (res) {
      setEmployees(res.data);
    }
  }, [fetch]);

  useEffect(() => {
    onFetch();
  }, [onFetch]);

  const onCreate = (data: EmployeeResponseDTO) => {
    if (employees) {
      setEmployees([data, ...employees]);
    }
  };

  return (
    <div style={{ background: "#fff", padding: "24px" }}>
      <Button
        disabled={loading}
        type="primary"
        style={{ marginBottom: "16px" }}
        icon={<PlusOutlined />}
        onClick={() => createRef.current?.openDrawer()}
      >
        Create an Employee
      </Button>
      <Table
        rowKey="id"
        columns={columns}
        loading={loading}
        dataSource={employees}
      />
      <EmployeeCreate ref={createRef} onCreate={onCreate} />
    </div>
  );
};
