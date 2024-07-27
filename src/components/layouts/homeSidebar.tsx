import React from "react";
import CollapseComp from "../elements/collapseComp";

type HomeSidebarProps = {
  onFilterCategory: (category: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const HomeSidebar = ({
  onFilterCategory,
  selectedCategory,
  setSelectedCategory,
}: HomeSidebarProps) => {
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
