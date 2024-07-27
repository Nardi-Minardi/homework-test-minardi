import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FaStar, FaEdit } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";
import HomeLayout from "@/components/layouts/homeLayout";
import RecomendedComp from "@/components/elements/recomendedComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/store/slices/authSlice";
import { toast } from "react-hot-toast";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id, title, price, image, description } = router.query;
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
    <HomeLayout>
      <div className='py-8'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 flex justify-center items-center'>
            <img
              src={image}
              className='w-96 h-96 object-contain'
              alt='product'
            />
          </div>
          <div className='w-full flex-col flex gap-2 md:w-1/2 lg:px-12 xl:px-12 pt-5'>
            <p className='text-2xl font-bold'>{title}</p>
            <RatingComp rating={5} />
            <div className='flex flex-row justify-between items-center'>
              <p className='text-lg font-bold text-blue-500'>$ {price}</p>
              <div className='flex text-blue-500 text-xs items-center flex-row gap-1'>
                <FaEdit />
                <span>Tersedia</span>
              </div>
            </div>

            {/* increment and decrement cart */}
            <div className='flex w-full items-center flex-row gap-2'>
              <div className='flex flex-row  items-center gap-2 border border-gray-300  rounded-sm'>
                <button
                  onClick={() => {
                    if (qty > 1) {
                      setQty(qty - 1);
                    }
                  }}
                  className='bg-white border-x-2 px-8 py-2 rounded-sm'>
                  -
                </button>
                <span className='px-8'>{qty}</span>
                <button
                  onClick={() => {
                    setQty(qty + 1);
                  }}
                  className='bg-white border-x-2 px-8 py-2 rounded-sm'>
                  +
                </button>
              </div>

              <button
                onClick={handleCart}
                className='bg-blue-500 w-full text-xs lg:text-lg xl:text-lg text-white px-4 py-2 rounded-sm'>
                Add to Cart
              </button>
              <div className='flex cursor-pointer items-center gap-x-1 rounded-sm py-2 px-4 hover:bg-gray-100'>
                <img src='/heart.svg' className='h-8 w-8' alt='favorite' />
              </div>
            </div>
            <div className='pt-5'>
              <p className='text-gray-600 text-justify'>{description}</p>
            </div>
          </div>
        </div>

        <RecomendedComp />
      </div>
    </HomeLayout>
  );
};

export default DetailProduct;
