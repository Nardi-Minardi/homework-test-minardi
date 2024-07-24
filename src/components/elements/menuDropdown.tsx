import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FaCartArrowDown, FaWallet } from "react-icons/fa";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <a href='#'>Keranjang</a>,
    icon: <FaCartArrowDown />,
  },
  {
    key: "2",
    label: <a href='#'>Pembayaran</a>,
    icon: <FaWallet />,
  },
];

const MenuDropdown = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Belanja
          <DownOutlined className='h-2 w-2' />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MenuDropdown;
