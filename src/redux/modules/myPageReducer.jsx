import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCookie } from "../../shared/cookie";

const headers = {
  accessToken: `${getCookie("accessToken")}`,
  refreshToken: `${getCookie("refreshToken")}`,
};

const userId = localStorage.getItem("userId");
const serverUrl = process.env.REACT_APP_API;

export const __getMyPosts = createAsyncThunk(
  "myPost/getMyPosts",
  //
  async () => {
    console.log(userId);
    const response = await axios
      .get(`${serverUrl}/users/${userId}`, { headers })
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
