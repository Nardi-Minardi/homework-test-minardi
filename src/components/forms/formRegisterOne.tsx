import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerOneFormSchema } from "@/utils/validation";
import ButtonComp from "../buttons/buttonComp";

type formRegisterProps = {
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  formData?: any;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
};

type ValidationOneSchemaType = z.infer<typeof registerOneFormSchema>;

const FormRegisterOne = ({
  nextStep,
  setNextStep,
  formData,
  setFormData,
}: formRegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationOneSchemaType>({
    resolver: zodResolver(registerOneFormSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    },
  });

  const onSubmit: SubmitHandler<ValidationOneSchemaType> = (data) => {
    setFormData(data);
    setNextStep(true);
  };

  return (
    <>
      <h5 className={`text-lg font-bold text-[#842A26]`}>Daftar Sekarang</h5>
      <div className='flex flex-col gap-5'>
        <form
          className='flex flex-col space-y-6 mt-4'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col space-y-2'>
            <input
              className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
              type='text'
              placeholder='Nama Depan'
              name='firstName'
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className='text-red-500 text-xs'>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            <input
              className='border w-full border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB3F36] focus:ring-opacity-50'
              type='text'
              placeholder='Nama Belakang'
              name='lastName'
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className='text-red-500 text-xs'>
                {errors.lastName.message}
              </span>
            )}
          </div>
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
        </form>
        <ButtonComp
          color='#fff'
          background='#EB3F36'
          width='100%'
          height={40}
          onClick={handleSubmit(onSubmit)}>
          <span>SELANJUTNYA</span>
        </ButtonComp>
      </div>
    </>
  );
};

export default FormRegisterOne;
