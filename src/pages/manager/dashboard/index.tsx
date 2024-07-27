import React, { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/mainLayout";
import { withAuth } from "@/hoc/withAuth";
import { dataSales } from "@/libs/data";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "@/store/slices/userSlice";
import { listOrder, listProduct } from "@/store/slices/productSlice";
import moment from "moment";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const salesRevenueRef = useRef(null);
  const userRef = useRef(null);
  const { data: user } = useSelector((state) => state.user);
  const { data: product, dataOrder: order } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(listProduct());
    dispatch(listUser());
    dispatch(listOrder());
    let monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataSales.forEach((sale) => {
      let fromMonth = new Date(sale.periodFrom).getMonth();
      let toMonth = new Date(sale.periodTo).getMonth();
      if (fromMonth === toMonth) {
        monthlyTotals[fromMonth] += sale.revenue;
      } else {
        monthlyTotals[fromMonth] += sale.revenue;
        monthlyTotals[toMonth] += sale.revenue;
      }
    });

    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const ctx = salesRevenueRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sales Revenue",
            data: monthlyTotals,
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <MainLayout>
      <div className='w-full p-1 lg:p-8 xl:p-8'>
        <h1 className='text-2xl font-bold'>Dashboard Manager</h1>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
          <div className='bg-gradient-to-br from-green-400 to-green-500 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold'>New User</h2>
            <p className='text-3xl font-bold'>
              {
                user?.filter((item) =>
                  moment(item.created_at).isSame(new Date(), "day")
                ).length
              }
            </p>
          </div>
          <div className='bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold'>Total User</h2>
            <p className='text-3xl font-bold'>{user?.length}</p>
          </div>
          <div className='bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold'>Total Product</h2>
            <p className='text-3xl font-bold'>{product?.length}</p>
          </div>
          <div className='bg-gradient-to-br from-red-400 to-red-500 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold'>Total Order</h2>
            <p className='text-3xl font-bold'>{order?.length}</p>
          </div>
        </div>
        <div className='flex flex-col mt-4 '>
          <h2 className='text-lg font-semibold'>Sales Revenue</h2>
          <canvas ref={salesRevenueRef}></canvas>
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(Dashboard, "manager");
