import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  profileUrl: "",
  accessToken: "",
  isLoggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: {
      reducer(state, { payload }) {
        for (const key in payload) {
          state[key] = payload[key];
        }
      },
      prepare(displayName, email, accessToken, profileUrl) {
        return {
          payload: {
            displayName,
            email,
            profileUrl,
            accessToken,
            isLoggedIn: true,
          },
        };
      },
    },
    unSetUser: (state) => {
      for (const key in initialState) {
        state[key] = initialState[key];
      }
    },
  },
});

export const { setUser, unSetUser } = userSlice.actions;

export default userSlice.reducer;
