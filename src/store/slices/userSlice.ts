import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_URL,
  APP_NAME,
  API_GOREST_USER,
  TOKEN_GOREST,
  API_AUTH,
} from "../../config";

const initialState = {
  data: [],
  loading: false,
};

export const listUser = createAsyncThunk(
  "user/list",
  async (params, { rejectWithValue }) => {
    try {
      const url = `${API_AUTH}/users`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //filter not role user
      const data = response?.data?.filter((item:any) => item.role !== "user");
      return data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/add",
  async (params: any, { rejectWithValue }) => {
    try {
      const url = `${API_AUTH}/users`;
      const response = await axios.post(
        url,
        {
          email: params.email,
          name: params.name,
          active: params.status === "active" ? 1 : 0,
          gender: params.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async (params: any, { rejectWithValue }) => {
    const { id, name, status, gender } = params;
    try {
      const url = `${API_AUTH}/users/${id}`;
      const response = await axios.put(
        url,
        {
          name: params.name,
          active: params.status === "active" ? 1 : 0,
          gender: params.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN_GOREST}`,
          },
        }
      );
      // console.log('response edit', response);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (params:any, { rejectWithValue }) => {
    try {
      const url = `${API_AUTH}/users/${params.id}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list
    builder.addCase(listUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
    builder.addCase(listUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
    //add
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = [...state.data, payload];
      state.data = newData;
      // state.data = payload;
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.loading = false;
    });

    //edit
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = state.data.map((item) => {
        if (item.id === payload.id) {
          return payload;
        }
        return item;
      });
      state.data = newData;
    });
    builder.addCase(editUser.rejected, (state, { payload }) => {
      state.loading;
    });

    //delete
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      const newData = state.data.filter((item:any) => item?.id !== payload?.id);
      state.data = newData;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export default UserSlice.reducer;
