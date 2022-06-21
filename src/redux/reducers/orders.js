import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-orders";

export const deletSingleOrder = createAsyncThunk(
  "deleteSingleOrder",
  async ({ orderId, accessToken }) => {
    const response = await axios.delete(
      `orders/${orderId}.json?auth=${accessToken}`
    );
    return { id: orderId, statusText: response.statusText };
  }
);

export const fetchOrders = createAsyncThunk(
  "fetchOrders",
  async ({ accessToken, email }, thunkApi) => {
    const response = await axios.get(
      `orders.json?auth=${accessToken}&orderBy="customer/email"&equalTo="${email}"`,
      { signal: thunkApi.signal }
    );
    return response.data;
  }
);

export const addOrders = createAsyncThunk(
  "addOrders",
  async ({ orderData, accessToken }) => {
    const response = await axios.post(
      `orders.json?auth=${accessToken}`,
      orderData
    );
    return { id: response.data.name, ...orderData };
  }
);

const initialState = {
  orderItems: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    //builder for fetching all orders
    builder.addCase(fetchOrders.fulfilled, (state, { payload }) => {
      let fetchedOrders = [];
      for (let key in payload) {
        fetchedOrders.push({ id: key, ...payload[key] });
      }
      state.orderItems = fetchedOrders;
    });

    //builder for adding single order to firebase and appending to the state object
    builder.addCase(addOrders.fulfilled, (state, { payload }) => {
      state.orderItems.push(payload);
    });

    //builder for delete a single Order
    builder.addCase(deletSingleOrder.fulfilled, (state, { payload }) => {
      const newState = state.orderItems.filter(
        (item) => item.id !== payload.id
      );
      state.orderItems = newState;
    });
  },
});

export default ordersSlice.reducer;
