"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import BreadcrumbComp from "@/components/elements/breadCrumbComp";
import MainLayout from "@/components/layouts/mainLayout";
import { FaStar, FaEdit } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

type ImgProductDetailProps = {
  name: string;
  price: string;
  description: string;
  dataImg: string[];
  imgRef: React.RefObject<HTMLImageElement>;
};

const ImgProductDetail = ({
  dataImg,
  imgRef,
  name,
  price,
  description,
}: ImgProductDetailProps) => {
  const onClickChangeImg = (img: string) => {
    imgRef.current?.setAttribute("src", img);
  };

  return (
    <>
      <div className='border-2 mx-2 border-gray-300 p-2 flex flex-row justify-between items-center'>
        <img
          ref={imgRef}
          src={dataImg[0]}
          alt={name}
          style={{ height: "400px", objectFit: "contain" }}
          className='w-full'
        />
      </div>
      <Swiper
        slidesPerView={5}
        className='relative'
        //responsive breakpoints
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          //when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          //when window width is >= 1024px
          1024: {
            slidesPerView: 5,
          },
        }}
        navigation={{
          nextEl: ".custom_next_testimoni",
          prevEl: ".custom_prev_testimoni",
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        loop={false}
        autoplay={false}
        onSlideChange={() => {}}
        onSwiper={() => {}}>
        <div className='custom_prev_testimoni absolute left-2 z-50 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-300 rounded-full items-center justify-center p-1'>
          <IoChevronBack className='h-5 w-5 text-black' />
        </div>
        {dataImg.map(
          (img, index) => (
            (
              <SwiperSlide
                onClick={() => onClickChangeImg(img)}
                key={index}
                className='p-2 m-2 border-2 border-gray-300 cursor-pointer'>
                <img src={img} alt={name} style={{ objectFit: "cover" }} />
              </SwiperSlide>
            )
          )
        )}
        <div className='custom_next_testimoni absolute right-2 z-50 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-300 rounded-full items-center justify-center p-1'>
          <IoChevronForward className='h-5 w-5 text-black' />
        </div>
      </Swiper>
    </>
  );
};

export default ImgProductDetail;
