import React from "react";
import { Table, Image, Space, Select } from "antd";
import type { TableColumnsType } from "antd";

type TableOrderProps = {
  dataSource: DataType[];
  loading: boolean;
  user: any;
  onUpdateStatus: (id: string, status: string, email: string) => void;
  goToDetail: (record: DataType) => void;
};

const TableOrder = ({
  dataSource,
  loading,
  user,
  onUpdateStatus,
  goToDetail
}: TableOrderProps) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 150,
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a: DataType, b: DataType) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      key: "name",
      render: (text: string, record: DataType) => (
        <>
          {user
            ?.filter((user) => user.id === record.userId)
            .map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      key: "email",
      render: (text: string, record: DataType) => (
        <>
          {user
            ?.filter((user) => user.id === record.userId)
            .map((item) => (
              <div key={item.id}>{item.email}</div>
            ))}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      key: "status",
      filters: [
        {
          text: "Shipped",
          value: "shipped",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text: string, record: DataType) => (
        <Space size='middle'>
          <Select
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) => onUpdateStatus(record.id, value, user?.find((item) => item.id === record.userId)?.email)}
          >
            <Select.Option value='shipped'>Shipped</Select.Option>
            <Select.Option value='pending'>Pending</Select.Option>
            <Select.Option value='delivered'>Delivered</Select.Option>
          </Select>
          
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 150,
      key: "action",
      render: (text: string, record: DataType) => (
        <>
          <Space size='middle'>
            <span className="bg-green-500 p-2 rounded-md text-white cursor-pointer" onClick={() => goToDetail(record)}>Detail</span>
          </Space>
        </>
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

export default TableOrder;
