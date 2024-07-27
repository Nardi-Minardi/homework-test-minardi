import React from "react";
import { Table, Image, Space } from "antd";
import type { TableColumnsType } from "antd";

type TableUserProps = {
  dataSource: any;
  loading: boolean;
  onEdit: (data: any) => void;
  onDelete: (id: number) => void;
};

const TableUser = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
}: TableUserProps) => {
  const columns: TableColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 150,
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 150,
      key: "role",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "Manager",
          value: "manager",
        },
        {
          text: "Viewer",
          value: "viewer",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: 150,
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      key: "status",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Inactive",
          value: "inactive",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text: string, record: any) => (
        <Space size='middle'>
          <span
            className={`${
              record.status === "active"
                ? "bg-green-200 p-2 rounded-sm font-bold"
                : "bg-red-200 p-2 rounded-sm font-bold"
            }`}>
            {record.status}
          </span>
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: 150,
      key: "created_at",
    },
    {
      title: "Action",
      key: "operation",
      width: 150,
      render: (text: string, record: any) => (
        <Space size='middle'>
          <button onClick={() => onEdit(record)} className='text-green-500'>
            Edit
          </button>
          <button onClick={() => onDelete(record)} className='text-red-500'>
            Delete
          </button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      rowKey={(record) => record.id}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 400 }}
      pagination={{
        position: ["bottomRight"],
        defaultPageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Total ${total} items `,
        pageSizeOptions: ["5", "10", "15", "20"],
      }}
    />
  );
};

export default TableUser;
