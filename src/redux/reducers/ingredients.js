import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-orders";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  cheese: 0.4,
  bacon: 0.5,
  meat: 0.7,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await axios.get("ingredients.json");
      //console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);


const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: null,
    totalPrice: 4,
  },
  reducers: {
    addIngredients: (state, { payload }) => {
      const type = payload;
      state.ingredients[type] += 1;
      state.totalPrice += INGREDIENTS_PRICES[type];
    },
    removeIngredients: (state, { payload }) => {
      const type = payload;
      state.ingredients[type] -= 1;
      state.totalPrice -= INGREDIENTS_PRICES[type];
    },
    setIngredientsToDefault: (state) => {
      state.ingredients = null;
      state.totalPrice = 4;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
    });
  },
});

export const { addIngredients, removeIngredients, setIngredientsToDefault } =
  ingredientSlice.actions;

export default ingredientSlice.reducer;
