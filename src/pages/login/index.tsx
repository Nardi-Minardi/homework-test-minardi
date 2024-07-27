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
      const data = res?.payload;
      const user = data?.data?.user;
      if (data.status === 200) {
        const in1hour = new Date(new Date().getTime() + 60 * 60 * 1000);
        const cookiesName = APP_NAME + "-token";
        Cookies.set(cookiesName, data?.data?.token, {
          expires: in1hour,
          secure: true,
        });
        toast.success(data?.data?.message);
        if (user?.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (user?.role === "viewer") {
          window.location.href = "/";
        } else if (user?.role === "manager") {
          window.location.href = "/manager/dashboard";
        } else {
          window.location.href = "/";
        }
        // window.location.href = "/product";
      } else {
        toast.error(data?.data?.message);
      }
    });
  };

  return (
    <div className='min-h-screen mx-5 flex flex-col items-center justify-center bg-white'>
      <Link href='/' className='pb-6'>
        <h1 className='text-2xl font-bold'>Home Work</h1>
      </Link>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full lg:w-[30vw] xl:w-[30vw] '>
        <FormLogin onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Login;
