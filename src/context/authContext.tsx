// context/authContext.tsx
import { fetchUser } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { createContext, useState, ReactNode,useEffect } from "react";

export type TRole = "admin" | "tutor" | "student";

interface TUser {
  id: number;
  email: string;
  role: TRole;
}

interface AuthContextProps {
  user: TUser | null;
  logIn: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: TUser | null) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
