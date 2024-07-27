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

type DataMenuAdmin = Required<MenuProps>["items"][number];

const items: DataMenuAdmin[] = [
  {
    key: "/admin/dashboard",
    icon: <HomeOutlined />,
    label: "Dashboard",
  },
  {
    key: "#",
    icon: <AppstoreOutlined />,
    label: "Product",
    children: [
      {
        key: "/admin/product",
        label: "Data Product",
      },
    ],
  },
  {
    key: "/admin/order",
    icon: <ShoppingOutlined />,
    label: "Order",
  },
  {
    key: "/admin/user",
    icon: <UserOutlined />,
    label: "User",
  },
];

const MenuAdminComp = () => {
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

export default MenuAdminComp;
