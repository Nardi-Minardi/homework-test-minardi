import React from "react";
import { FaStar } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";

type CardProductProps = {
  item: any;
};

const CardProduct = ({ item }: CardProductProps) => {
  return (
    <div className='flex flex-col shadow-md p-4 rounded-md h-[250px]'>
      <img
        src={item.image}
        style={{ maxHeight: "100px", width: "100%", objectFit: "contain" }}
      />
      <div className='flex justify-center flex-col p-2 gap-2 items-center'>
        <p className='text-center font-bold text-gray-600'>
          {" "}
          {item.title.length > 20
            ? item.title.substring(0, 20) + "..."
            : item.title}
        </p>
        <p className='text-center text-gray-600'>{item.category}</p>
        <RatingComp rating={5} />
        <p className='text-center text-blue-500'>$ {item.price?.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CardProduct;
