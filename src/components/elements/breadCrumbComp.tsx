import React from "react";
import { Breadcrumb } from "antd";

type BreadcrumbProps = {
  routeParent?: string;
  routeCurrent?: string;
};

const BreadcrumbComp = ({ routeParent, routeCurrent }: BreadcrumbProps) => (
  <Breadcrumb
  className='py-4'
    separator='>'
    items={[
      {
        title: "Home",
      },
      {
        title: routeParent?.toUpperCase(),
        href: `/${routeParent}`,
      },
      {
        title: routeCurrent?.toUpperCase(),
        href: "",
        className: "route-current",
      },
    ]}
  />
);

export default BreadcrumbComp;
