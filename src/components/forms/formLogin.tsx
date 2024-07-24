import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ButtonComp from "../buttons/buttonComp";
import Link from "next/link";
import { loginFormSchema } from "@/utils/validation";
import { useSelector } from "react-redux";

type formLoginProps = {
  onLogin: () => void;
};

type ValidationSchemaType = z.infer<typeof loginFormSchema>;

const FormLogin = ({ onLogin }: formLoginProps) => {
  const { loading } = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
    onLogin(data);
  };

  return (
    <>
      <h5 className={`text-lg font-bold text-[#842A26]`}>Masuk</h5>
      <div className='flex flex-col gap-5'>
        <form
          className='flex flex-col space-y-6 mt-4'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-2'>
            <input
              className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
              type='email'
              placeholder='Email'
              name='email'
              {...register("email")}
            />
            {errors.email && (
              <span className='text-red-500 text-xs'>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className='flex flex-col space-y-2 relative'>
            <input
              className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              name='password'
              {...register("password")}
            />
            <span
              onClick={togglePassword}
              className='absolute cursor-pointer right-3 top-1 text-[#842A26] text-sm'>
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <span className='text-red-500 text-xs'>
                {errors.password.message}
              </span>
            )}
          </div>
        </form>
        <div className='flex justify-end'>
          <Link href='/' className='text-[#842A26] text-xs'>
            Lupa password?
          </Link>
        </div>
        <ButtonComp
          color='#fff'
          background='#EB3F36'
          width='100%'
          height={40}
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          <span>MASUK</span>
        </ButtonComp>
      </div>
    </>
  );
};

export default FormLogin;
