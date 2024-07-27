import React, {useEffect} from "react";
import UserDropdown from "../elements/userDropdown";
import SearchInput from "../elements/searchInput";
import MenuDropdown from "../elements/menuDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, fetchUser } from "@/store/slices/authSlice";
import { useGlobalSidebarContext } from "@/context/sidebarContext";
import { Button } from "antd";
import Link from "next/link";

const Header = () => {
  const { isSidebarOpen, closeSidebar, showSidebar } =
    useGlobalSidebarContext();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const onLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <div className='w-full shadow-md pt-2 bg-white px-5'>
      <div className='flex flex-col lg:items-center xl:items-center lg:flex-row xl:flex-row lg:justify-between xl:justify-between w-full'>
        <Link href='/'>
          <h1 className='text-2xl font-bold'>Home Work</h1>
        </Link>
        <div className='flex row justify-between items-center gap-x-4'>
          {/* hamburger menu */}

          <div
            className='cursor-pointer'
            onClick={isSidebarOpen ? closeSidebar : showSidebar}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 lg:hidden xl:hidden'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </div>
          <div className='flex justify-end items-center py-2 px-4 pt-5'>
            {Object.keys(user).length > 0 ? (
              <div className='flex cursor-pointer items-center gap-x-1 rounded-md  hover:bg-gray-100'>
                <UserDropdown
                user={user}
                onLogout={onLogout} />
              </div>
            ) : (
              <Link
                href='/login'
                className='flex items-center gap-x-1 bg-blue-500 py-1 px-2 rounded-md'>
                <span className='text-white'>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
