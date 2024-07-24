import React from "react";
import { Alert, Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const LoadingComp = () => (
  <div className='absolute top-0 left-0 w-full h-full flex justify-center items-start pt-64 bg-white bg-opacity-50 z-50'>
    <Spin></Spin>
  </div>
);

export default LoadingComp;
