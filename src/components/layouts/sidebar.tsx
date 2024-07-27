import React, { useEffect } from "react";
import MenuAdminComp from "../elements/menuAdminComp";
import { useGlobalSidebarContext } from "@/context/sidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, fetchUser } from "@/store/slices/authSlice";
import MenuManagerComp from "../elements/menuManager";

type SidebarProps = {
  firstOpen: boolean;
};

const ModalOverlay = ({ onClick }) => (
  <div
    className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
    onClick={onClick}
  />
);

const Sidebar = ({ firstOpen }: SidebarProps) => {
  const dispatch = useDispatch();
  const { isSidebarOpen, closeSidebar, showSidebar } =
    useGlobalSidebarContext();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <>
      <div
        className={`
          ${!isSidebarOpen ? "ml-[-15rem] lg:ml-[-20rem] " : " fixed"}
          ${!firstOpen ? "hidden" : ""}
          dark:bg-[#18181B] 
          text-[#8c8c8c] 
          xl:w-[20rem] 
          lg:w-[20rem] 
          w-[15rem]
          min-h-full 
          pb-10 
          shadow-lg 
          transition-[margin-left] 
          ease-in-out 
          duration-500 
          lg:static 
          xl:static 
          md:static 
          top-0 
          bottom-0 
          left-0 
          z-40
          overflow-y-auto
          overflow-x-hidden
          scrollbar-webkit
      `}>
        {user.role === "admin" ? <MenuAdminComp /> : <MenuManagerComp />}
      </div>
      {isSidebarOpen && firstOpen ? (
        <ModalOverlay
          onClick={() => {
            closeSidebar();
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
