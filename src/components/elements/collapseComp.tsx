import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import RangePrice from "./rangePrice";
import { dataSort } from "@/libs/data";
import RadioGroupComp from "./radioGroupComp";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const renderContent = (key: string) => {
  if (key === "harga") {
    return <RangePrice />;
  } else if (key === "origin") {
    return (
      <>
        {dataSort
          .find((item) => item.key === "origin")
          ?.children.map((item) => (
            <RadioGroupComp item={item.name} stock={item.stock} />
          ))}
      </>
    );
  } else if (key === "species") {
    return (
      <>
        {dataSort
          .find((item) => item.key === "species")
          ?.children.map((item) => (
            <RadioGroupComp item={item.name} stock={item.stock} />
          ))}
      </>
    );
  } else if (key === "roastLevel") {
    return (
      <>
        {dataSort
          .find((item) => item.key === "roastLevel")
          ?.children.map((item) => (
            <RadioGroupComp item={item.name} stock={item.stock} />
          ))}
      </>
    );
  } else if (key === "tasted") {
    return (
      <>
        {dataSort
          .find((item) => item.key === "tasted")
          ?.children.map((item) => (
            <RadioGroupComp item={item.name} stock={item.stock} />
          ))}
      </>
    );
  } else if (key === "processing") {
    return (
      <>
        {dataSort
          .find((item) => item.key === "processing")
          ?.children.map((item) => (
            <RadioGroupComp item={item.name} stock={item.stock} />
          ))}
      </>
    );
  }
};

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Harga",
    children: renderContent("harga"),
  },
  {
    key: "2",
    label: "Origin",
    children: renderContent("origin"),
  },
  {
    key: "3",
    label: "Species",
    children: renderContent("species"),
  },
  {
    key: "4",
    label: "Roast Level",
    children: renderContent("roastLevel"),
  },
  {
    key: "5",
    label: "Tested",
    children: renderContent("tasted"),
  },
  {
    key: "6",
    label: "Processing",
    children: renderContent("processing"),
  },
];

const CollapseComp = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      items={items}
      defaultActiveKey={["1", "2", "3", "4", "5", "6"]}
      onChange={onChange}
      expandIconPosition='end'
      bordered={false}
    />
  );
};

export default CollapseComp;
