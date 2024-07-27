import React, { useState, useEffect } from "react";
import type { CollapseProps } from "antd";
import { Collapse, Radio } from "antd";
import { dataSort } from "@/libs/data";
import axios from "axios";
import { API_URL } from "@/config";
import { filterByCatergory } from "@/store/slices/productSlice";
import { useDispatch } from "react-redux";

type CollapseCompProps = {
  onFilterCategory: (category: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CollapseComp = ({
  onFilterCategory,
  selectedCategory,
  setSelectedCategory,
}: CollapseCompProps) => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategory = async () => {
    const res = await fetch(`${API_URL}/products/categories`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategory();

    return () => {
      setCategories([]);
    };
  }, []);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const onChangeCategory = (e: any) => {
    console.log("e", e.target.value);
    setSelectedCategory(e.target.value);
    onFilterCategory(e.target.value);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Category",
      children: (
        <div className='flex flex-col gap-2'>
          {categories.map((category, index) => (
            <div key={index} className='flex items-center py-2 gap-3  '>
              <input
                className='cursor-pointer'
                type='checkbox'
                onChange={(e) => onChangeCategory(e)}
                checked={selectedCategory === category}
                id={category}
                name={category}
                value={category}
              />
              <label className='cursor-pointer' htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Collapse
      items={items}
      defaultActiveKey={["1"]}
      onChange={onChange}
      expandIconPosition='end'
      bordered={false}
    />
  );
};

export default CollapseComp;
