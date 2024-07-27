import React, { use, useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/layouts/mainLayout";
import { deleteUser, listUser } from "@/store/slices/userSlice";
import { Button, Select } from "antd";
import TableOrder from "@/components/tables/tableOrder";
import { withAuth } from "@/hoc/withAuth";
import ModalComp from "@/components/elements/modalComp";
import FormUser from "@/components/forms/formUser";
import { Form } from "antd";
import { listOrder, updateOrderStatus } from "@/store/slices/productSlice";
import { sendContactForm } from "@/libs/mail";
import toast from "react-hot-toast";

const Order = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useSelector((state) => state.user);
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    dispatch(listUser());
    dispatch(listOrder()).then((res) => {
      const newData = [];
      const data = res.payload;
      setOrder(data);
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

  const onUpdateStatus = async (
    id: string,
    status: string,
    email: string,
  ) => {
    dispatch(updateOrderStatus({ id, status })).then(() => {
      fetchOrder();
      toast.success(`Order status updated to ${status}, email sent to ${email}`);
    });

    await sendContactForm({
      email: email,
      subject: `Order status update to ${status}`,
      message: `Your order status has been updated to ${status}`,
    });
  };

  const goToDetail = (data: any) => {
    console.log(data);
    // //send parameter data
    const { id, userId, status, products, date } = data;
    console.log("products", products);
    const image = products[0].image;
    const productName = products[0].productName;
    const userData = user?.filter((item) => item.id === userId);
    const { name, email } = userData[0];
    router.push({
      pathname: `/admin/order/detail/${id}`,
      query: { id, name, email, status, productName, image, date },
    });
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
        </div>
        <div className='pt-5'>
          <TableOrder goToDetail={goToDetail} onUpdateStatus={onUpdateStatus} loading={loading} dataSource={order} user={user} />
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(Order, "admin");
