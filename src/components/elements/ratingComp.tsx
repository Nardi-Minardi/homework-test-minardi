import React from "react";
import { FaStar } from "react-icons/fa";

const RatingComp = ({ rating }: { rating: number }) => {
  return (
    <div className='flex flex-row gap-1 '>
      {[...Array(5)].map((_, index) => {
        return (
          <FaStar key={index} color={index < rating ? "#FFC107" : "#BDBDBD"} />
        );
      })}
      <span className='text-gray-600 text-xs'>({rating})</span>
    </div>
  );
};

export default RatingComp;