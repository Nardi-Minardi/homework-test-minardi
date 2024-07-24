import React from "react";
import UserDropdown from "../elements/userDropdown";
import SearchInput from "../elements/searchInput";
import MenuDropdown from "../elements/menuDropdown";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "@/store/slices/productSlice";
import { logoutUser } from "@/store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const onSearch = (keyword: string) => {
    dispatch(
      listProduct({
        keyword: keyword,
        price: '',
        page: 1,
        limit: 10,
        order: ["product_name", "asc"],
      })
    );
  };

  const onLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  }

  return (
    <div className='sticky top-0 z-50 w-full'>
      <div className='shadow-sm bg-white py-4 px-5'>
        <div className='flex flex-col lg:flex-row xl:flex-row lg:justify-end xl:justify-end w-full'>
          <div className='flex flex-col lg:flex-row xl:flex-row gap-x-4 items-end'>
            <SearchInput onSearch={onSearch} />

            <div className='flex items-center pt-5'>
              <div className='flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100'>
                <img src='/heart.svg' className='h-6 w-6' alt='favorite' />
              </div>

              <div className='flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100'>
                <div className='relative'>
                  <img
                    src='/shopping-bag.svg'
                    className='h-6 w-6'
                    alt='account'
                  />
                  <span className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white'>
                    3
                  </span>
                </div>
              </div>

              <div className='flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100'>
                <UserDropdown 
                onLogout={onLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex h-auto bg-gray-100 px-4 sm:px-6 lg:px-32 xl:px-32'>
        <div className='flex h-[5vh] text-white cursor-pointer items-center gap-x-2 bg-red-500 py-6 px-5'>
          <MenuDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
