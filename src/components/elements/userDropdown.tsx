import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";

type UserDropdownProps = {
  onLogout: () => void;
};

const UserDropdown = ({ onLogout, user }: UserDropdownProps) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={onLogout}>Logout</span>,
      icon: <FaSignOutAlt />,
    },
  ];
  
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <span onClick={(e) => e.preventDefault()}>
        <Space>
          <p className='text-sm font-semibold'>{user.email}</p>
          <img src='/user.svg' className='h-6 w-6' alt='cart' />
          <DownOutlined className='h-2 w-2' />
        </Space>
      </span>
    </Dropdown>
  );
};

export default UserDropdown;
