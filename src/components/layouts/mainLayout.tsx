import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { SidebarPovider } from "@/context/sidebarContext";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [firstOpen, setFirstOpen] = React.useState<boolean>(true);
  return (
    <div>
      <SidebarPovider>
        <div className='flex h-full '>
          <Sidebar 
          firstOpen={firstOpen}
          />
          <div className='w-full lg:w-full xl:w-full overflow-hidden'>
            <Header />
            {children}
          </div>
        </div>
      </SidebarPovider>
    </div>
  );
};

export default MainLayout;
