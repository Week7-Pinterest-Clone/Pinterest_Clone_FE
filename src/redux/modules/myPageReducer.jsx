import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";
import { getCookie } from "../../shared/cookie";

const headers = {
  accessToken: `${getCookie("accessToken")}`,
  refreshToken: `${getCookie("refreshToken")}`,
};

export const __getMyPosts = createAsyncThunk(
  "myPost/getMyPosts",
  //
  async () => {
    const response = await axios
      .get("http://pyo00.shop/users/4", { headers })
      .catch((error) => console.log(error));
    console.log(response);
    return response.data;
  }
);

//edit구현 -> axios.put 해야함.

export const myPostReducer = createSlice({
  name: "mypage",
  initialState: [],
  reducers: {},
  extraReducers: {
    [__getMyPosts.fulfilled]: (state, { payload }) => {
      return [...payload];
    },
  },
});

export default myPostReducer.reducer;

//import { getCookie } from "../shared/cookie";
