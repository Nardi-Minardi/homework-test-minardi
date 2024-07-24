import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import BreadcrumbComp from "../elements/breadCrumbComp";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-5'>
          {children}
        
      </div>
    </div>
  );
};

export default MainLayout;
