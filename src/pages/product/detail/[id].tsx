import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import BreadcrumbComp from "@/components/elements/breadCrumbComp";
import MainLayout from "@/components/layouts/mainLayout";
import { FaStar, FaEdit } from "react-icons/fa";
import RatingComp from "@/components/elements/ratingComp";
import ImgProductDetail from "@/components/elements/imgProductDetail";
import RecomendedComp from "@/components/elements/recomendedComp";

const DetailProduct = () => {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const { id, name, price, img, description } = router.query;
  const [dataImg, setDataImg] = useState<string[]>([]);
  const [tabActive, setTabActive] = useState("Deskripsi");
  const [qty, setQty] = useState(1);

  const routeParent = router.route.split("/").slice(0, -2).join("");
  const routeCurrent = router.query.name;

  const tabs = [
    {
      title: "Deskripsi",
      content: description,
    },
    {
      title: "Informasi",
      content: "lore ipsum dolor sit amet consectetur adipisicing elit",
    },
  ];

  useEffect(() => {
    const imgArr = img?.split(",");
    if (imgArr) {
      setDataImg(imgArr);
    }
  }, [router.query]);

  const regexName = (name: string) => {
    //replace all special character
    return name?.replace(/[^a-zA-Z0-9\s]/g, "");
  };

  return (
    <div className='pb-8'>
      <BreadcrumbComp 
      routeParent={routeParent}
      routeCurrent={routeCurrent}
      />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2'>
          <ImgProductDetail
            dataImg={dataImg}
            imgRef={imgRef}
            id={id}
            name={name}
            price={price}
            description={description}
          />
        </div>
        <div className='w-full flex-col flex gap-2 md:w-1/2 lg:px-12 xl:px-12 pt-5'>
          <p className='text-2xl font-bold'>{regexName(name)}</p>
          <RatingComp rating={5} />
          <div className='flex flex-row justify-between items-center'>
            <p className='text-lg font-bold text-red-500'>
              Rp. {price?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
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

            <button className='bg-red-500 w-full text-xs lg:text-lg xl:text-lg text-white px-4 py-2 rounded-sm'>
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

      {/* tabs */}
      <div className='pt-32 flex gap-20 flex-row justify-center '>
        {tabs.map(
          (tab, index) => (
            (
              <div
                key={index}
                onClick={() => setTabActive(tab.title)}
                className={`
            flex flex-row justify-center items-center gap-2
            cursor-pointer ${
              tabActive.toLowerCase() === tab.title.toLowerCase()
                ? "text-red-500 border-b-2 border-red-500 "
                : "text-gray-600"
            }
            `}>
                <p
                  className={`text-lg font-bold ${
                    tabActive.toLowerCase() === tab.title.toLowerCase()
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}>
                  {tab.title}
                </p>
              </div>
            )
          )
        )}
      </div>
      <div className='flex flex-col gap-2 pt-8 lg:px-32 xl:px-32 text-justify'>
        <p className='text-gray-600'>
          {tabs.find((tab) => tab.title === tabActive)?.content}
        </p>
      </div>

      <RecomendedComp />
    </div>
  );
};

DetailProduct.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default DetailProduct;
