import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import BreadcrumbComp from "../elements/breadCrumbComp";
import { SidebarPovider } from "@/context/sidebarContext";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [firstOpen, setFirstOpen] = React.useState<boolean>(true);
  return (
    <div>
      <SidebarPovider>
        <div className='flex h-full '>
          <div className='w-full lg:w-full xl:w-full overflow-hidden'>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
            </div>
          </div>
        </div>
      </SidebarPovider>
    </div>
  );
};

export default HomeLayout;
