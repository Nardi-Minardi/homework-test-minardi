import React, { useState } from "react";
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useRouter } from "next/router";

type DataMenuManager = Required<MenuProps>["items"][number];

const items: DataMenuManager[] = [
  {
    key: "/manager/dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
];

const MenuManagerComp = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (key: string) => {
    router.push(key);
  };
  return (
    <Menu
      className='h-screen w-full bg-white'
      defaultSelectedKeys={["dashboard"]}
      // defaultOpenKeys={["2"]}
      mode='inline'
      inlineCollapsed={collapsed}
      items={items}
      onClick={(e) => {
        handleClick(e.key);
      }}
    />
  );
};

export default MenuManagerComp;
