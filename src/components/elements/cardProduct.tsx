import React from "react";
import { FaStar } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";

type CardProductProps = {
  item: {
    id: number;
    name: string;
    images: string[];
    product_type: any;
  };
};

const CardProduct = ({ item }: CardProductProps) => {
  const regexName = (name: string) => {
    //replace all special character
    return name.replace(/[^a-zA-Z0-9\s]/g, "");
  };

  return (
    <div className='flex flex-col lg:h-[80vh] xl:h-[80vh] shadow-md p-4 rounded-md'>
      <img src={item.images[0].image_url} alt={item.name} />
      <div className='flex justify-center flex-col p-2 gap-2 items-center'>
        <p className='text-center font-bold text-gray-600'>
          {" "}
          {regexName(item.name)}
        </p>
        <p className='text-center text-gray-600'>{item.product_type.name}</p>
        <RatingComp rating={5} />
        <p className='text-center text-[#EB3F36]'>
          Rp. {item.price?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
