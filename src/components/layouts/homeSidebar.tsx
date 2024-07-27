import React from "react";
import CollapseComp from "../elements/collapseComp";

const HomeSidebar = ({
  onFilterCategory,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className='w-full lg:w-1/3 xl:w-1/3 pt-8'>
      <CollapseComp
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onFilterCategory={onFilterCategory}
      />
    </div>
  );
};

export default HomeSidebar;
