import React, { use, useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/layouts/mainLayout";
import { deleteProduct, listProduct } from "@/store/slices/productSlice";
import { Button, Select } from "antd";
import TableProduct from "@/components/tables/tableProduct";
import { withAuth } from "@/hoc/withAuth";
import ModalComp from "@/components/elements/modalComp";
import FormProduct from "@/components/forms/formProduct";
import { Form } from "antd";
import toast from "react-hot-toast";

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>({});
  const { data: product, loading } = useSelector((state:any) => state.product);

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  const showModal = () => {
    setIsEdit(false);
    form.resetFields();
    setOpen(true);
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onDelete = (id: string) => {
    dispatch(deleteProduct(id)).then(() => {
      toast.success("Delete product success");
    });
  };

  const onEdit = (data: any) => {
    setOpen(true);
    setIsEdit(true);
    const { id, title, category, price, description } = data;
    setDataEdit({ id, title, category, price, description });
    form.setFieldsValue({ title, category, price, description });
  };

  return (
    <MainLayout>
      <div className='w-full p-1 lg:p-8 xl:p-8'>
        <div className='flex w-full flex-col justify-between lg:items-center xl:items-center lg:flex-row xl:flex-row '>
          <div className='w-full '>
            <span className='text-xs text-[#696969] font-bold px-2'>
              List Product
            </span>
          </div>
          <div className='w-auto flex mt-1 items-center flex-row '>
            <Button type='primary' className='mr-2' onClick={showModal}>
              Add product
            </Button>
          </div>
        </div>
        <div className='pt-5'>
          <TableProduct
            onEdit={onEdit}
            onDelete={onDelete}
            loading={loading}
            dataSource={product}
          />
        </div>
      </div>
      <ModalComp
        title={isEdit ? "Edit Product" : "Add Product"}
        open={open}
        onCancel={onCancel}>
        <FormProduct
          isEdit={isEdit}
          form={form}
          open={open}
          setOpen={setOpen}
          dataEdit={dataEdit}
        />
      </ModalComp>
    </MainLayout>
  );
};

export default withAuth(Product, "admin");
