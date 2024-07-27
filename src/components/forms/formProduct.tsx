import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ButtonComp from "../buttons/buttonComp";
import Link from "next/link";
import { productFormSchema } from "@/utils/validation";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "@/store/slices/productSlice";
import { API_URL } from "@/config";
import { toast } from "react-hot-toast";

type FormProductProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  form?: any;
  isEdit?: boolean;
  dataEdit?: any;
};

type ValidationSchemaType = z.infer<typeof productFormSchema>;

const FormProduct = ({
  open,
  setOpen,
  form,
  isEdit,
  dataEdit,
}: FormProductProps) => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategory = async () => {
    const res = await fetch(`${API_URL}/products/categories`);
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategory();

    return () => {
      setCategories([]);
    };
  }, [isEdit]);

  const onSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (isEdit) {
      dispatch(editProduct({ id: dataEdit.id, ...values })).then(() => {
        toast.success("Product updated");
        form.resetFields();
        setOpen(false);
      });
    } else {
      dispatch(addProduct(values)).then(() => {
        toast.success("Product added");
        form.resetFields();
        setOpen(false);
      });
    }
   
  };

  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item
        name='title'
        rules={[{ required: true, message: "Title is required" }]}>
        <Input placeholder='title' />
      </Form.Item>
      <Form.Item
        name='category'
        rules={[{ required: true, message: "Category is required" }]}>
        <Select placeholder='Select category'>
          {categories.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: "Price is required" }]}>
        <Input type='number' placeholder='price' />
      </Form.Item>
      <Form.Item
        name='description'
        rules={[{ required: true, message: "Description is required" }]}>
        <Input placeholder='description' />
      </Form.Item>

      <Form.Item>
        <Button block htmlType='submit' type='primary'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormProduct;
