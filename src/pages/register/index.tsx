import React, { useState, useEffect } from "react";
import Link from "next/link";
import FormRegisterOne from "@/components/forms/formRegisterOne";
import FormRegisterTwo from "@/components/forms/formRegisterTwo";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";

type dataRegister = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const dispatch = useDispatch();
  const [nextStep, setNextStep] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const onRegister = (data: dataRegister) => {
    dispatch(registerUser(data)).then((res) => {
      const data = res.payload?.data;
      if (data?.code === 400) {
        toast.error(data?.message);
      } else {
        toast.success(data?.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    });
  };

  return (
    <div className='min-h-screen mx-5 flex flex-col items-center justify-center bg-white'>
      <div className='bg-white p-8 rounded-lg shadow-2xl w-full lg:w-[30vw] xl:w-[30vw] '>
        {!nextStep ? (
          <FormRegisterOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            setNextStep={setNextStep}
          />
        ) : (
          <FormRegisterTwo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            setNextStep={setNextStep}
            onRegister={onRegister}
          />
        )}

        {/* underline */}
        <div className='flex items-center mt-8'>
          <div className='flex-1 mx-5 h-[1.6px] bg-[#CACACA]'></div>
        </div>

        <div className='flex justify-center mt-8'>
          <span className='text-[#848484] text-sm'>Sudah punya akun?</span>{" "}
          &nbsp;
          <Link href='/' className='text-[#842A26] text-sm font-bold'>
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
