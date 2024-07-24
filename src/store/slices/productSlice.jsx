import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, APP_NAME } from '../../config';
import { tokenAuth } from "@/utils/localStorage";

const initialState = {
  data: [],
  loading: false,
};

export const listProduct = createAsyncThunk(
  'product/list',
  async (params, { rejectWithValue }) => {
    const { keyword, price, page, limit, order } = params;
    const joinOrder = order?.join(',');
    try {
      const url = `${API_URL}/product?keyword=${keyword}&price=${price}&page=${page}&limit=${limit}&order=${joinOrder}`;
      console.log('url', url);
      const response = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenAuth()}`
          }
        });
      console.log('response', response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //list
    builder.addCase(listProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload?.data?.data?.list;
    });
    builder.addCase(listProduct.rejected, (state, { payload }) => {
      state.loading = false;
    });
  }
});

export default productSlice.reducer;