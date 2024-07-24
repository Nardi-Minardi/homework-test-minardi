import React, { Children } from "react";
//loading icon react icon
import { FaSpinner } from "react-icons/fa";

type ButtonCompProps = {
  color: string;
  background: string;
  text: string;
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
};

const ButtonComp = ({
  color,
  background,
  text,
  width,
  height,
  onClick,
  children,
  loading,
}: ButtonCompProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg items-center justify-center flex`}
      style={{ width: width, height: height, backgroundColor: background, color: color }}
      onClick={onClick}>
      {loading ? <FaSpinner className='animate-spin h-6 w-6' /> : children}
    </button>
  );
};

export default ButtonComp;
