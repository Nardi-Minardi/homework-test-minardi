import React, {createContext, useContext, useState} from "react";

const SidebarContext = createContext<any>(null);

type SidebarProviderProps = {
  children: React.ReactNode;
};

const SidebarPovider = ({ children }: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const showSidebar = () => {
    console.log("showSidebar");
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    console.log("closeSidebar");
    setIsSidebarOpen(false);
  };


  return (
    <SidebarContext.Provider value={{ isSidebarOpen, showSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useGlobalSidebarContext = () => {
  return useContext(SidebarContext);
};

export { SidebarPovider };