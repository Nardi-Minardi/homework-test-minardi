import React from "react";
import { Table, Image, Space } from "antd";
import type { TableColumnsType } from "antd";

type TableProductProps = {
  dataSource: any;
  loading: boolean;
  onEdit: (data: any) => void;
  onDelete: (id: string) => void;
};

const TableProduct = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
}: TableProductProps) => {
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
      title: "Title",
      dataIndex: "title",
      width: 150,
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 150,
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 150,
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 300,
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (text: string) => <Image src={text} width={50} />,
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
          <button onClick={() => onDelete(record.id)} className='text-red-500'>
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

export default TableProduct;
