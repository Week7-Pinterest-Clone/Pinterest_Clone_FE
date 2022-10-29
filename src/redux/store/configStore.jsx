import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    postingSlice,
  },
});

export default store;
