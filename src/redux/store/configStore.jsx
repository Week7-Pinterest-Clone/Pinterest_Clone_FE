import { configureStore } from "@reduxjs/toolkit";
// import postReducer from "./postReducer";
// import commentReducer from "./commentReducer";
// import { myPostReducer } from "./myPageReducer";

const store = configureStore({
  reducer: {
    // postReducer: postReducer,
    // commentReducer: commentReducer,
    // myPostReducer: myPostReducer,
  },
});

export default store;
