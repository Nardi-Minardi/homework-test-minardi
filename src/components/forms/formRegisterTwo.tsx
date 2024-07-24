import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import ButtonComp from "../buttons/buttonComp";
import { registerTwoFormSchema } from "@/utils/validation";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

type formRegisterProps = {
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: any;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  onRegister?: () => void;
};

type ValidationTwoSchemaType = z.infer<typeof registerTwoFormSchema>;

const FormRegisterTwo = ({
  nextStep,
  setNextStep,
  formData,
  setFormData,
  onRegister,
}: formRegisterProps) => {
  const { loading } = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationTwoSchemaType>({
    resolver: zodResolver(registerTwoFormSchema),
    defaultValues: {
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  useEffect(() => {
    console.log("mounted");
  }, [formData]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit: SubmitHandler<ValidationTwoSchemaType> = (data) => {
    const newData = set(formData, {
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    const userData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    onRegister(userData);
  };

  return (
    <>
      <div className='flex items-center gap-2'>
        <FaArrowLeft
          className='text-[#EB3F36] cursor-pointer'
          onClick={() => setNextStep(false)}
        />
        <h5 className={`text-lg font-bold text-[#842A26]`}>Kembali</h5>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5'>
          <form
            className='flex flex-col space-y-6 mt-4'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col space-y-2'>
              <input
                className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
                type='text'
                placeholder='Nomor Telepon'
                name='phone'
                {...register("phone")}
              />
              {errors.phone && (
                <span className='text-red-500 text-xs'>
                  {errors.phone.message}
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
            <div className='flex flex-col space-y-2 relative'>
              <input
                className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Konfirmasi Password'
                name='confirmPassword'
                {...register("confirmPassword")}
              />
              <span
                onClick={toggleConfirmPassword}
                className='absolute cursor-pointer right-3 top-1 text-[#842A26] text-sm'>
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
              {errors.confirmPassword && (
                <span className='text-red-500 text-xs'>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </form>
          <ButtonComp
            color='#fff'
            background='#EB3F36'
            width='100%'
            height={40}
            loading={loading}
            onClick={handleSubmit(onSubmit)}>
            <span>DAFTAR</span>
          </ButtonComp>
        </div>
      </div>
    </>
  );
};

export default FormRegisterTwo;
