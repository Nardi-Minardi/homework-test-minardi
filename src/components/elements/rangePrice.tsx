import React from "react";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "@/store/slices/productSlice";
import { FaSync, FaFilter } from "react-icons/fa";

const RangePrice = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState([0, 5000000]);

  const numberFormat = (value) => {
    let formetedNumber = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formetedNumber;
  };

  return (
    <div>
      <Slider
        range
        min={0}
        max={5000000}
        defaultValue={value}
        onChange={setValue}
        styles={{
          track: {
            background: "transparent",
          },
          tracks: {
            background: `#EF4444`,
          },
        }}
      />
      <div className='flex flex-row gap-2 items-center justify-between'>
        <div className='flex flex-row items-center w-full'>
          <span>Rp</span>
          <input
            className='w-full border border-gray-300 rounded-md p-1'
            type='text'
            value={numberFormat(value[0])}
            onChange={(e) => setValue([+e.target.value, value[1]])}
          />
        </div>
        <div className='flex flex-row items-center w-full'>
          <span>Rp</span>
          <input
            className='w-full border border-gray-300 rounded-md p-1'
            type='text'
            value={numberFormat(value[1])}
            onChange={(e) => setValue([value[0], +e.target.value])}
          />
        </div>
        <button
          className='bg-red-500 text-white rounded-md px-2 py-1'
          onClick={() => {
            dispatch(
              listProduct({
                keyword: "",
                price: value,
                page: 1,
                limit: 10,
                order: ["product_name", "asc"],
              })
            );
          }}>
          <FaFilter />
        </button>
        <button
          className='bg-gray-500 text-white rounded-md px-2 py-1'
          onClick={() => {
            setValue([0, 5000000]);
            dispatch(
              listProduct({
                keyword: "",
                price: "",
                page: 1,
                limit: 10,
                order: ["product_name", "asc"],
              })
            );
          }}>
          <FaSync />
        </button>
      </div>
    </div>
  );
};

export default RangePrice;
