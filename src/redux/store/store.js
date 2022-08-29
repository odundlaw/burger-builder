import { configureStore } from "@reduxjs/toolkit";
import ingredientReducer from "../reducers/ingredients";
import orderReducer from "../reducers/orders";
import userReducer from "../reducers/user";

const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    orders: orderReducer,
    user: userReducer,
  },
});

export default store;
