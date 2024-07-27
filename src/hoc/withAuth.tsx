import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { fetchUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";

export type TRole = "admin" | "user";

export function withAuth(WrappedComponent: NextPage, role: TRole) {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const checkRole = async () => {
      const res = await dispatch(fetchUser());
      const data = res.payload.data;
      if (data?.role !== role) {
        router.push("/401");
      }
    };

    useEffect(() => {
      checkRole();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
