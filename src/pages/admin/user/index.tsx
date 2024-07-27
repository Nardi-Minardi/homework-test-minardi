import React, { use, useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/layouts/mainLayout";
import { deleteUser, listUser } from "@/store/slices/userSlice";
import { Button, Select } from "antd";
import TableUser from "@/components/tables/tableUser";
import { withAuth } from "@/hoc/withAuth";
import ModalComp from "@/components/elements/modalComp";
import FormUser from "@/components/forms/formUser";
import { Form } from "antd";
import toast from "react-hot-toast";
import { listOrder } from "@/store/slices/productSlice";

const User = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<any>({});
  const { loading } = useSelector((state:any) => state.user);
  const { dataOrder: order } = useSelector((state:any) => state.product);
  const [user, setUser] = useState<string[]>([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    dispatch(listOrder());
    dispatch(listUser()).then((res) => {
      setUser(res.payload);
    });
  };

  const showModal = () => {
    setIsEdit(false);
    form.resetFields();
    setOpen(true);
  };

  const onCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onDelete = (data:any) => {
    const checkOrder = order.find((item:any) => item.userId === data.id);
    //if user id in order, dont delete it
    if (checkOrder) {
      toast.error("User has order");
      return;
    }

    if(data.role === "admin"){
      toast.error("Cannot delete admin");
      return;
    }

    if(data.role === "manager"){
      toast.error("Cannot delete manager");
      return;
    }
    

    dispatch(deleteUser(data)).then(() => {
      fetchUser();
      toast.success("Delete user success");
    });
  };

  const onEdit = (data:any) => {
    setOpen(true);
    setIsEdit(true);
    const { id, name, gender, status } = data;
    setDataEdit({ id, name, gender, status });
    form.setFieldsValue({ name, gender, status });
  };

  return (
    <MainLayout>
      <div className='w-full p-1 lg:p-8 xl:p-8'>
        <div className='flex w-full flex-col justify-between lg:items-center xl:items-center lg:flex-row xl:flex-row '>
          <div className='w-full '>
            <span className='text-xs text-[#696969] font-bold px-2'>
              List user
            </span>
          </div>
          <div className='w-auto flex mt-1 items-center flex-row '>
            <Button type='primary' className='mr-2' onClick={showModal}>
              Add User
            </Button>
          </div>
        </div>
        <div className='pt-5'>
          <TableUser
            onEdit={onEdit}
            onDelete={onDelete}
            loading={loading}
            dataSource={user}
          />
        </div>
      </div>
      <ModalComp
        title={isEdit ? "Edit User" : "Add User"}
        open={open}
        onCancel={onCancel}>
        <FormUser
          isEdit={isEdit}
          form={form}
          open={open}
          setOpen={setOpen}
          dataEdit={dataEdit}
          fetchUser={fetchUser}
        />
      </ModalComp>
    </MainLayout>
  );
};

export default withAuth(User, "admin");
