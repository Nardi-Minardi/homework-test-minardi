import React, { use, useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/layouts/mainLayout";
import RangePrice from "@/components/elements/rangePrice";
import CollapseComp from "@/components/elements/collapseComp";
import { listProduct } from "@/store/slices/productSlice";
import CardProduct from "@/components/elements/cardProduct";
import { Select } from "antd";
import LoadingComp from "@/components/elements/loadingComp";
import ReactPaginate from "react-paginate";
import Sidebar from "@/components/layouts/sidebar";
import BreadcrumbComp from "@/components/elements/breadCrumbComp";

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: product, loading } = useSelector((state) => state.product);
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState(["product_name", "asc"]);
  const [total, setTotal] = useState(0);

  const routeParent = router.route.split("/").slice(-1).join("");
  const routeCurrent = router.route.split("/").slice(-1).join("");

  useEffect(() => {
    dispatch(
      listProduct({
        keyword: keyword,
        price: price,
        page: page,
        limit: limit,
        order: order,
      })
    ).then((res) => {
      if (res.payload) {
        const data = res.payload?.data?.data;
        setTotal(data?.total);
      }
    });
  }, []);

  const goToDetail = (data: any) => {
    //send parameter data
    const { id, name, price, images, description } = data;
    const dataImages = images.map((item: any) => item.image_url);
    const img = dataImages.join(",");

    // window.location.href = `/product/detail/${id}?name=${name}&price=${price}&images=${img}&description=${description}`;

    router.push({
      pathname: `/product/detail/${id}`,
      query: { id, name, price, description, img },
    });
  };

  return (
    <>
      <BreadcrumbComp 
      routeParent={routeParent}
      routeCurrent={"LIST"}
      />
      <div className='flex flex-col lg:flex-row xl:flex-row gap-x-4 pb-12'>
        <Sidebar />

        <div className='w-full pb-12'>
          <div className='flex w-fullflex-col justify-between items-center lg:flex-row xl:flex-row '>
            <div className='w-full '>
              <span className='text-xs text-[#696969] font-bold px-2'>
                Menampilkan {product.length} dari {total} produk
              </span>
            </div>
            <div className='w-auto flex items-center flex-row '>
              <span className='text-xs text-[#696969] font-bold px-2'>
                Urutkan
              </span>
              <Select
                className='w-full'
                defaultValue='Product Name'
                style={{ width: 200 }}
                onChange={(value) => {
                  let order = ["product_name", "asc"];
                  if (value === "price") {
                    order = ["price", "asc"];
                  } else if (value === "date") {
                    order = ["created_at", "desc"];
                  }
                  setOrder(order);
                  dispatch(
                    listProduct({
                      keyword: keyword,
                      price: price,
                      page: page,
                      limit: limit,
                      order: order,
                    })
                  );
                }}>
                <Select.Option value='produc_name'>Product Name</Select.Option>
                <Select.Option value='price'>Price</Select.Option>
                <Select.Option value='date'>Date</Select.Option>
              </Select>
            </div>
          </div>
          {product.length > 0 ? (
            <>
              <div className='pt-5 cursor-pointer relative grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
                {loading && <LoadingComp />}
                {product.map((item) => (
                  <div
                    key={item.id}
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
                    setPage(data.selected + 1);
                    dispatch(
                      listProduct({
                        keyword: keyword,
                        price: price,
                        page: data.selected + 1,
                        limit: limit,
                        order: order,
                      })
                    );
                  }}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </>
          ) : (
            <div className='flex justify-center items-center h-[50vh]'>
              <span className='text-[#696969]'>Data tidak ditemukan</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Product.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Product;
