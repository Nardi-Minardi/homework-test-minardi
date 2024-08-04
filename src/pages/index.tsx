import React, { use, useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import CollapseComp from "@/components/elements/collapseComp";
import { listProduct } from "@/store/slices/productSlice";
import CardProduct from "@/components/elements/cardProduct";
import { Select } from "antd";
import LoadingComp from "@/components/elements/loadingComp";
import ReactPaginate from "react-paginate";
import HomeSidebar from "@/components/layouts/homeSidebar";
import Header from "@/components/layouts/header";
import HomeLayout from "@/components/layouts/homeLayout";
const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: product, loading } = useSelector((state:any) => state.product);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [filtredData, setFiltredData] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    dispatch(listProduct()).then((res) => {
      const data = res.payload;
      setFiltredData(data.slice(0, limit));
      setTotal(data.length);
    });
  }, []);

  const goToDetail = (data: any) => {
    //send parameter data
    const { id, title, price, image, description } = data;

    router.push({
      pathname: `/product/detail/${id}`,
      query: { id, title, price, description, image },
    });
  };

  const onFilterCategory = (value: string) => {
    const filter = product.filter((item:any) => item.category === value);
    setFiltredData(filter);
    setTotal(filter.length);
  };

  if (loading) {
    return <LoadingComp />;
  }

  return (
    <HomeLayout>
      <div className='flex flex-col lg:flex-row xl:flex-row gap-x-4 pb-12'>
        <HomeSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onFilterCategory={onFilterCategory}
        />

        <div className='w-full py-8'>
          <div className='flex w-fullflex-col justify-between items-center lg:flex-row xl:flex-row '>
            <div className='w-full flex flex-row items-center'>
              <span className='text-xs text-[#696969] font-bold px-2'>
                Showing {filtredData.length} of {total} products
              </span>
              <button
                onClick={() => {
                  dispatch(listProduct()).then((res) => {
                    const data = res.payload;
                    setFiltredData(data.slice(0, limit));
                    setTotal(data.length);
                    setPage(1);
                    setSelectedCategory("");
                  });
                }}
                className='bg-gray-500 text-white text-xs px-2 py-1 rounded-md ml-2'>
                reset
              </button>
            </div>
            {/* search */}
            <div className='w-full lg:w-1/4 xl:w-1/4'>
              <input
                type='text'
                placeholder='Search Product'
                className='w-full border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500'
                onChange={(e) => {
                  const value = e.target.value;
                  const search = product.filter((item:any) => {
                    return item.title
                      .toLowerCase()
                      .includes(value.toLowerCase());
                  });
                  if (value === "") {
                    setFiltredData(product.slice(0, limit));
                    setTotal(product.length);
                  } else {
                    setFiltredData(search);
                    setTotal(search.length);
                  }
                }}
              />
            </div>
          </div>
          {product.length > 0 ? (
            <>
              <div className='pt-5 cursor-pointer relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                {loading && <LoadingComp />}
                {filtredData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => goToDetail(item)}
                    className='cursor-pointer'>
                    <CardProduct item={item} />
                  </div>
                ))}
              </div>
              <div className='flex justify-center items-center pt-5'>
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(total / limit)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(data) => {
                    const selected = data.selected;
                    const offset = Math.ceil(selected * limit);
                    setPage(selected + 1);
                    setFiltredData(product.slice(offset, offset + limit));
                  }}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center h-[50vh]'>
              <span className='text-[#696969]'>No Product Found</span>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
