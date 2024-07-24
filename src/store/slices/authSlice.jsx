import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, APP_NAME } from '../../config';
import Cookies from 'js-cookie';

const initialState = {
  user: {} ,
  token: '',
  loading: false,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (data,  {rejectWithValue} ) => {
    try {
      const cookiesName = `${APP_NAME}-token`;
      Cookies.remove(cookiesName);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user = payload.data?.data;
      state.token = payload.data?.data?.token;
      state.loading = false;
      //clear error
     
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = {};
      state.token = '';
      state.loading = false;
      //clear error
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default authSlice.reducer;