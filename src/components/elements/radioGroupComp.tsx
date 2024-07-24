import React from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "@/store/slices/productSlice";

type RadioGroupCompProps = {
  item: string;
  stock: number;
};

const RadioGroupComp = ({ item, stock }: RadioGroupCompProps) => {
  const dispatch = useDispatch();

  const onChange: CheckboxProps["onChange"] = (e) => {
    dispatch(
      listProduct({
        keyword: e.target.checked ? item : "",
        price: 0,
        page: 1,
        limit: 10,
        order: ["product_name", "asc"],
      })
    );
  };
  return (
    <div className='flex items-center py-2 justify-between'>
      <Checkbox onChange={onChange}>{item}</Checkbox>
      <span>({stock})</span>
    </div>
  );
};

export default RadioGroupComp;
