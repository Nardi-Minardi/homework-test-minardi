import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, APP_NAME, API_ORDER } from "../../config";
import { tokenAuth } from "@/utils/localStorage";

const initialState = {
  data: [],
  dataOrder: [],
  loading: false,
};

export const listProduct = createAsyncThunk(
  "product/list",
  async (params, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/products`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (params, { rejectWithValue }) => {
    const { title, price, description, image, category } = params;
    try {
      const url = `${API_URL}/products`;
      const response = await axios.post(
        url,
        {
          title: title,
          price: price,
          description: description,
          image: "https://i.pravatar.cc",
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async (params, { rejectWithValue }) => {
    const { id, title, price, description, image, category } = params;
    try {
      const url = `${API_URL}/products/${id}`;
      const response = await axios.put(
        url,
        {
          title: title,
          price: price,
          description: description,
          image: "https://i.pravatar.cc",
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log('response edit', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/products/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const filterByCatergory = createAsyncThunk(
  "product/filterByCatergory",
  async (category, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/products`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data.filter((item) => item.category === category);
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);


export const listOrder = createAsyncThunk(
  "order/list",
  async (params, { rejectWithValue }) => {
    try {
      const url = `${API_ORDER}/order`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/OrderStatus",
  async (params, { rejectWithValue }) => {
    try {
      const url = `${API_ORDER}/order`;
      const response = await axios.put(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list
    builder.addCase(listProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(listProduct.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //add
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = [...state.data, payload];
      state.data = newData;
      // state.data = payload;
    });
    builder.addCase(addProduct.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //edit
    builder.addCase(editProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      state.data = newData;
    });
    builder.addCase(editProduct.rejected, (state, { payload }) => {
      state.loading;
    });

    //delete
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = state.data.filter((item) => item?.id !== payload?.id);
      state.data = newData;
    });
    builder.addCase(deleteProduct.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //filter
    builder.addCase(filterByCatergory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterByCatergory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(filterByCatergory.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //order
    builder.addCase(listOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listOrder.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataOrder = payload;
    });
    builder.addCase(listOrder.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //update order status
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = state.dataOrder.map((item) => {
        if (item.id === payload.id) {
          const newItem = {
            ...item,
            status: payload.status,
          };
          return newItem;
        }
        return item;
      });
      state.dataOrder = newData;
    });
    builder.addCase(updateOrderStatus.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
