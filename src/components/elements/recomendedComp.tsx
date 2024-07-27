import { listProduct } from "@/store/slices/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComp from "./loadingComp";
import CardProduct from "./cardProduct";
import { useRouter } from "next/router";

const RecomendedComp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  const goToDetail = (data: any) => {
    //send parameter data
    const { id, title, price, image, description } = data;

    router.push({
      pathname: `/product/detail/${id}`,
      query: { id, title, price, description, image },
    });
  };

  return (
    <div className='py-32'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-xl text-gray-500 font-bold'>
          Rekomended For You
        </p>
        <div className='border-b-2 border-[#EF4444] w-96 my-4'></div>
      </div>
      {loading ? (
        <LoadingComp />
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
          {product.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => goToDetail(item)}
              className='cursor-pointer'>
              <CardProduct item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecomendedComp;
