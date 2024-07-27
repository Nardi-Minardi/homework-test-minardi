import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FaStar, FaEdit } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";
import RecomendedComp from "@/components/elements/recomendedComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";
import MainLayout from "@/components/layouts/mainLayout";
import Link from "next/link";

const DetailOrder = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, name, email, status, productName, image, date } = router.query;
  console.log("router", router.query);
  const [qty, setQty] = useState(1);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleCart = () => {
    if (Object.keys(user).length > 0) {
      toast.success("Product added to cart");
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <MainLayout>
      <div className='py-8'>
        <Link href='/admin/order' className="px-5">
          <span className='text-blue-500'>Back to order</span>
        </Link>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 flex justify-center items-center'>
            <img
              src={image}
              className='w-96 h-96 object-contain'
              alt='product'
            />
          </div>
          {/* detail order */}
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
            <div className='flex flex-col '>
              <h1 className='text-2xl font-bold'>{productName}</h1>
              <p className='text-sm text-gray-500'>Order Date: {date}</p>
              <p className='text-sm text-gray-500'>Status: {status}</p>
              <p className='text-sm text-gray-500'>Name: {name}</p>
              <p className='text-sm text-gray-500'>Email: {email}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailOrder;
