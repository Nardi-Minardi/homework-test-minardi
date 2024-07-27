import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_AUTH, APP_NAME } from "../../config";
import Cookies from "js-cookie";
import { tokenAuth } from "@/utils/localStorage";

const initialState = {
  user: {},
  token: "",
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_AUTH}/login`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response;
    } catch (error : any) {
      return rejectWithValue(error.response);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_AUTH}/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAuth()}`,
        },
      });
      // console.log('response', response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      const cookiesName = `${APP_NAME}-token`;
      Cookies.remove(cookiesName);
      return;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.data?.data;
      state.token = payload.data?.data?.token;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.loading = false;
    });
    builder.addCase(fetchUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      //clear error
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
