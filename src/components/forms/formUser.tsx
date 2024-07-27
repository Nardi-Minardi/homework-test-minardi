import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button, Form, Input, Select, Space} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "@/store/slices/productSlice";
import { API_URL } from "@/config";
import { addUser, editUser } from "@/store/slices/userSlice";
import { toast } from "react-hot-toast";

type FormuserProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form?: any;
  isEdit?: boolean;
  dataEdit?: any;
  fetchUser: () => void;
};

const Formuser = ({ open, setOpen, form, isEdit, dataEdit, fetchUser }: FormuserProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(dataEdit);
  }, [isEdit]);

  const onSubmit = () => {
    const values = form.getFieldsValue();
    if (isEdit) {
      const params = {
        id: dataEdit.id,
        ...values,
      };
      dispatch(editUser(params)).then(() => {
        toast.success("Success edit user");
        fetchUser();
        form.resetFields();
        setOpen(false);
      });
    } else {
      dispatch(addUser(values)).then((res: any) => {
        if (res.payload.status === 422) {
          toast.error("Email already exist");
        } else {
          toast.success("Success add user");
          fetchUser();
          form.resetFields();
          setOpen(false);
        }
      });
    }
  };

  return (
    <Form form={form} layout='vertical' onFinish={onSubmit}>
      {!isEdit && (
        <Form.Item
          name='email'
          rules={[{ required: true, message: "Email is required" }]}>
          <Input placeholder='email' />
        </Form.Item>
      )}
      <Form.Item
        name='name'
        rules={[{ required: true, message: "Name is required" }]}>
        <Input placeholder='name' />
      </Form.Item>
      <Form.Item
        name='gender'
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Gender is required" }]}>
        <Select placeholder='Select gender'>
          <Select.Option value='male'>Male</Select.Option>
          <Select.Option value='female'>Female</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='status'
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Status is required" }]}>
        <Select placeholder='Select status'>
          <Select.Option value='active'>Active</Select.Option>
          <Select.Option value='inactive'>InActive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button block htmlType='submit' type='primary'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Formuser;
