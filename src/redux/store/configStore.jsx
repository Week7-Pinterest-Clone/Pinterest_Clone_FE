import { configureStore } from "@reduxjs/toolkit";
import commentListSlice from "../modules/commentListSlice";
import { myPostReducer } from "../modules/myPageReducer";

import postingSlice from "../modules/postingSlice";

const store = configureStore({
  reducer: {
    postingSlice,
    mypage: myPostReducer,
    commentListSlice,
  },
});

export default store;
