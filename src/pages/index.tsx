import React, { useState } from "react";
import Link from "next/link";
import FormLogin from "@/components/forms/formLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { APP_NAME } from "@/config";

type dataLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();

  const onLogin = (data: dataLogin) => {
    dispatch(loginUser(data)).then((res) => {
      const data = res.payload?.data;
      if (data?.code === 404) {
        toast.error(data?.message);
      } else if (data?.code === 401) {
        toast.error(data?.message);
      } else if (data?.code === 400) {
        toast.error(data?.message);
      } else {
        const in1hour = new Date(new Date().getTime() + 60 * 60 * 1000);
        const cookiesName = APP_NAME + "-token";
        Cookies.set(cookiesName, data?.data?.token, {
          expires: in1hour,
          secure: true,
        });
        toast.success(data?.message);
        window.location.href = "/product";
      }
    });
  };

  return (
    <div className='min-h-screen mx-5 flex flex-col items-center justify-center bg-white'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full lg:w-[30vw] xl:w-[30vw] '>
        <FormLogin onLogin={onLogin} />

        {/* underline */}
        <div className='flex items-center mt-8'>
          <div className='flex-1 mx-5 h-[1.6px] bg-[#CACACA]'></div>
        </div>

        <div className='flex justify-center mt-8'>
          <span className='text-[#848484] text-sm'>Belum punya akun?</span>{" "}
          &nbsp;
          <Link href='/register' className='text-[#842A26] text-sm font-bold'>
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
